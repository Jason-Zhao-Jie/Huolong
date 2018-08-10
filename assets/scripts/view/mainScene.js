// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

import CONSTANTS from '../config/constants'
import ProcessController from '../controller/processController'
import Controller_Huolong from '../controller/controller_huolong'
import BtnCard from './btnCard'
import TipBar from './tipBar'
import ViewController_Huolong from './viewController_Huolong'


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
        infoUI: {
            default: null,
            type: cc.Layout,
            serializable: true
        },
        info_roundInfo:{
            default: null,
            type: cc.Layout,
            serializable: true
        },
        info_roundInfo_nowColor:{
            default: null,
            type: cc.Sprite,
            serializable: true
        },
        info_roundInfo_nowValue:{
            default: null,
            type: cc.Label,
            serializable: true
        },
        info_roundInfo_score:{
            default: null,
            type: cc.Label,
            serializable: true
        },
        info_roundInfo_loserValue:{
            default: null,
            type: cc.Label,
            serializable: true
        },
        info_myPlayerInfo:{
            default: null,
            type: cc.Layout,
            serializable: true
        },
        info_myPlayerInfo_iconZhuang:{
            default: null,
            type: cc.Sprite,
            serializable: true
        },
        info_nextPlayerInfo:{
            default: null,
            type: cc.Layout,
            serializable: true
        },
        info_nextPlayerInfo_iconZhuang:{
            default: null,
            type: cc.Sprite,
            serializable: true
        },
        info_friendPlayerInfo:{
            default: null,
            type: cc.Layout,
            serializable: true
        },
        info_friendPlayerInfo_iconZhuang:{
            default: null,
            type: cc.Sprite,
            serializable: true
        },
        info_backPlayerInfo:{
            default: null,
            type: cc.Layout,
            serializable: true
        },
        info_backPlayerInfo_iconZhuang:{
            default: null,
            type: cc.Sprite,
            serializable: true
        },
        cardLayouts:{
            default: null,
            type: cc.Layout,
            serializable: true
        },
        cardsMine:{
            default: null,
            type: cc.Layout,
            serializable: true
        },
        btnOKOnly:{
            default: null,
            type: cc.Button,
            serializable: true
        },
        btnOK:{
            default: null,
            type: cc.Button,
            serializable: true
        },
        btnCancel:{
            default: null,
            type: cc.Button,
            serializable: true
        },
        labelOKOnly:{
            default: null,
            type: cc.Label,
            serializable: true
        },
        labelOK:{
            default: null,
            type: cc.Label,
            serializable: true
        },
        labelCancel:{
            default: null,
            type: cc.Label,
            serializable: true
        },
        labelTips:{
            default: null,
            type: cc.Label,
            serializable: true
        },
        cardsThrown:{
            default: null,
            type: cc.Layout,
            serializable: true
        },
        cardsThrown_back:{
            default: null,
            type: cc.Node,
            serializable: true
        },
        cardsThrown_mine:{
            default: null,
            type: cc.Node,
            serializable: true
        },
        cardsThrown_next:{
            default: null,
            type: cc.Node,
            serializable: true
        },
        cardsThrown_friend:{
            default: null,
            type: cc.Node,
            serializable: true
        },
        cardsThrown_lastGet:{
            default: null,
            type: cc.Node,
            serializable: true
        },

        panelRoundReportHuolong: {
            default: null,
            type: cc.Layout,
            serializable: true
        },

        roundReportHuolong_labelWinLose: {
            default: null,
            type: cc.Label,
            serializable: true
        },

        roundReportHuolong_labelWinnerGetLast: {
            default: null,
            type: cc.Label,
            serializable: true
        },

        roundReportHuolong_labelLoserScore: {
            default: null,
            type: cc.Label,
            serializable: true
        },

        roundReportHuolong_labelOurOldLevel: {
            default: null,
            type: cc.Label,
            serializable: true
        },

        roundReportHuolong_labelOurNewLevel: {
            default: null,
            type: cc.Label,
            serializable: true
        },

        roundReportHuolong_labelTheirOldLevel: {
            default: null,
            type: cc.Label,
            serializable: true
        },

        roundReportHuolong_labelTheirNewLevel: {
            default: null,
            type: cc.Label,
            serializable: true
        },

        roundReportHuolong_lastCards: {
            default: null,
            type: cc.Node,
            serializable: true
        },

        roundReportHuolong_btnContinue: {
            default: null,
            type: cc.Button,
            serializable: true
        },

        controller:{
            default: null,
            type: ProcessController
        },

        myCards:{
            default: null
        },

        curNeedThrowColor:{
            default: null
        },

        curNeedThrowCount:{
            default: 0
        },

        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.controller = new Controller_Huolong(this)
        this.viewController = new ViewController_Huolong(this, this.controller)

        this.startMenu_btnSimpleStart.node.on(cc.Node.EventType.TOUCH_END, this.onClickSimpleStart.bind(this))
        this.startMenu_btnCreateRoom.node.on(cc.Node.EventType.TOUCH_END, this.onClickCreateRoom.bind(this))
        this.startMenu_btnJoinRoom.node.on(cc.Node.EventType.TOUCH_END, this.onClickJoinRoom.bind(this))
        this.startMenu_btnHistory.node.on(cc.Node.EventType.TOUCH_END, this.onClickHistory.bind(this))
        this.startMenu_btnSetting.node.on(cc.Node.EventType.TOUCH_END, this.onClickSetting.bind(this))
        this.roundReportHuolong_btnContinue.node.on(cc.Node.EventType.TOUCH_END, this.onClickRoundContinue.bind(this))
        this.btnOKOnly.node.on(cc.Node.EventType.TOUCH_END, this.onBtnOK.bind(this))
        this.btnOK.node.on(cc.Node.EventType.TOUCH_END, this.onBtnOK.bind(this))
        this.btnCancel.node.on(cc.Node.EventType.TOUCH_END, this.onBtnCancel.bind(this))
    },

    start () {
        this.resetToStart()
    },

    update (dt) {
    },

    onClickSimpleStart () {
        this.startMenu.node.active = false
        this.viewController.reset()
    },

    onClickCreateRoom () {

    },

    onClickJoinRoom () {

    },

    onClickHistory () {

    },

    onClickSetting () {

    },

    // 确定按钮回调
    onBtnOK(){
        let retVal = false
        if(this.eventBtnOK != null)
            retVal = this.eventBtnOK()
        if(!retVal)
            this.closeOKCancelButtons()
    },

    // 取消按钮回调
    onBtnCancel(){
        let retVal = false
        if(this.eventBtnOK != null)
            retVal = this.eventBtnCancel()
        if(!retVal)
            this.closeOKCancelButtons()
    },

    // 隐藏确定取消按钮
    closeOKCancelButtons(){
        this.btnOK.node.active = false
        this.btnOKOnly.node.active = false
        this.btnCancel.node.active = false
        this.labelTips.node.active = false
    },

    // 展示确定取消按钮
    showOKCancelButtons(okLabel = "确定", cancelLabel = "取消", okCallback = null, cancelCallback = null, tip = ""){
        this.btnOK.node.active = true
        this.btnCancel.node.active = true
        this.labelTips.node.active = true
        this.labelOK.string = okLabel
        this.labelCancel.string = cancelLabel
        this.eventBtnOK = okCallback
        this.eventBtnCancel = cancelCallback
        this.labelTips.string = tip
    },

    // 展示单独的一个按钮
    showOKOnlyButton(label = "好的", callback = null, tip = ""){
        this.btnOKOnly.node.active = true
        this.labelOKOnly.string = label
        this.eventBtnOK = callback
        this.labelTips.string = tip
    },

    // 展示提示文
    showTips(content){
        let tipBar = cc.instantiate(this.prefab_tips)
        tipBar.getComponent(TipBar).setContent(content)
        this.node.addChild(tipBar)
    },

    onClickRoundContinue(){
        this.panelRoundReportHuolong.node.active = false
        this.viewController.onRoundContinue()
    },

    // 回到开始菜单
    resetToStart () {
        this.startMenu.node.active = true
        this.infoUI.node.active = false
        this.info_myPlayerInfo_iconZhuang.node.active = false
        this.info_nextPlayerInfo_iconZhuang.node.active = false
        this.info_friendPlayerInfo_iconZhuang.node.active = false
        this.info_backPlayerInfo_iconZhuang.node.active = false
        this.cardLayouts.node.active = false
        this.panelRoundReportHuolong.node.active = false
    },

    cleanBeforeAnotherRound(){
        this.viewController.cleanBeforeAnotherRound()
    },

    // 准备开始发牌, 清空所有牌区域, 隐藏所有按钮
    startGiveCards(){
        this.cardLayouts.node.active = true
        this.btnOKOnly.node.active = false
        this.btnOK.node.active = false
        this.btnCancel.node.active = false
        this.labelTips.node.active = false
        this.cardsMine.node.removeAllChildren(true)
        this.myCards = []
    },

    // 给手牌排序
    repositionCards(){
        this.myCards = this.viewController.repositionCards(this.myCards)
    },

    // 重置所有手牌的点击状态
    clearAllCardsClickState(){
        let count = this.myCards.length
        for(let i=0; i<count; ++i){
            if(this.myCards[i].getComponent(BtnCard).clicked)
                this.myCards[i].getComponent(BtnCard).onClick()
        }
    },

    clearAllThrewCards(){
        this.cardsThrown_back.removeAllChildren()
        this.cardsThrown_mine.removeAllChildren()
        this.cardsThrown_next.removeAllChildren()
        this.cardsThrown_friend.removeAllChildren()
        this.cardsThrown_lastGet.removeAllChildren()
    },

    // 获取所有选定手牌的索引
    getAllSelectedCardsIndex(){
        let ret = []
        let count = this.myCards.length
        for(let i=0; i<count; ++i){
            if(this.myCards[i].getComponent(BtnCard).clicked)
                ret.push(i)
        }
        return ret
    },

    // 发牌结束处理
    onOverGetCards(canShow){
        this.viewController.onOverGetCards(canShow)
    },

    // 展示打出的牌
    onShowThrownCards(seat, cardsData){
        let seatLayout = this.cardsThrown_mine
        switch(seat){
            case CONSTANTS.PLAYERSEAT.BACK:
                seatLayout = this.cardsThrown_back
                break
            case CONSTANTS.PLAYERSEAT.SELF:
                seatLayout = this.cardsThrown_mine
                break
            case CONSTANTS.PLAYERSEAT.NEXT:
                seatLayout = this.cardsThrown_next
                break
            case CONSTANTS.PLAYERSEAT.FRIEND:
                seatLayout = this.cardsThrown_friend
                break
            default:
                seatLayout = this.cardsThrown_lastGet
        }
        seatLayout.removeAllChildren(true)
        let length = cardsData.length
        for(let i=0; i<length; ++i){
            let btnCard = cc.instantiate(this.prefab_card)
            btnCard.getComponent(BtnCard).setCard(cardsData[i].getId(), cardsData[i].getImgPath())
            btnCard.getComponent(BtnCard).setController(this.controller)
            btnCard.getComponent(BtnCard).setClickEnabled(false)
            seatLayout.addChild(btnCard)
            btnCard.x = (i-(length-1)/2) * 30
            btnCard.y = 0
        }
    },

    // 处理手牌的获取和打出
    onPainGainCards(pain, gain, showGain = false, showThrew = null, controllerArg = null){
        if(pain !=null){
            for(let i=0; i<pain.length; ++i){
                for(let k_my=0; k_my<this.myCards.length; ++k_my){
                    if(this.myCards[k_my].getComponent(BtnCard).getId() == pain[i].getId()){
                        this.myCards[k_my].removeFromParent()
                        this.myCards.splice(k_my, 1)
                        break
                    }
                    if(k_my==this.myCards.length-1)
                        cc.log("找不到要删除的手牌:"+this.myCards[k_my].getComponent(BtnCard).getId())
                }
            }
        }
        if(gain !=null){
            for(let i=0; i<gain.length; ++i){
                let newCard = cc.instantiate(this.prefab_card)
                newCard.getComponent(BtnCard).setCard(gain[i].getId(), gain[i].getImgPath())
                newCard.getComponent(BtnCard).setController(this.controller)
                newCard.getComponent(BtnCard).setClickEnabled(true)
                newCard.getComponent(BtnCard).clicked = showGain
                this.cardsMine.node.addChild(newCard)
                this.myCards.push(newCard)
            }
        }
        if(showThrew!=null)
            this.onShowThrownCards(CONSTANTS.PLAYERSEAT.SELF, showThrew)
        this.repositionCards()
        this.viewController.operatorPainGain(pain, gain, showGain, showThrew, controllerArg)
    },

    pleaseThrow(color, num){
        this.curNeedThrowColor = color
        this.curNeedThrowCount = num
        this.showOKCancelButtons("出牌", "提示", this.onClickThrow.bind(this), this.onClickHelp.bind(this), "轮到您出牌")
    },

    // 点击出牌按钮的回调
    onClickThrow(){
        let sels = this.getAllSelectedCardsIndex()
        return this.viewController.onClickThrow(sels)
    },

    onClickHelp(){
        return this.viewController.onClickHelp(sels)
    },

});
