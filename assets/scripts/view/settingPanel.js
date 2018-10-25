import globalConfig from '../config/globalConfig'

let prefab = null

let SettingPanel = cc.Class({
    extends: cc.Layout,

    properties: {
        sliderMusicVolumn: {
            default: null,
            type: cc.Slider,
            serializable: true
        },

        sliderMusicVolumn_btnBar: {
            default: null,
            type: cc.Button,
            serializable: true
        },

        btnSaveClose: {
            default: null,
            type: cc.Button,
            serializable: true
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.sliderMusicVolumn_btnBar.node.on(cc.Node.EventType.TOUCH_END, this.onMusicVolumnChange.bind(this))
        this.sliderMusicVolumn_btnBar.node.on(cc.Node.EventType.TOUCH_MOVE, this.onMusicVolumnChange.bind(this))
        this.sliderMusicVolumn_btnBar.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onMusicVolumnChange.bind(this))
        this.btnSaveClose.node.on(cc.Node.EventType.TOUCH_END, this.onSaveSettings.bind(this))

    },

    start () {
        this.sliderMusicVolumn.progress = globalConfig.gameSettings.musicVolumn / 100
    },

    // update (dt) {},


    onMusicVolumnChange(){
        let volumn = this.sliderMusicVolumn.progress * 100
        cc.audioEngine.setVolume(globalConfig.runningObjects.bgmId, volumn)
        globalConfig.gameSettings.musicVolumn = volumn
    },

    onSaveSettings(){
        this.node.removeFromParent()
    },

});

SettingPanel.setPrefab = (settingPanel_prefab)=>{
    prefab = settingPanel_prefab
}

SettingPanel.show = ()=>{
    let panel = cc.instantiate(prefab)
    return panel
}
