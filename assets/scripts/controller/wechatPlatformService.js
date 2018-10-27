import CONSTANTS from '../config/constants'

export default class WechatPlatformService{
    constructor(){
        this.wechatUserCode = ""
    }

    checkIsWechatGamePlatform(){
        return (typeof wx) != 'undefined'
    }

    wechatLogin(callback){
        if(this.checkIsWechatGamePlatform()){
            wx.login({
                success: (code) =>{
                    this.wechatUserCode = code
                    wx.getUserInfo({
                        withCredentials:false,  // 目前暂时不需要获取用户敏感信息
                        lang:"zh_CN",
                        success: (res)=>{
                            if(!res.userInfo){
                                callback(false, "获取微信用户信息成功, 但是没有任何数据, 现在将使用非授权接口读取基本信息, 部分功能可能受到限制", CONSTANTS.WECHAT_FAILED_REASON.LOGIN_SUCCESSFUL_BUT_NO_DATA)
                                this.sendMsgToWxSharedCanvas({
                                    command:"pleaseShowUserInfo",
                                    reason:"getUserInfo succeed, but nothing returned"
                                })
                            }else{
                                callback(true, res.userInfo, CONSTANTS.WECHAT_FAILED_REASON.SUCCESSFUL)
                            }
                        },
                        fail: (res)=>{
                            // iOS 和 Android 对于拒绝授权的回调 errMsg 没有统一，需要做一下兼容处理
                            if (res.errMsg.indexOf('auth deny') > -1 || 	res.errMsg.indexOf('auth denied') > -1 ) {
                                // 处理用户拒绝授权的情况
                                callback(false, "拒绝授权, 将不能进行联机游戏, 如需重新允许, 请点击右上角菜单中的设置", CONSTANTS.WECHAT_FAILED_REASON.USER_REFUSED_ACCESS)
                            }else{
                                let errStr = ""
                                for(let i=0; i<res.errMsg.length;++i){
                                    errStr+=res.errMsg[i]+"  "
                                }
                                callback(false, "授权失败, 错误码: "+errStr, "现在将使用非授权接口读取基本信息, 部分功能可能受到限制", CONSTANTS.WECHAT_FAILED_REASON.ACCESS_GET_FAILED)
                                this.sendMsgToWxSharedCanvas({
                                    command:"pleaseShowUserInfo",
                                    reason:"getUserInfo failed, because of the program is in developing"
                                })
                            }
                        },
                        complete: ()=>{

                        }
                      }
                    )
                },
                fail: (res)=> {
                    let errStr = ""
                    for(let i=0; i<res.errMsg.length;++i){
                        errStr+=res.errMsg[i]+"  "
                    }
                    callback(false, "微信登录失败, 错误码: "+errStr, "现在将使用非授权接口读取基本信息, 部分功能可能受到限制", CONSTANTS.WECHAT_FAILED_REASON.LOGIN_FAILED)
                    this.sendMsgToWxSharedCanvas({
                        command:"pleaseShowUserInfo",
                        reason:"login failed"
                    })

                },
                complete:()=>{

                }
            })
        }
        callback(false, "不在微信小游戏平台", CONSTANTS.WECHAT_FAILED_REASON.NOT_IN_WECHAT_PLATFORM)
    }


    sendMsgToWxSharedCanvas(msgData){
        if(this.checkIsWechatGamePlatform()){
            let openDataContext = wx.getOpenDataContext()
            openDataContext.postMessage(msgData)
        }
    }


    getSharedCanvasRenderedTexture(){
        if(this.checkIsWechatGamePlatform()){
            let openDataContext = wx.getOpenDataContext()
            let sharedCanvas = openDataContext.canvas
            let tex = new cc.Texture2D()
            tex.initWithElement(sharedCanvas);
            tex.handleLoadedTexture();
            return tex
        }
        return null
    }
}