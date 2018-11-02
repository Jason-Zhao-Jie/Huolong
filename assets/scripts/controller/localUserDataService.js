import stringUtils from '../utils/stringUtils'
import CONSTANTS from '../config/constants'

let proto = require('../protocol/ArmyAntMessage/Common/base_pb')

export default class LocalUserDataService {
    constructor(){
        this.loginType = proto.LoginType.AUTO
        this.nickName = null
        this.avatarUrl = null
        this.userId = null
        this.sex = CONSTANTS.SEX.UNKNOWN
        this.wechatLoginFailureReason = null
    }

    setWechatUserInfo(userInfo){
        switch(cc.sys.os){
            case cc.sys.OS_IOS:
                this.loginType = proto.LoginType.WECHATIOS
                break
            case cc.sys.OS_ANDROID:
                this.loginType = proto.LoginType.WECHATANDROID
                break
            default:
                this.loginType = proto.LoginType.WECHATOTHERS
        }
        this.nickName = userInfo.nickName
        this.avatarUrl = userInfo.avatarUrl
        this.userId = userInfo.openId
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
        switch(cc.sys.os){
            case cc.sys.OS_IOS:
                this.loginType = proto.LoginType.WECHATIOS
                break
            case cc.sys.OS_ANDROID:
                this.loginType = proto.LoginType.WECHATANDROID
                break
            default:
                this.loginType = proto.LoginType.WECHATOTHERS
        }
        this.nickName = "佚名"
        this.avatarUrl = null
        this.userId = null
        this.sex = CONSTANTS.SEX.UNKNOWN
        this.wechatLoginFailureReason = reason
    }

    setGuestLogin(){
        if(cc.sys.isBrowser){
            this.loginType = proto.LoginType.HTMLGUEST
        }else switch(cc.sys.os){
            case cc.sys.OS_IOS:
                this.loginType = proto.LoginType.APPIOSGUEST
                break
            case cc.sys.OS_ANDROID:
                this.loginType = proto.LoginType.APPANDROIDGUEST
                break
            case cc.sys.OS_WINDOWS:
                this.loginType = proto.LoginType.APPWINDOWSGUEST
                break
            case cc.sys.OS_LINUX:
                this.loginType = proto.LoginType.APPLINUXGUEST
                break
            case cc.sys.OS_WINRT:
                this.loginType = proto.LoginType.APPWINDOWSSTOREGUEST
                break
            case cc.sys.OS_OSX:
                this.loginType = proto.LoginType.APPMACOSGUEST
                break
            default:
                this.loginType = proto.LoginType.APPOTHERSGUEST
        }
        this.nickName = "游客"
        this.avatarUrl = null
        //this.userId = stringUtils.getRandomString()
        this.userId = "JasonZhaoJie"
        this.sex = CONSTANTS.SEX.UNKNOWN
    }

}