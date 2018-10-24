import globalConfig from '../config/globalConfig'
import TipBar from './tipBar'

cc.Class({
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

        panelGameReportHuolong: {
            default: null,
            type: cc.Layout,
            serializable: true
        },

        gameReportHuolong_labelGameResult: {
            default: null,
            type: cc.Label,
            serializable: true
        },

        gameReportHuolong_labelTotalRoundsCount: {
            default: null,
            type: cc.Label,
            serializable: true
        },

        gameReportHuolong_labelOurValue: {
            default: null,
            type: cc.Label,
            serializable: true
        },

        gameReportHuolong_labelTheirValue: {
            default: null,
            type: cc.Label,
            serializable: true
        },

        gameReportHuolong_btnBackToStart: {
            default: null,
            type: cc.Button,
            serializable: true
        },

        settingPanel: {
            default: null,
            type: cc.Layout,
            serializable: true
        },

        setting_sliderMusicVolumn: {
            default: null,
            type: cc.Slider,
            serializable: true
        },

        setting_sliderMusicVolumn_btnBar: {
            default: null,
            type: cc.Button,
            serializable: true
        },

        setting_btnSaveClose: {
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
    },

    // LIFE-CYCLE CALLBACKS:


    onLoad () {
        if(!CC_EDITOR){
            this.startMenu_btnSimpleStart.node.on(cc.Node.EventType.TOUCH_END, this.onClickSimpleStart.bind(this))
            this.startMenu_btnCreateRoom.node.on(cc.Node.EventType.TOUCH_END, this.onClickCreateRoom.bind(this))
            this.startMenu_btnJoinRoom.node.on(cc.Node.EventType.TOUCH_END, this.onClickJoinRoom.bind(this))
            this.startMenu_btnHistory.node.on(cc.Node.EventType.TOUCH_END, this.onClickHistory.bind(this))
            this.startMenu_btnSetting.node.on(cc.Node.EventType.TOUCH_END, this.onClickSetting.bind(this))
            this.gameReportHuolong_btnBackToStart.node.on(cc.Node.EventType.TOUCH_END, this.resetMainMenu.bind(this))
            this.setting_sliderMusicVolumn_btnBar.node.on(cc.Node.EventType.TOUCH_END, this.onMusicVolumnChange.bind(this))
            this.setting_sliderMusicVolumn_btnBar.node.on(cc.Node.EventType.TOUCH_MOVE, this.onMusicVolumnChange.bind(this))
            this.setting_sliderMusicVolumn_btnBar.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onMusicVolumnChange.bind(this))
            this.setting_btnSaveClose.node.on(cc.Node.EventType.TOUCH_END, this.onSaveSettings.bind(this))

            // 播放背景音乐, 因包体积过大, 暂时去掉背景音乐, 预计将来从服务器获取背景音乐
            // this.bgmId = cc.audioEngine.play(this.audio_bgm, true, globalConfig.gameSettings.musicVolumn)
        }
    },

    start () {
        if(!CC_EDITOR){
            this.resetMainMenu()
        }
    },

    // update (dt) {},

    onClickSimpleStart () {
        cc.director.loadScene("MainScene")
    },

    onClickCreateRoom () {
        this.showTips('联网对战服务器正在建设中, 敬请期待')
    },

    onClickJoinRoom () {
        this.showTips('联网对战服务器正在建设中, 敬请期待')
    },

    onClickHistory () {
        this.showTips('联网对战服务器正在建设中, 敬请期待')
    },

    onClickSetting () {
        this.setting_sliderMusicVolumn.progress = globalConfig.gameSettings.musicVolumn / 100
        this.settingPanel.node.active = true
    },
    
    // 回到开始菜单
    resetMainMenu () {
        this.startMenu.node.active = true
        this.panelGameReportHuolong.node.active = false
        this.settingPanel.node.active = false
    },

    onMusicVolumnChange(){
        cc.audioEngine.setVolume(this.bgmId, this.setting_sliderMusicVolumn.progress * 100)
    },

    onSaveSettings(){
        globalConfig.gameSettings.musicVolumn = this.setting_sliderMusicVolumn.progress * 100
        this.settingPanel.node.active = false
    },

    // 展示提示文
    showTips(content){
        let tipBar = cc.instantiate(this.prefab_tips)
        tipBar.getComponent(TipBar).setContent(content)
        this.node.addChild(tipBar)
    },

    onGameOver(gameReportResult){
        this.showTips("游戏结束, 获胜者:"+(gameReportResult.areWeWin?"我方":"敌方")+", 总局数:"+gameReportResult.roundsCount+", 即将返回开始界面")
        this.startMenu.node.active = false
        this.panelGameReportHuolong.node.active = true
        this.gameReportHuolong_labelTotalRoundsCount.string = gameReportResult.roundsCount
        if(gameReportResult.areWeWin){
            this.gameReportHuolong_labelGameResult.string = "游戏胜利"
            this.gameReportHuolong_labelGameResult.node.color = LABEL_COLOR_GREEN
            this.gameReportHuolong_labelOurValue = "胜利"
            this.gameReportHuolong_labelTheirValue = gameReportResult.loserLevel
        }else{
            this.gameReportHuolong_labelGameResult.string = "游戏结束"
            this.gameReportHuolong_labelGameResult.node.color = LABEL_COLOR_RED
            this.gameReportHuolong_labelOurValue = gameReportResult.loserLevel
            this.gameReportHuolong_labelTheirValue = "胜利"
        }
    }
});
