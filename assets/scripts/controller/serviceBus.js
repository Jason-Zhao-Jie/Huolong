import CONSTANTS from '../config/constants'
import globalConfig from '../config/globalConfig'
import SocketService from './socketService'
import WechatPlatformService from './wechatPlatformService'
import LocalUserDataService from './localUserDataService'
import TipBar from '../view/tipBar'

let $onconnected = Symbol("@onconnected")
let $ondisconnected = Symbol("@ondisconnected")
let $onmessage = Symbol("@onmessage")
let $onerror = Symbol("@onerror")

let $socketDisconnectedCallback = Symbol("@socketDisconnectedCallback")
let $tempConnectSuccessCallback = Symbol("@tempConnectSuccessCallback")
let $tempConnectFailureCallback = Symbol("@tempConnectFailureCallback")

let $socketService = Symbol("@socketService")
let $wechatPlatformService = Symbol("@wechatPlatformService")
let $localUserDataService = Symbol("@localUserDataService")

let listenerList = {}

export default class ServiceBus{
    constructor(controller, socketDisconnectedCallback){
        this.controller = controller
        this[$socketDisconnectedCallback] = socketDisconnectedCallback
        this[$tempConnectSuccessCallback] = null
        this[$tempConnectFailureCallback] = null

        this[$socketService] = new SocketService(this[$onconnected].bind(this), this[$ondisconnected].bind(this), this[$onmessage].bind(this), this[$onerror].bind(this))
        this[$wechatPlatformService] = new WechatPlatformService()
        this[$localUserDataService] = new LocalUserDataService()
        
        // Login wechat
        this[$wechatPlatformService].wechatLogin((isSuccessful, userInfo/* or errorInfo */, reason)=>{
            if(isSuccessful){
                this[$localUserDataService].setWechatUserInfo(userInfo)
            }else{
                switch(reason){
                    case CONSTANTS.WECHAT_FAILED_REASON.LOGIN_SUCCESSFUL_BUT_NO_DATA:
                    case CONSTANTS.WECHAT_FAILED_REASON.USER_REFUSED_ACCESS:
                    case CONSTANTS.WECHAT_FAILED_REASON.ACCESS_GET_FAILED:
                    case CONSTANTS.WECHAT_FAILED_REASON.LOGIN_FAILED:
                        TipBar.show(userInfo)
                        this[$localUserDataService].setWechatLoginFailure(reason)
                        break
                    case CONSTANTS.WECHAT_FAILED_REASON.NOT_IN_WECHAT_PLATFORM:
                        // Login guest
                        this[$localUserDataService].setGuestLogin()
                        break
                    default:
                }
            }
        })
    }

    connect(successCallback = null, failureCallback = null){
        this[$tempConnectSuccessCallback] = successCallback
        this[$tempConnectFailureCallback] = failureCallback
        return this[$socketService].connect(globalConfig.serverSettings.websocketServerURI)
    }

    isConnection(){
        return this[$socketService].isConnection()
    }

    isWaiting(){
        return this[$socketService].isWaiting()
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

    getWechatSharedCanvasRenderedTexture(){
        return this[$wechatPlatformService].getSharedCanvasRenderedTexture()
    }

    checkIsInWechatGame(){
        return this[$wechatPlatformService].checkIsWechatGamePlatform()
    }

    getUserId(){
        return this[$localUserDataService].userId
    }

    getUserNickName(){
        return this[$localUserDataService].nickName
    }

    getUserAvatarUrl(){
        return this[$localUserDataService].avatarUrl
    }

    getUserLoginType(){
        return this[$localUserDataService].loginType
    }

    [$onconnected](returnValue, reason, code){
        cc.log("Websocket server connected !")
        if(this[$tempConnectSuccessCallback] != null){
            let cb = this[$tempConnectSuccessCallback]
            this[$tempConnectSuccessCallback] = null
            cb(returnValue, reason, code)
        }
    }

    [$ondisconnected](returnValue, reason, code){
        cc.log("Websocket server disconnected !")
        if(this[$tempConnectFailureCallback] != null){
            let cb = this[$tempConnectFailureCallback]
            this[$tempConnectFailureCallback] = null
            cb(returnValue, reason, code)
        }else if(this[$socketDisconnectedCallback]!=null){
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