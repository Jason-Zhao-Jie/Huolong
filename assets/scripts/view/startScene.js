import CONSTANTS from '../config/constants'
import HallController from '../controller/hallController'
import TipBar from './tipBar'
import SettingPanel from './settingPanel'
import EnterRoomPanel from './enterRoomPanel'
import GameReportPanel_Huolong from './gameReportPanel_huolong'
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
        prefab_settingPanel:{
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
        }
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
            SettingPanel.setPrefab(this.prefab_settingPanel)
            EnterRoomPanel.setPrefab(this.prefab_enterRoomPanel)
            GameReportPanel_Huolong.setPrefab(this.prefab_gameReportPanel_huolong)

            this.controller = HallController.getInstance()
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
            canvas.getComponent(MainScene).startGame(CONSTANTS.GAMETYPE.HUOLONG, CONSTANTS.PLAYERTYPE.NETWORK, {}) // TODO : player data
            
        })
    },

    onClickCreateRoom () {
        TipBar.show('联网对战服务器正在建设中, 敬请期待')
    },

    onClickJoinRoom () {
        TipBar.show('联网对战服务器正在建设中, 敬请期待')
    },

    onClickHistory () {
        TipBar.show('联网对战服务器正在建设中, 敬请期待')
    },

    onClickSetting () {
        this.node.addChild(SettingPanel.show())
    },

    onGameOver(gameReportResult){
        TipBar.show("游戏结束, 获胜者:"+(gameReportResult.areWeWin?"我方":"敌方")+", 总局数:"+gameReportResult.roundsCount)
        this.startMenu.node.active = false
        this.node.addChild(GameReportPanel_Huolong.show(gameReportResult, ()=>{this.startMenu.node.active = true}))
    }
});

export default StartScene
