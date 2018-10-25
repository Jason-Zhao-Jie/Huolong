import CONSTANTS from '../config/constants'

let prefab = null

let GameReportPanel_Huolong = cc.Class({
    extends: cc.Layout,

    properties: {
        labelGameResult: {
            default: null,
            type: cc.Label,
            serializable: true
        },

        labelTotalRoundsCount: {
            default: null,
            type: cc.Label,
            serializable: true
        },

        labelOurValue: {
            default: null,
            type: cc.Label,
            serializable: true
        },

        labelTheirValue: {
            default: null,
            type: cc.Label,
            serializable: true
        },

        btnBackToStart: {
            default: null,
            type: cc.Button,
            serializable: true
        },

        parameters:{
            default:null,
        },

        callback:{
            default:null,
        },
    },

    onLoad () {
        this.btnBackToStart.node.on(cc.Node.EventType.TOUCH_END, this.onClose.bind(this))

    },

    start () {
        if(this.parameters){
            this.labelTotalRoundsCount.string = this.parameters.roundsCount
            if(this.parameters.areWeWin){
                this.labelGameResult.string = "游戏胜利"
                this.labelGameResult.node.color = CONSTANTS.LABEL_COLOR.GREEN
                this.labelOurValue.string = "胜利"
                this.labelTheirValue.string = this.parameters.loserLevel
            }else{
                this.labelGameResult.string = "游戏结束"
                this.labelGameResult.node.color = CONSTANTS.LABEL_COLOR.RED
                this.labelOurValue.string = this.parameters.loserLevel
                this.labelTheirValue.string = "胜利"
            }
        }
    },

    // update (dt) {},

    startShow(data, callback){
        this.parameters = data
        this.callback = callback
    },

    onClose(){
        this.node.removeFromParent()
        if(this.callback){
            this.callback()
        }
    },

});



GameReportPanel_Huolong.setPrefab = (gameReportPanel_huolong_prefab)=>{
    prefab = gameReportPanel_huolong_prefab
}

GameReportPanel_Huolong.show = (data, callback)=>{
    let panel = cc.instantiate(prefab)
    panel.getComponent(GameReportPanel_Huolong).startShow(data, callback)
    return panel
}

export default GameReportPanel_Huolong
