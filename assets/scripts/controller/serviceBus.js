import globalConfig from '../config/globalConfig'
import SocketService from './socketService'

let $onconnected = Symbol("@onconnected")
let $ondisconnected = Symbol("@ondisconnected")
let $onmessage = Symbol("@onmessage")
let $onerror = Symbol("@onerror")

let $socketDisconnectedCallback = Symbol("@socketDisconnectedCallback")
let $socketService = Symbol("@socketService")

let listenerList = {}

export default class ServiceBus{
    constructor(controller, socketDisconnectedCallback){
        this.controller = controller
        this[$socketService] = new SocketService(this[$onconnected], this[$ondisconnected], this[$onmessage], this[$onerror])
        this[$socketDisconnectedCallback] = socketDisconnectedCallback
    }

    connect(){
        return this[$socketService].connect(globalConfig.serverSettings.websocketServerURI)
    }

    setMessageListener(messageCode, callback){
        if(listenerList.hasOwnProperty(messageCode) && listenerList[messageCode] != null){
            return false
        }
        listenerList[messageCode] = callback
    }

    removeMessageListener(messageCode){
        listenerList[messageCode] = null
    }

    sendMessage(message){
        this[$socketService].send(message)
    }

    [$onconnected](returnValue, reason, code){
        cc.log("Websocket server connected !")
    }

    [$ondisconnected](returnValue, reason, code){
        cc.log("Websocket server disconnected !")
        if(this[$socketDisconnectedCallback]!=null){
            this[$socketDisconnectedCallback](code)
        }
    }

    [$onmessage](messageCode, message, stepIndex, stepType){
        if(listenerList.hasOwnProperty(messageCode) && listenerList[messageCode] != null){
            listenerList[messageCode](message.toObject(false))
        }else{
            cc.log("Received an unlistened message, code: " + messageCode)
        }
    }

    [$onerror](eventPhase, readyState){
        cc.warn("Received websocket error, eventPhase: " + eventPhase, ", readyState: " + readyState);
    }
}