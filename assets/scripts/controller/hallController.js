import ServiceBus from './serviceBus'
import MessageSender from './messageSender'
import MessageReceiver from './messageReceiver'
import GlobalViewController from './globalViewController'

let protoHuolong = require('../protocol/ArmyAntMessage/SubApps/huolong_pb')

let instance = null


let $onSocketDisconnected = Symbol("@onSocketDisconnected")

class HallController {
    constructor(){
        this.serviceBus = new ServiceBus(this, this[$onSocketDisconnected].bind(this))
        this.messageSender = new MessageSender(this.serviceBus)
        this.messageReceiver = new MessageReceiver(this.serviceBus)
    }

    getWechatSharedCanvasRenderedTexture(){
        return this.serviceBus.getWechatSharedCanvasRenderedTexture()
    }

    getIsLoggedIn(){
        return this.messageReceiver.isLoggedIn()
    }

    /**
     * @param {function} responseCallback : 
     * @returns {string} returns null if success, or failure tip string if failed
     */
    sendLogin(){
        if(this.serviceBus.checkIsInWechatGame() && this.serviceBus.getUserAvatarUrl() == null){
            return "未能成功获取微信用户信息, 请检查网络并重新启动程序, 若拒绝了用户信息获取的授权, 请在设定中允许授权, 否则无法使用联网功能"
        }else{
            this.messageSender.sendLogin(this.serviceBus.getUserLoginType(), this.serviceBus.getUserId(), "", "", "")
            return null
        }
    }

    sendCreateRoom(){
        this.messageSender.sendCreateTable(protoHuolong.HuolongGameType.Huolong)
    }

    sendJoinRoom(roomNumber){
        this.messageSender.sendEnterTable(roomNumber)
    }

    static getInstance = ()=>{
        if (instance == null){
            instance= new HallController()
        }
        return instance
    }

    // private member functions
    [$onSocketDisconnected](){
        cc.log("Websocket connection Lost !")
        GlobalViewController.getInstance().askForReconnect((cb)=>{
            cb()
        }, (successCB, failedCB)=>{
            cc.log("Will reconnect to server ...")
            this.serviceBus.connect(successCB, failedCB)
        })
    }
}

export default HallController
