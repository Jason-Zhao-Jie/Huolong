import CONSTANTS from '../config/constants'
import loader from '../utils/loader'
import HallController from '../controller/hallController'
import BattleController from '../controller/battleController'
import Controller_Huolong from '../case_huolong/controller/controller_huolong'
import BtnCard from './btnCard'
import TipBar from './tipBar'
import ViewController_Huolong from '../case_huolong/view/viewController_Huolong'


let MainScene = cc.Class({
    extends: cc.Canvas,
    
    editor: CC_EDITOR && {
        executeInEditMode: true
    },

    properties: {
        prefab_card:{
            default:null,
            type:cc.Prefab
        },
        audio_bgm:{
            default:null,
            type: cc.AudioClip,
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
        info_myPlayerInfo_head:{
            default: null,
            type: cc.Sprite,
            serializable: true
        },
        info_myPlayerInfo_labelName:{
            default: null,
            type: cc.Label,
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
        info_sharedCanvasRenderer:{
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

        controller:{
            default: null,
            type: BattleController
        },

        bgmId:{
            default: 0,
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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if(!CC_EDITOR){

            // Bind callbacks
            this.btnOKOnly.node.on(cc.Node.EventType.TOUCH_END, this.onBtnOK.bind(this))
            this.btnOK.node.on(cc.Node.EventType.TOUCH_END, this.onBtnOK.bind(this))
            this.btnCancel.node.on(cc.Node.EventType.TOUCH_END, this.onBtnCancel.bind(this))

            // 播放背景音乐, 因包体积过大, 暂时去掉背景音乐, 预计将来从服务器获取背景音乐
            // this.bgmId = cc.audioEngine.play(this.audio_bgm, true, globalConfig.gameSettings.musicVolumn)
            
            this.resetUI()
        }
    },

    start () {
        if(!CC_EDITOR){
            let nickName = HallController.getInstance().serviceBus.getUserNickName()
            let avatarUrl = HallController.getInstance().serviceBus.getUserAvatarUrl()
            if(nickName != null && avatarUrl != null){
                this.showUserInfo(CONSTANTS.PLAYERSEAT.SELF, nickName, avatarUrl)
            } else {
                this.hideUserInfo(CONSTANTS.PLAYERSEAT.SELF)
            }
        }
    },

    update (dt) {
        this.renderWechatSharedCanvas()
    },

    startGame(gameType, playerType, playerData){
        switch(gameType){
            case CONSTANTS.GAMETYPE.HUOLONG:
                this.controller = new Controller_Huolong(this)
                this.viewController = new ViewController_Huolong(this, this.controller)
                break
            case CONSTANTS.GAMETYPE.CHUDADI:
            case CONSTANTS.GAMETYPE.DOUDIZHU:
            case CONSTANTS.GAMETYPE.ZHUOHONGSAN:
            default:
                break
        }

        this.controller.enterTable(playerType)
        this.viewController.reset()
    },

    renderWechatSharedCanvas(){
        let tex = HallController.getInstance().getWechatSharedCanvasRenderedTexture()
        if(tex != null){
            this.info_sharedCanvasRenderer.spriteFrame = new cc.SpriteFrame(tex);
        }
    },

    showUserInfo(seat, nickName, headUrl){
        loader.loadImgTextureFromUrl(headUrl, (texture)=>{
            switch(seat){
                case CONSTANTS.PLAYERSEAT.SELF:
                    this.info_myPlayerInfo.node.active = true
                    this.info_myPlayerInfo_head.spriteFrame = new cc.SpriteFrame(texture)
                    this.info_myPlayerInfo_labelName.string = nickName
                    break
                case CONSTANTS.PLAYERSEAT.NEXT:
                    this.info_nextPlayerInfo.node.active = true
                    break
                case CONSTANTS.PLAYERSEAT.FRIEND:
                    this.info_friendPlayerInfo.node.active = true
                    break
                case CONSTANTS.PLAYERSEAT.BACK:
                    this.info_backPlayerInfo.node.active = true
                    break
            }
        })
    },

    hideUserInfo(seat){
        switch(seat){
            case CONSTANTS.PLAYERSEAT.SELF:
                this.info_myPlayerInfo.node.active = false
                break
            case CONSTANTS.PLAYERSEAT.NEXT:
                this.info_nextPlayerInfo.node.active = false
                break
            case CONSTANTS.PLAYERSEAT.FRIEND:
                this.info_friendPlayerInfo.node.active = false
                break
            case CONSTANTS.PLAYERSEAT.BACK:
                this.info_backPlayerInfo.node.active = false
                break
        }

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

    // 回到开始菜单
    resetUI () {
        this.infoUI.node.active = false
        this.info_myPlayerInfo_iconZhuang.node.active = false
        this.info_nextPlayerInfo_iconZhuang.node.active = false
        this.info_friendPlayerInfo_iconZhuang.node.active = false
        this.info_backPlayerInfo_iconZhuang.node.active = false
        this.cardLayouts.node.active = false
        this.clearAllThrewCards()
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
        return this.viewController.onClickHelp()
    },

});

export default MainScene
