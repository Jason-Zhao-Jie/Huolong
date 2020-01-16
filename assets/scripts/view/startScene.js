import CONSTANTS from '../config/constants'
import HallController from '../controller/hallController'
import GlobalViewController from '../controller/globalViewController'
import TipBar from './tipBar'
import WaitingBar from './waitingBar'
import SettingPanel from './settingPanel'
import MessageBox from './messageBox'
import EnterRoomPanel from './enterRoomPanel'
import GameReportPanel_Huolong from './gameReportPanel_huolong'
import RoundReportPanel_Huolong from './roundReportPanel_huolong'
import MainScene from './mainScene'

let StartScene = cc.Class({
    extends: cc.Canvas,

    properties: {
        prefab_card:{
            default:null,
            type:cc.Prefab
        },
        prefab_tips:{
            default:null,
            type:cc.Prefab
        },
        prefab_waitingBar:{
            default:null,
            type:cc.Prefab
        },
        prefab_settingPanel:{
            default:null,
            type:cc.Prefab
        },
        prefab_messageBox:{
            default:null,
            type:cc.Prefab
        },
        prefab_enterRoomPanel:{
            default:null,
            type:cc.Prefab
        },
        prefab_gameReportPanel_huolong:{
            default:null,
            type:cc.Prefab
        },
        prefab_roundReportPanel_huolong:{
            default:null,
            type:cc.Prefab
        },
        audio_bgm:{
            default:null,
            url: cc.AudioClip,
        },
        startMenu: {
            default: null,
            type: cc.Layout,
            serializable: true
        },
        startMenu_btnSimpleStart: {
            default: null,
            type: cc.Button,
            serializable: true
        },
        startMenu_btnCreateRoom: {
            default: null,
            type: cc.Button,
            serializable: true
        },
        startMenu_btnJoinRoom: {
            default: null,
            type: cc.Button,
            serializable: true
        },
        startMenu_btnHistory: {
            default: null,
            type: cc.Button,
            serializable: true
        },
        startMenu_btnSetting: {
            default: null,
            type: cc.Button,
            serializable: true
        },

        userCode:{
            default:""
        },

        bgmId:{
            default: 0,
        },

        controller:{
            default: null,
        },

        globalViewController:{
            default: null,
        },
    },

    // LIFE-CYCLE CALLBACKS:


    onLoad () {
        if(!CC_EDITOR){
            this.startMenu_btnSimpleStart.node.on(cc.Node.EventType.TOUCH_END, this.onClickSimpleStart.bind(this))
            this.startMenu_btnCreateRoom.node.on(cc.Node.EventType.TOUCH_END, this.onClickCreateRoom.bind(this))
            this.startMenu_btnJoinRoom.node.on(cc.Node.EventType.TOUCH_END, this.onClickJoinRoom.bind(this))
            this.startMenu_btnHistory.node.on(cc.Node.EventType.TOUCH_END, this.onClickHistory.bind(this))
            this.startMenu_btnSetting.node.on(cc.Node.EventType.TOUCH_END, this.onClickSetting.bind(this))

            TipBar.setPrefab(this.prefab_tips)
            WaitingBar.setPrefab(this.prefab_waitingBar)
            SettingPanel.setPrefab(this.prefab_settingPanel)
            MessageBox.setPrefab(this.prefab_messageBox)
            EnterRoomPanel.setPrefab(this.prefab_enterRoomPanel)
            GameReportPanel_Huolong.setPrefab(this.prefab_gameReportPanel_huolong)
            RoundReportPanel_Huolong.setPrefab(this.prefab_roundReportPanel_huolong)

            this.controller = HallController.getInstance()
            this.globalViewController = GlobalViewController.getInstance()
            // 播放背景音乐, 因包体积过大, 暂时去掉背景音乐, 预计将来从服务器获取背景音乐
            // this.bgmId = cc.audioEngine.play(this.audio_bgm, true, globalConfig.gameSettings.musicVolumn)

            this.startMenu.node.active = true
        }
    },

    start () {
        if(!CC_EDITOR){
            
        }
    },

    // update (dt) {},

    onClickSimpleStart () {
        cc.director.loadScene("MainScene", ()=>{
            let canvas = cc.director.getScene().getChildByName('Canvas')
            canvas.getComponent(MainScene).startGame(CONSTANTS.GAMETYPE.HUOLONG, CONSTANTS.PLAYERTYPE.AI, {}) // TODO : player data
            
        })
    },

    onClickCreateRoom () {
        if(this.onCheckLogin()){
            TipBar.show('联网对战服务器正在建设中, 敬请期待')
            this.controller.sendCreateRoom()
        }
    },

    onClickJoinRoom () {
        if(this.onCheckLogin()){
            this.node.addChild(EnterRoomPanel.show((roomNumber)=>{
                TipBar.show('联网对战服务器正在建设中, 敬请期待')
                this.controller.sendJoinRoom(roomNumber)
            }, ()=>{
            }))
        }
    },

    onClickHistory () {
        if(this.onCheckLogin()){
            TipBar.show('联网对战服务器正在建设中, 敬请期待')
        }
    },

    onClickSetting () {
        this.node.addChild(SettingPanel.show())
    },

    onCheckLogin(){
        if(!this.controller.getIsLoggedIn()){
            MessageBox.show("需要先登录服务器", "取消", ()=>{}, "登录", ()=>{
                let waitingConnectionBar = WaitingBar.show("网络连接中...")
                waitingConnectionBar.active = false
                let loginCB = ()=>{
                    waitingConnectionBar.removeFromParent()
                    if(this.controller.sendLogin() != null){ // 登陆失败
                        MessageBox.show(res, "确定")
                    }
                }
                let reconnectCB = ()=>{
                    waitingConnectionBar.active = false
                    MessageBox.show("连接服务器失败, 是否重试?", "取消", ()=>{
                        waitingConnectionBar.removeFromParent()
                    }, "重试", ()=>{
                        waitingConnectionBar.active = true
                        this.controller.serviceBus.connect(loginCB, reconnectCB)
                    })
                }
                if(this.controller.serviceBus.isConnection()){
                    loginCB()
                }else{
                    waitingConnectionBar.active = true
                    this.controller.serviceBus.connect(loginCB, reconnectCB)
                }
            })
            return false
        }else{
            return true
        }
    },

    onGameOver(gameReportResult){
        TipBar.show("游戏结束, 获胜者:"+(gameReportResult.areWeWin?"我方":"敌方")+", 总局数:"+gameReportResult.roundsCount)
        this.startMenu.node.active = false
        this.node.addChild(GameReportPanel_Huolong.show(gameReportResult, ()=>{this.startMenu.node.active = true}))
    }
});

export default StartScene
