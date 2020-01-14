import CONSTANTS from '../../config/constants'
import pokerUtils from '../../utils/pokerUtils'
import BtnCard from '../../view/btnCard'
import TipBar from '../../view/tipBar'
import Card from '../../data/card'
import RoundReportPanel_Huolong from '../../view/roundReportPanel_huolong'
import StartScene from '../../view/startScene'
import loader from '../../utils/loader'

const MAX_LINE_CARDS = 28

export default class ViewController_Huolong{
    constructor(view, controller){
        this.controller = controller
        this.view = view
        this.myJokers = 0
    }

    reset() {
        this.view.infoUI.node.active = true
        this.view.cardLayouts.node.active = false
        this.myJokers = 0
        this.controller.resetGame(1,2,3,4)
    }

    getCardsCountOfColor(color){
        return this.controller.getCardsCountOfColor(CONSTANTS.PLAYERSEAT.SELF, color);
    }

    onClickShowJoker () {
        this.controller.pushEvent(CONSTANTS.PLAYERSEAT.SELF, CONSTANTS.PLAYERWORK.SHOWSTAR, this.view.myJokers)
    }

    onClickThrow(selectedIndices){
        if(selectedIndices == null || selectedIndices.length == 0){
            TipBar.show("请选择要打出的牌")
            return true
        }
        let cardLayout = this.controller.modal.getPlayerCardData(CONSTANTS.PLAYERSEAT.SELF)
        let cards = cardLayout.getCardsByIndexes(selectedIndices)
        if(this.view.curNeedThrowCount == 0){
            for(let i=1; i<cards.length; ++i){
                if(cards[i].getColor()!=cards[i-1].getColor() || cards[i].getValue()!=cards[i-1].getValue()){
                    TipBar.show("您是先手, 只能出单牌, 对子, 流星, 或者四条")
                    return true
                }
            }
        }else{
            if(selectedIndices.length != this.view.curNeedThrowCount){
                TipBar.show("出牌数量错误, 请检查!")
                return true
            }
            let colorCardsCount = this.getCardsCountOfColor(this.view.curNeedThrowColor)
            let selectedColorCount = 0
            switch(this.view.curNeedThrowColor){
                case CONSTANTS.CARDCOLOR.MAIN:
                    for(let i=0; i<cards.length; ++i){
                        if(this.controller.modal.checkIsMain(cards[i]))
                            ++selectedColorCount
                    }
                    break
                default:
                    for(let i=0; i<cards.length; ++i){
                        if(cards[i].getColor() == this.view.curNeedThrowColor && !this.controller.modal.checkIsMain(cards[i]))
                            ++selectedColorCount
                    }
            }
            if(colorCardsCount >= cards.length && selectedColorCount < cards.length){
                TipBar.show("您现在必须出与先手方相同花色的牌, 请检查!")
                return true
            }
            if(colorCardsCount < cards.length && selectedColorCount < colorCardsCount){
                TipBar.show("您必须将与先手方相同花色的牌用光, 请检查!")
                return true
            }
        }
        this.controller.pushEvent(CONSTANTS.PLAYERSEAT.SELF, CONSTANTS.PLAYERWORK.THROWCARD, cards)
        return false
    }

    onClickHelp(){
        // TODO
        TipBar.show("提示功能正在开发中")
        return true
    }

