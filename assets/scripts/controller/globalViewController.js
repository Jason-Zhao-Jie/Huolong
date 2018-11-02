import Scheduler from '../utils/scheduler'
import WaitingBar from '../view/waitingBar'
import TipBar from '../view/tipBar'
import MessageBox from '../view/messageBox'
import HallController from './hallController'

let instance = null

let LOGIN_TIMEOUT_MAX= 0

class GlobalViewController {
    constructor(){
        this.networkWaitingBar = null
        this.scheduler = new Scheduler()
        this.scheduler.run(this.update.bind(this))
        this.loginWait = 0
    }

    update(dt){
        if(HallController.getInstance().serviceBus.isWaiting()){
            let str = "等待网络..."
            if(!HallController.getInstance().getIsLoggedIn()){
                str = "登录中..."
                this.loginWait += dt
            }else{
                this.loginWait = 0
            }
            if(this.networkWaitingBar == null){
                this.networkWaitingBar = WaitingBar.show(str)
            }else{
                this.networkWaitingBar.getComponent(WaitingBar).setContent(str)
            }
            if(this.loginWait > LOGIN_TIMEOUT_MAX && LOGIN_TIMEOUT_MAX > 0){
                this.networkWaitingBar.removeFromParent()
                this.networkWaitingBar = null
                TipBar.show("登录超时, 服务器无响应")
            }
        }else{
            if(this.networkWaitingBar != null){
                this.networkWaitingBar.removeFromParent()
                this.networkWaitingBar = null
            }
        }
    }

    uiNotice(text){
        TipBar.show(text)
    }

    askForReconnect(okCallback, cancelCallback){
        let scene = cc.director.getScene()
        let messageBox = MessageBox.show("网络断开连接, 是否重新连接?", "取消", ()=>{
            cancelCallback(()=>{

            })
        }, "重新连接", ()=>{
            let waitingConnectionBar = WaitingBar.show("网络连接中...")
            let connectCB = ()=>{
                waitingConnectionBar.removeFromParent()
                if(this.controller.sendLogin() != null){ // 登陆失败
                    MessageBox.show(res, "确定")
                }
            }
            onCallback(connectCB, ()=>{
                waitingConnectionBar.removeFromParent()
                this.askForReconnect(okCallback, cancelCallback)
            })
        })
    }
}

GlobalViewController.getInstance = ()=>{
    if(instance == null)
        instance = new GlobalViewController()
    return instance
}

export default GlobalViewController
