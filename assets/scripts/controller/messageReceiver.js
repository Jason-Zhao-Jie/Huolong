import objectUtils from '../utils/objectUtils'
import protoMessageCodeHelper from '../protocol/proto_message_code_helper'
import ServiceBus from './serviceBus'
import GlobalViewController from './globalViewController'

let SubApps = require('../protocol/ArmyAntMessage/SubApps/Huolong_pb')

let $serviceBus = Symbol("serviceBus")
let $loginResponseCallback = Symbol("@loginResponseCallback")
let $isLoggedIn = Symbol("@isLoggedIn")

export default class MessageReceiver {
    /** @param { ServiceBus } serviceBus */
    constructor(serviceBus){
        this[$serviceBus] = serviceBus
        this[$loginResponseCallback] = null
        this[$isLoggedIn] = false

        // 回调列表
        let cbList = {
            [SubApps.SM2C_HuolongLoginResponse.prototype.constructor.displayName]: this.onHuolongLoginResponse,
            [SubApps.SM2C_HuolongLogoutResponse.prototype.constructor.displayName]: this.onHuolongLogoutResponse,
            [SubApps.SM2C_HuolongCreateTableResponse.prototype.constructor.displayName]: this.onHuolongCreateTableResponse,
            [SubApps.SM2C_HuolongEnterTableResponse.prototype.constructor.displayName]: this.onHuolongEnterTableResponse,
            [SubApps.SM2C_HuolongNoticeRoomInfo.prototype.constructor.displayName]: this.onHuolongNoticeRoomInfo,
            [SubApps.SM2C_HuolongNoticeGameStart.prototype.constructor.displayName]: this.onHuolongNoticeGameStart,
        }
        for(let k in cbList){
            serviceBus.setMessageListener(protoMessageCodeHelper.toMsgCode(k), cbList[k].bind(this))
        }
    }

    isLoggedIn(){
        return this[$isLoggedIn] && this[$serviceBus].isConnection()
    }

    setLoginResponseCallback(cb){
        this[$loginResponseCallback] = cb
    }

    onHuolongLoginResponse(msg){
        if(msg.result == 0){ // 成功
            this[$isLoggedIn] = true
            GlobalViewController.getInstance().uiNotice("登录成功")
        }else{
            GlobalViewController.getInstance().uiNotice("登录失败! 错误信息:"+msg.message)
        }
    }

    onHuolongLogoutResponse(msg){
        if(msg.result == 0){ // 成功
            this[$isLoggedIn] = false
            GlobalViewController.getInstance().uiNotice("已退出登录")
        }else{
            GlobalViewController.getInstance().uiNotice("退出登录失败! 错误信息:"+msg.message)
        }
    }

    onHuolongCreateTableResponse(msg){
        let str = "收到创建房间返回, 内容: " + objectUtils.dump(msg)
        cc.log(str)
        GlobalViewController.getInstance().uiNotice(str)
    }

    onHuolongEnterTableResponse(msg){
        let str = "收到加入房间返回, 内容: " + objectUtils.dump(msg)
        cc.log(str)
        GlobalViewController.getInstance().uiNotice(str)
    }

    onHuolongNoticeRoomInfo(msg){
        let str = "收到房间信息变更通知, 内容: " + objectUtils.dump(msg)
        cc.log(str)
        GlobalViewController.getInstance().uiNotice(str)
    }

    onHuolongNoticeGameStart(msg){       
    }

}
