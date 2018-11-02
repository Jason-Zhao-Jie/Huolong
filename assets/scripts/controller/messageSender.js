let SubApps = require('../protocol/ArmyAntMessage/SubApps/Huolong_pb')
import ServiceBus from './serviceBus'

let instance = null

let $serviceBus = Symbol("serviceBus")

class MessageSender {
    /** @param { ServiceBus } serviceBus */
    constructor(serviceBus){
        this[$serviceBus] = serviceBus
        instance = this
    }

    sendLogin(type, userId, userPassword, accountAuth, autoLoginAuth){
        let msg = new SubApps.C2SM_HuolongLoginRequest()
        msg.setType(type)
        msg.setUserId(userId)
        msg.setUserPassword(userPassword)
        msg.setAccountAuth(accountAuth)
        msg.setAutoLoginAuth(autoLoginAuth)
        this[$serviceBus].sendMessage(msg)
    }

    sendLogout(autoLoginAuth){
        let msg = new SubApps.C2SM_HuolongLogoutRequest()
        msg.setAutoLoginAuth(autoLoginAuth)
        this[$serviceBus].sendMessage(msg)
    }

    sendCreateTable(type){
        let msg = new SubApps.C2SM_HuolongCreateTableRequest()
        msg.setType(type)
        this[$serviceBus].sendMessage(msg)
    }

    sendEnterTable(roomNumber){
        let msg = new SubApps.C2SM_HuolongEnterTableRequest()
        msg.setRoomNumber(roomNumber)
        this[$serviceBus].sendMessage(msg)
    }
}

MessageSender.getInstance = ()=>{
    return instance
}

export default MessageSender