    setGameInfo(score, zhuang=null, winnerValue=null, loserValue=null, color=null){
        this.view.info_roundInfo_score.string = score+''
        if(zhuang!=null){
            this.view.info_myPlayerInfo_iconZhuang.node.active = false
            this.view.info_nextPlayerInfo_iconZhuang.node.active = false
            this.view.info_friendPlayerInfo_iconZhuang.node.active = false
            this.view.info_backPlayerInfo_iconZhuang.node.active = false
            switch(zhuang){
                case CONSTANTS.PLAYERSEAT.SELF:
                    this.view.info_myPlayerInfo_iconZhuang.node.active = true
                    break
                case CONSTANTS.PLAYERSEAT.NEXT:
                    this.view.info_nextPlayerInfo_iconZhuang.node.active = true
                    break
                case CONSTANTS.PLAYERSEAT.FRIEND:
                    this.view.info_friendPlayerInfo_iconZhuang.node.active = true
                    break
                case CONSTANTS.PLAYERSEAT.BACK:
                    this.view.info_backPlayerInfo_iconZhuang.node.active = true
            }
        }
        if(winnerValue != null)
            this.view.info_roundInfo_nowValue.string = pokerUtils.convertValueToString(winnerValue)
        if(loserValue != null)
            this.view.info_roundInfo_loserValue.string = pokerUtils.convertValueToString(loserValue)
        if(color!=null){
            let url = 'ui/unknown'
            switch(color){
                case CONSTANTS.CARDCOLOR.SPADES:
                    url = 'ui/s'
                    break
                case CONSTANTS.CARDCOLOR.HEART:
                    url = 'ui/h'
                    break
                case CONSTANTS.CARDCOLOR.CUBE:
                    url = 'ui/c'
                    break
                case CONSTANTS.CARDCOLOR.DIAMOND:
                    url = 'ui/d'
                    break
            }
            loader.loadSpriteFrame(url, (sp)=>{
                this.view.info_roundInfo_nowColor.spriteFrame = sp
            })
        }
    }

    setCanShow(showNum){
        if(showNum > 0){
            this.view.showOKOnlyButton("争庄", this.onClickShowJoker.bind(this))
            this.view.myJokers = showNum
        }else{
            this.view.closeOKCancelButtons()
            this.view.myJokers = 0
        }
    }

    repositionCards(cards){
        // 重排手牌大小顺序
        let count = cards.length
        let newCards = []
        for(let i=0;i<count;++i){
            let cardId = this.controller.modal.getMineCardIdByIndex(i)
            for(let k=0; k<count; ++k){
                if(cardId == cards[k].getComponent(BtnCard).getId())
                    newCards.push(cards[k])
            }
        }
        cards = newCards
        // 调整手牌位置
        let lineCount = Math.floor(count / MAX_LINE_CARDS) + 1
        let lastLineCount = count % MAX_LINE_CARDS
        for(let i=0; i<count; ++i){
            let lineIndex = i % MAX_LINE_CARDS
            let lineNumber = Math.floor(i / MAX_LINE_CARDS) + 1
            let lineCurrCount = (lineCount > lineNumber) ? MAX_LINE_CARDS : lastLineCount
            if(typeof cards[i] == "undefined"){
                cc.log("i="+i+",count="+count+",length="+cards.length)
            }
            cards[i].x = 30 * (lineCurrCount/2-lineIndex)
            cards[i].y = 60 * lineNumber - 50 + (cards[i].getComponent(BtnCard).clicked?25:0)
            cards[i].zIndex = lineCurrCount - lineIndex+10+(lineCount - lineNumber)*MAX_LINE_CARDS
        }
        return cards
    }

    showStar(seat, card, jokerNum){
        this.setGameInfo(0, seat, null, null, card.getColor())
        this.setCanShow(this.controller.getLocalPlayer().checkCanShow())
        let cards = []
        for(let i=0; i<jokerNum; ++i){
            cards.push(new Card(1, CONSTANTS.CARDCOLOR.JOKER, 0))
        }
        cards.push(card)
        this.view.onShowThrownCards(seat, cards)
        if(this.controller.getState() == CONSTANTS.GAMESTATE.GIVINGCARDSOVER){
            this.onOverGetCards(this.controller.getLocalPlayer().checkCanShow())
        }
    }

    onOverGetCards(canShow){
        if(canShow){
            this.view.closeOKCancelButtons()
            this.view.showOKCancelButtons("争庄", "取消", this.onClickShowJoker.bind(this),()=>{
                this.controller.getLocalPlayer().confirmOverGetCards()
            })
        }else{
            this.controller.getLocalPlayer().confirmOverGetCards()
        }
    }

