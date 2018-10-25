import CONSTANTS from '../config/constants'
import pokerUtils from '../utils/pokerUtils'
import BtnCard from './btnCard'

let prefab = null

let RoundReportPanel_Huolong = cc.Class({
    extends: cc.Layout,

    properties: {
        prefab_card: {
            default: null,
            type: cc.Prefab,
        },

        labelWinLose: {
            default: null,
            type: cc.Label,
            serializable: true
        },

        labelWinnerGetLast: {
            default: null,
            type: cc.Label,
            serializable: true
        },

        labelLoserScore: {
            default: null,
            type: cc.Label,
            serializable: true
        },

        labelOurOldLevel: {
            default: null,
            type: cc.Label,
            serializable: true
        },

        labelOurNewLevel: {
            default: null,
            type: cc.Label,
            serializable: true
        },

        labelTheirOldLevel: {
            default: null,
            type: cc.Label,
            serializable: true
        },

        labelTheirNewLevel: {
            default: null,
            type: cc.Label,
            serializable: true
        },

        lastCards: {
            default: null,
            type: cc.Node,
            serializable: true
        },

        btnSearchDesk: {
            default: null,
            type: cc.Button,
            serializable: true
        },

        btnContinue: {
            default: null,
            type: cc.Button,
            serializable: true
        },

        data:{
            default: null,
        },

        callback:{
            default: null,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.btnSearchDesk.node.on(cc.Node.EventType.TOUCH_END, this.onClickSearchDesk.bind(this))
        this.btnContinue.node.on(cc.Node.EventType.TOUCH_END, this.onClickRoundContinue.bind(this))

    },

    start () {
        if(this.data){
            this.onRoundOver(this.data)
        }
    },

    // update (dt) {},

    startShow(data, callback){
        this.data = data
        this.callback = callback
    },

    onClickSearchDesk(){
        this.node.active = false
    },

    onClickRoundContinue(){
        this.node.removeFromParent()
        if(this.callback){
            this.callback()
        }
    },

    onRoundOver(roundReportResult){
        let retString = ""
        if(roundReportResult.areWeOldZhuang && roundReportResult.areWeNewZhuang){
            if(roundReportResult.ourNewLevel == roundReportResult.ourOldLevel){
                retString = "保庄"
                this.labelWinLose.node.color = CONSTANTS.LABEL_COLOR.GREEN
            }else if(roundReportResult.ourNewLevel < roundReportResult.ourOldLevel && (roundReportResult.aSuccess || roundReportResult.jSuccess)){
                retString = "掉级"
                this.labelWinLose.node.color = CONSTANTS.LABEL_COLOR.RED
            }else if(roundReportResult.ourNewLevel - roundReportResult.ourOldLevel == 1 || (roundReportResult.ourNewLevel == 1 && roundReportResult.ourOldLevel == 13)){
                retString = "晋级"
                this.labelWinLose.node.color = CONSTANTS.LABEL_COLOR.GREEN
            }else{
                retString = "摘星"
                this.labelWinLose.node.color = CONSTANTS.LABEL_COLOR.GREEN
            }
        }else if(roundReportResult.areWeOldZhuang && !roundReportResult.areWeNewZhuang){
            if(roundReportResult.theirNewLevel == roundReportResult.theirOldLevel){
                retString = "丢庄"
                this.labelWinLose.node.color = CONSTANTS.LABEL_COLOR.RED
            }else if(roundReportResult.theirNewLevel - roundReportResult.theirOldLevel == 1 || (roundReportResult.theirNewLevel == 1 && roundReportResult.theirOldLevel == 13)){
                retString = "被连抠带垮"
                this.labelWinLose.node.color = CONSTANTS.LABEL_COLOR.RED
            }else{
                retString = "被逆转摘星"
                this.labelWinLose.node.color = CONSTANTS.LABEL_COLOR.RED
            }
        }else if(!roundReportResult.areWeOldZhuang && roundReportResult.areWeNewZhuang){
            if(roundReportResult.ourNewLevel == roundReportResult.ourOldLevel){
                retString = "夺庄"
                this.labelWinLose.node.color = CONSTANTS.LABEL_COLOR.GREEN
            }else if(roundReportResult.ourNewLevel - roundReportResult.ourOldLevel == 1 || (roundReportResult.ourNewLevel == 1 && roundReportResult.ourOldLevel == 13)){
                retString = "连抠带垮"
                this.labelWinLose.node.color = CONSTANTS.LABEL_COLOR.GREEN
            }else{
                retString = "逆转摘星"
                this.labelWinLose.node.color = CONSTANTS.LABEL_COLOR.GREEN
            }
        }else if(!roundReportResult.areWeOldZhuang && !roundReportResult.areWeNewZhuang){
            if(roundReportResult.theirNewLevel == roundReportResult.theirOldLevel){
                retString = "干抠"
                this.labelWinLose.node.color = CONSTANTS.LABEL_COLOR.GREEN
            }else if(roundReportResult.theirNewLevel < roundReportResult.theirOldLevel && (roundReportResult.aSuccess || roundReportResult.jSuccess)){
                retString = "夺命勾"
                this.labelWinLose.node.color = CONSTANTS.LABEL_COLOR.GREEN
            }else if(roundReportResult.theirNewLevel - roundReportResult.theirOldLevel == 1 || (roundReportResult.theirNewLevel == 1 && roundReportResult.theirOldLevel == 13)){
                retString = "败北"
                this.labelWinLose.node.color = CONSTANTS.LABEL_COLOR.RED
            }else{
                retString = "被摘星"
                this.labelWinLose.node.color = CONSTANTS.LABEL_COLOR.RED
            }
        }
        // 本局结果文字
        this.labelWinLose.string = retString
        this.labelWinnerGetLast.string = roundReportResult.isLoserGetLastCards?"失败":"成功"
        this.labelWinnerGetLast.node.color = roundReportResult.isLoserGetLastCards?CONSTANTS.LABEL_COLOR.RED:CONSTANTS.LABEL_COLOR.GREEN
        this.labelLoserScore.string = roundReportResult.loserScore
        if(roundReportResult.isLoserScoreOK)
            this.labelLoserScore.node.color = CONSTANTS.LABEL_COLOR.GREEN
        else
            this.labelLoserScore.node.color = CONSTANTS.LABEL_COLOR.RED
        this.labelOurOldLevel.string = pokerUtils.convertValueToString(roundReportResult.ourOldLevel)
        this.labelOurNewLevel.string = pokerUtils.convertValueToString(roundReportResult.ourNewLevel)
        if(roundReportResult.ourNewLevel > roundReportResult.ourOldLevel)
            this.labelOurNewLevel.node.color = CONSTANTS.LABEL_COLOR.GREEN
        else
            this.labelOurNewLevel.node.color = CONSTANTS.LABEL_COLOR.RED
        if(roundReportResult.ourOldLevel == 1 && roundReportResult.ourNewLevel > 1)
            this.labelOurNewLevel.string = '胜利'
        this.labelTheirOldLevel.string = pokerUtils.convertValueToString(roundReportResult.theirOldLevel)
        this.labelTheirNewLevel.string = pokerUtils.convertValueToString(roundReportResult.theirNewLevel)
        if(roundReportResult.theirNewLevel > roundReportResult.theirOldLevel)
            this.labelTheirNewLevel.node.color = CONSTANTS.LABEL_COLOR.GREEN
        else
            this.labelTheirNewLevel.node.color = CONSTANTS.LABEL_COLOR.RED
        if(roundReportResult.theirOldLevel == 1 && roundReportResult.theirNewLevel > 1)
            this.labelTheirNewLevel.string = '胜利'
        // 底牌
        this.lastCards.removeAllChildren()
        let lastCardsCount = roundReportResult.lastCards.length
        for(let i=0; i<lastCardsCount; ++i){
            let btnCard = cc.instantiate(this.prefab_card)
            btnCard.getComponent(BtnCard).setCard(roundReportResult.lastCards[i].getId(), roundReportResult.lastCards[i].getImgPath())
            btnCard.getComponent(BtnCard).setClickEnabled(false)
            this.lastCards.addChild(btnCard)
            btnCard.x = (i-(lastCardsCount-1)/2) * 30
            btnCard.y = 0
        }
    }

});


RoundReportPanel_Huolong.setPrefab = (roundReportPanel_huolong_prefab)=>{
    prefab = roundReportPanel_huolong_prefab
}

RoundReportPanel_Huolong.show = (data, callback)=>{
    let panel = cc.instantiate(prefab)
    panel.getComponent(RoundReportPanel_Huolong).startShow(data, callback)
    return panel
}


export default RoundReportPanel_Huolong
