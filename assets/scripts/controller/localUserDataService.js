import CONSTANTS from '../config/constants'

let proto = require('../protocol/ArmyAntMessage/Common/base_pb')

export default class LocalUserDataService {
    constructor(){
        this.loginType = proto.LoginType.AUTO
        this.nickName = null
        this.avatarUrl = null
        this.wechatOpenId = null
        this.sex = CONSTANTS.SEX.UNKNOWN
        this.wechatLoginFailureReason = null
    }

    setWechatUserInfo(userInfo){
        this.loginType = proto.LoginType.WECHATOTHERS   // TODO : 需要区分具体操作系统类别以修正此项
        this.nickName = userInfo.nickName
        this.avatarUrl = userInfo.avatarUrl
        this.wechatOpenId = userInfo.openId
        switch(userInfo.gender){
            case 1:
                this.sex = CONSTANTS.SEX.MALE
                break
            case 2:
                this.sex = CONSTANTS.SEX.FEMALE
                break
            default:
                this.sex = CONSTANTS.SEX.UNKNOWN
        }
        this.wechatLoginFailureReason = CONSTANTS.WECHAT_FAILED_REASON.SUCCESSFUL
    }

    setWechatLoginFailure(reason){
        this.loginType = proto.LoginType.WECHATOTHERS   // TODO : 需要区分具体操作系统类别以修正此项
        this.nickName = "佚名"
        this.avatarUrl = null
        this.wechatOpenId = null
        this.sex = CONSTANTS.SEX.UNKNOWN
        this.wechatLoginFailureReason = reason
    }


}