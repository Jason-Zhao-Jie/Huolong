import protoMessageCodeHelper from '../protocol/proto_message_code_helper'
import ServiceBus from './serviceBus'

let SubApps = require('../protocol/ArmyAntMessage/SubApps/Huolong_pb')

let $serviceBus = Symbol("serviceBus")

export default class MessageReceiver {
    /** @param { ServiceBus } serviceBus */
    constructor(serviceBus){
        this[$serviceBus] = serviceBus

        // 回调列表
        let cbList = {
            [SubApps.SM2C_HuolongLoginResponse]: this.onHuolongLoginResponse,
            [SubApps.SM2C_HuolongLogoutResponse]: this.onHuolongLogoutResponse,
            [SubApps.SM2C_HuolongCreateTableResponse]: this.onHuolongCreateTableResponse,
            [SubApps.SM2C_HuolongEnterTableResponse]: this.onHuolongEnterTableResponse,
            [SubApps.SM2C_HuolongNoticeRoomInfo]: this.onHuolongNoticeRoomInfo,
            [SubApps.SM2C_HuolongNoticeGameStart]: this.onHuolongNoticeGameStart,
        }
        for(let k in cbList){
            serviceBus.setMessageListener(protoMessageCodeHelper.toMsgCode(k), cbList[k].bind(this))
        }
    }

    onHuolongLoginResponse(msg){
        
    }

    onHuolongLogoutResponse(msg){
        
    }

    onHuolongCreateTableResponse(msg){
        
    }

    onHuolongEnterTableResponse(msg){
        
    }

    onHuolongNoticeRoomInfo(msg){
        
    }

    onHuolongNoticeGameStart(msg){
        
    }

}
