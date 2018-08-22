// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

import loader from './loader'

if(!CC_EDITOR && typeof wx == 'undefined'){
    cc.error("这是微信小游戏的开放数据域, 请在微信小游戏中运行")
}

cc.Class({
    extends: cc.Canvas,

    properties: {
        myHead:{
            default:null,
            type:cc.Sprite,
            serializable:true,
        },
        myNickname:{
            default:null,
            type:cc.Label,
            serializable:true,
        },
    },

    onLoad () {
        if(!CC_EDITOR){
            this.myHead.node.active = false
            this.myNickname.node.active = false
            wx.onMessage(data => {
                switch(data.command){
                    case "pleaseShowUserInfo":
                        this.onShowSelfUserInfo()
                        break
                    default:
                        cc.log("收到主域事件:"+data.command)
                }
            })
        }
    },

    start () {
        if(!CC_EDITOR){
        }
    },

    update (dt) {
        if(!CC_EDITOR){
        }
    },

    onShowSelfUserInfo(){
        cc.log("收到主域命令:获取并显示用户信息")
        wx.getUserInfo({
            lang:"zh_CN", 
            success:(res)=>{
                loader.loadImgTextureFromUrl(res.userInfo.avatarUrl, (texture)=>{
                    this.myHead.node.active = true
                    this.myHead.spriteFrame = new cc.SpriteFrame(texture)
                    this.myNickname.node.active = true
                    this.myNickname.string = res.userInfo.nickName
                })
                cc.log("获取微信用户信息成功!")
            }, 
            fail:()=>{
                cc.error("获取微信用户信息失败!")
            }, 
            complete:()=>{

            }
        })
    }
});