    onGetLastCards(cards){
        // 添加底牌
        this.view.onPainGainCards(null, cards, true)
        // 展示扣底牌按钮
        this.view.showOKCancelButtons("埋底", "重置", ()=>{
            let sels = this.view.getAllSelectedCardsIndex()
            if(sels.length != this.controller.getGroupNum() * 2){
                TipBar.show("埋底数量错误, 请检查")
                return true
            }else{
                this.controller.getLocalPlayer().sendSetLastCards(sels)
            }
        }, ()=>{
            this.view.clearAllCardsClickState()
            return true
        }, "您是庄家, 请埋底")
    }

    onShowLastCards(cards){
        // 展示底牌
        this.view.onShowThrownCards(null, cards)

        // 展示摘星按钮
        let jokers = this.controller.modal.getPlayerCardData(CONSTANTS.PLAYERSEAT.SELF).getJoker1()
        if(jokers.length <= 0 && this.controller.getZhuangSeat() != CONSTANTS.PLAYERSEAT.SELF){
            this.onClickShowLastCardsCancel()
        }else{
            this.view.showOKCancelButtons("摘星", "取消", this.onClickShowLastCardsOK.bind(this), this.onClickShowLastCardsCancel.bind(this), "庄家正在扣底牌, 请问您是否摘星?")
        }
    }

    onClickShowLastCardsOK(){
        let sels = this.view.getAllSelectedCardsIndex()
        if(sels.length <= 0){
            TipBar.show("必须选择要摘星的王牌")
            return true
        }else{
            let bigJokerNum = 0
            let smallJokerNum = 0
            for(let i=0;i<sels.length;++i){
                if(this.view.myCards[sels[i]].getComponent(BtnCard).getValue()== 1){
                    bigJokerNum++
                }else{
                    smallJokerNum++
                }
            }
            if(bigJokerNum <= 0){
                TipBar.show("摘星必须有大王, 不能只用小王摘星")
                return true
            }else{
                this.controller.getLocalPlayer().sendSetLastCards(sels)
            }
        }
    }

    onClickShowLastCardsCancel(){
        this.controller.getLocalPlayer().sendSetLastCards(null)
    }

    operatorPainGain(pain, gain, showGain, showThrew, showNum = false){
        this.setCanShow(showNum)
    }

    onAroundStart(seat){
        this.view.clearAllThrewCards()
    }

    onAroundStepOn(seat, cards){
        if(seat == CONSTANTS.PLAYERSEAT.SELF){
            this.view.onPainGainCards(cards, null, false, cards)
        }else{
            this.view.onShowThrownCards(seat, cards)
        }
    }

    onAroundOver(winSeat, scores, loserScore){
        this.setGameInfo(loserScore)
    }

    cleanBeforeAnotherRound(){
        this.view.cardsMine.node.removeAllChildren()
        this.view.cardsThrown_back.removeAllChildren()
        this.view.cardsThrown_mine.removeAllChildren()
        this.view.cardsThrown_next.removeAllChildren()
        this.view.cardsThrown_friend.removeAllChildren()
        this.view.cardsThrown_lastGet.removeAllChildren()
    }

    onRoundOver(roundReportResult){
        this.setGameInfo(0, roundReportResult.newZhuang, roundReportResult.areWeNewZhuang?roundReportResult.ourNewLevel:roundReportResult.theirNewLevel, roundReportResult.areWeNewZhuang?roundReportResult.theirNewLevel:roundReportResult.ourNewLevel )
        
        let node = RoundReportPanel_Huolong.show(roundReportResult, ()=>{
            this.controller.pushEvent(CONSTANTS.PLAYERSEAT.SELF, CONSTANTS.PLAYERWORK.ROUNDREADY)
            this.view.closeOKCancelButtons()
        })
        this.view.showOKOnlyButton('结算', ()=>{
            node.active = true
            return true
        })
        this.view.node.addChild(node)
    }

    onGameOver(gameReportResult){
        cc.director.loadScene("StartScene", ()=>{
            let canvas = cc.director.getScene().getChildByName('Canvas')
            canvas.getComponent(StartScene).onGameOver(gameReportResult)
        })
    }
}