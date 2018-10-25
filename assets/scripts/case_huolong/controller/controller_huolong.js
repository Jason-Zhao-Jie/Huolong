import CONSTANTS from '../../config/constants'
import globalConfig from '../../config/globalConfig'
import BattleController from '../../controller/battleController'
import Card from '../../data/card'
import Scheduler from '../../utils/scheduler'

export default class Controller_Huolong extends BattleController {
    constructor(mainscene){
        super(mainscene, CONSTANTS.GAMETYPE.HUOLONG)
        this.willShowSeat = null
    }

    getCardsCountOfColor(seat, color){
        return this.modal.getPlayerCardData(seat).getCardsCountOfColor(color)
    }

    resetGame(idMine, idNext, idFriend, idBack){
        this.modal.resetGameData(idMine, idNext, idFriend, idBack, globalConfig.gameSettings.huolong.groupNum)
        this.view.viewController.setGameInfo(0, null,
                                        this.modal.getCurValue(),
                                        this.modal.getLoserValue(),
                                        this.modal.getMainColor()   )
        this.noticePlayersToReset()
    }

    cleanBeforeAnotherRound(){
        this.modal.toNextRound()
        super.cleanBeforeAnotherRound()
    }

    givingCards(cards){
        if(this.willShowSeat != null && this.willShowSeat == this.currentCardSeat){
            this.onResolvePlayerShowStar(cards[0])
        }
        super.givingCards(cards)
    }

    onResolvePlayerShowStar(card){
        if(card.getColor() != CONSTANTS.CARDCOLOR.JOKER){
            this.modal.setMainColor(card.getColor())
            let data = {
                seat: this.willShowSeat,
                card: card,
            }
            this.nextPlayer.pushEvent(CONSTANTS.PLAYEREVENT.PLAYERSHOWEDSTAR, data)
            this.friendPlayer.pushEvent(CONSTANTS.PLAYEREVENT.PLAYERSHOWEDSTAR, data)
            this.backPlayer.pushEvent(CONSTANTS.PLAYEREVENT.PLAYERSHOWEDSTAR, data)
            this.localPlayer.pushEvent(CONSTANTS.PLAYEREVENT.PLAYERSHOWEDSTAR, data)
            this.view.viewController.showStar(this.willShowSeat, card, this.modal.roundData.currentShowedCardNum)
            this.willShowSeat = null
        }
    }

    overGetCards(){
        this.state = CONSTANTS.GAMESTATE.GIVINGLASTCARDS
        // TODO : 若发完牌仍无人亮王, 需要处理
        
        let lastCards = this.modal.giveLastCardsToZhuangPlayer()
        this.view.viewController.onShowLastCards(lastCards)
        this.roundReadyList[CONSTANTS.PLAYERSEAT.SELF] = false
        this.roundReadyList[CONSTANTS.PLAYERSEAT.NEXT] = false
        this.roundReadyList[CONSTANTS.PLAYERSEAT.FRIEND] = false
        this.roundReadyList[CONSTANTS.PLAYERSEAT.BACK] = false
        this.nextPlayer.pushEvent(CONSTANTS.PLAYEREVENT.GETLASTCARDS, lastCards)
        this.friendPlayer.pushEvent(CONSTANTS.PLAYEREVENT.GETLASTCARDS, lastCards)
        this.backPlayer.pushEvent(CONSTANTS.PLAYEREVENT.GETLASTCARDS, lastCards)
        this.localPlayer.pushEvent(CONSTANTS.PLAYEREVENT.GETLASTCARDS, lastCards)
    }

    noticeViewToGetLastCards(cards){
        if(this.getZhuangSeat() == CONSTANTS.PLAYERSEAT.SELF){
            this.view.viewController.onGetLastCards(cards)
        }
    }

    noticeViewShowLastCards(lastCards, pain, gain, all){
        this.view.onPainGainCards(pain, gain, true, pain)
        if(all != null){
            this.view.onShowThrownCards(CONSTANTS.PLAYERSEAT.BACK, all[CONSTANTS.PLAYERSEAT.BACK].pain)
            this.view.onShowThrownCards(CONSTANTS.PLAYERSEAT.FRIEND, all[CONSTANTS.PLAYERSEAT.FRIEND].pain)
            this.view.onShowThrownCards(CONSTANTS.PLAYERSEAT.NEXT, all[CONSTANTS.PLAYERSEAT.NEXT].pain)
            this.view.onShowThrownCards(null, lastCards)
        }else if(CONSTANTS.PLAYERSEAT.SELF != this.getZhuangSeat()){
            this.view.onShowThrownCards(this.getZhuangSeat(), lastCards)
        }
    }

    showThrewLastCards(){
        let lastCardData = this.modal.resolveLastCards()
        let unknownLast = (lastCardData.starsNum > 0) ? lastCardData.final : [new Card(0),new Card(0),new Card(0),new Card(0),new Card(0),new Card(0)]
        let unknownAll = (lastCardData.starsNum > 0) ? lastCardData : null
        this.nextPlayer.pushEvent(CONSTANTS.PLAYEREVENT.PLAYERTHREWLASTCARDS, 
            (this.getZhuangSeat() == CONSTANTS.PLAYERSEAT.NEXT)?
                {   lastCards:lastCardData.final,
                    pain:lastCardData[CONSTANTS.PLAYERSEAT.NEXT].pain,
                    gain:lastCardData[CONSTANTS.PLAYERSEAT.NEXT].gain,
                    allData:unknownAll}  :
                {   lastCards:unknownLast,
                    pain:lastCardData[CONSTANTS.PLAYERSEAT.NEXT].pain,
                    gain:lastCardData[CONSTANTS.PLAYERSEAT.NEXT].gain,
                    allData:unknownAll})
        this.friendPlayer.pushEvent(CONSTANTS.PLAYEREVENT.PLAYERTHREWLASTCARDS,  
            (this.getZhuangSeat() == CONSTANTS.PLAYERSEAT.FRIEND)?
                {   lastCards:lastCardData.final,
                    pain:lastCardData[CONSTANTS.PLAYERSEAT.FRIEND].pain,
                    gain:lastCardData[CONSTANTS.PLAYERSEAT.FRIEND].gain,
                    allData:unknownAll}  :
                {   lastCards:unknownLast,
                    pain:lastCardData[CONSTANTS.PLAYERSEAT.FRIEND].pain,
                    gain:lastCardData[CONSTANTS.PLAYERSEAT.FRIEND].gain,
                    allData:unknownAll})
        this.backPlayer.pushEvent(CONSTANTS.PLAYEREVENT.PLAYERTHREWLASTCARDS,  
            (this.getZhuangSeat() == CONSTANTS.PLAYERSEAT.BACK)?
                {   lastCards:lastCardData.final,
                    pain:lastCardData[CONSTANTS.PLAYERSEAT.BACK].pain,
                    gain:lastCardData[CONSTANTS.PLAYERSEAT.BACK].gain,
                    allData:unknownAll}  :
                {   lastCards:unknownLast,
                    pain:lastCardData[CONSTANTS.PLAYERSEAT.BACK].pain,
                    gain:lastCardData[CONSTANTS.PLAYERSEAT.BACK].gain,
                    allData:unknownAll})
        this.localPlayer.pushEvent(CONSTANTS.PLAYEREVENT.PLAYERTHREWLASTCARDS,  
            (this.getZhuangSeat() == CONSTANTS.PLAYERSEAT.SELF)?
                {   lastCards:lastCardData.final,
                    pain:lastCardData[CONSTANTS.PLAYERSEAT.SELF].pain,
                    gain:lastCardData[CONSTANTS.PLAYERSEAT.SELF].gain,
                    allData:unknownAll}  :
                {   lastCards:unknownLast,
                    pain:lastCardData[CONSTANTS.PLAYERSEAT.SELF].pain,
                    gain:lastCardData[CONSTANTS.PLAYERSEAT.SELF].gain,
                    allData:unknownAll})
        this.startRunRound()
    }

    startRunRound(){
        super.startRunRound()

        // 请庄家先出牌, 此后由上一轮胜者出牌
        this.aroundStart(this.getZhuangSeat())
    }

    aroundStart(seat){
        this.modal.setAroundStart(seat)
        this.getPlayerBySeat(seat).pushEvent(CONSTANTS.PLAYEREVENT.ASKFORTHROW, {color:CONSTANTS.CARDCOLOR.ANY, num:0})
        this.view.viewController.onAroundStart(seat)
    }

    aroundStepOn(cards){
        let firstColor = this.modal.roundData.currentShowedCardColor
        let firstNum = this.modal.roundData.currentShowedCardNum
        if(this.modal.roundData.currentFirstThrowPlayer == this.modal.roundData.currentNeedThrowPlayer){
            firstColor = this.modal.setFirstColorNum(cards)
            firstNum = this.modal.roundData.currentShowedCardNum
        }
        let now = this.modal.roundData.currentNeedThrowPlayer
        let next = this.modal.setAroundStepOn(cards)
        this.view.viewController.onAroundStepOn(now, cards)
        this.nextPlayer.pushEvent(CONSTANTS.PLAYEREVENT.PLAYERTHREWCARD, {seat:now, cards:cards})
        this.friendPlayer.pushEvent(CONSTANTS.PLAYEREVENT.PLAYERTHREWCARD, {seat:now, cards:cards})
        this.backPlayer.pushEvent(CONSTANTS.PLAYEREVENT.PLAYERTHREWCARD, {seat:now, cards:cards})
        this.localPlayer.pushEvent(CONSTANTS.PLAYEREVENT.PLAYERTHREWCARD, {seat:now, cards:cards})
        if(null == next)
            this.aroundOver()
        else
            this.getPlayerBySeat(next).pushEvent(CONSTANTS.PLAYEREVENT.ASKFORTHROW, {color:firstColor, num:firstNum})
    }

    aroundOver(){
        let [largerSeat, largerCards] = this.modal.setAroundOver()
        let loserScore = this.modal.getLoserScore()
        this.view.viewController.onAroundOver(largerSeat, this.modal.roundData.getScores, loserScore)
        Scheduler.callAfterDelay(()=>{
            if(this.modal.getIsRoundOver())
                this.overGameRound(largerSeat, largerCards)
            else
                this.aroundStart(largerSeat)
        }, globalConfig.gameSettings.huolong.aroundOverDelay)
    }

    overGameRound(lastWinner, lastWinCards){
        // 计算结算
        let roundReportResult = this.modal.calculateRoundReport(lastWinner, lastWinCards)
        this.view.viewController.onRoundOver(roundReportResult)
        if(roundReportResult.gameover){
            this.state = CONSTANTS.GAMESTATE.OVERIDLE
        }else{
            this.state = CONSTANTS.GAMESTATE.REPORT
        }
        this.roundReadyList[CONSTANTS.PLAYERSEAT.SELF] = false
        this.roundReadyList[CONSTANTS.PLAYERSEAT.NEXT] = false
        this.roundReadyList[CONSTANTS.PLAYERSEAT.FRIEND] = false
        this.roundReadyList[CONSTANTS.PLAYERSEAT.BACK] = false
        this.nextPlayer.pushEvent(CONSTANTS.PLAYEREVENT.ROUNDREPORT, roundReportResult)
        this.friendPlayer.pushEvent(CONSTANTS.PLAYEREVENT.ROUNDREPORT, roundReportResult)
        this.backPlayer.pushEvent(CONSTANTS.PLAYEREVENT.ROUNDREPORT, roundReportResult)
        this.localPlayer.pushEvent(CONSTANTS.PLAYEREVENT.ROUNDREPORT, roundReportResult)
    }

    onGameOver(){
        super.onGameOver()
        let gameReportResult = this.modal.calculateGameReport()
        this.view.viewController.onGameOver(gameReportResult)
        this.state = CONSTANTS.GAMESTATE.START
        this.roundReadyList[CONSTANTS.PLAYERSEAT.SELF] = false
        this.roundReadyList[CONSTANTS.PLAYERSEAT.NEXT] = false
        this.roundReadyList[CONSTANTS.PLAYERSEAT.FRIEND] = false
        this.roundReadyList[CONSTANTS.PLAYERSEAT.BACK] = false
        this.nextPlayer.pushEvent(CONSTANTS.PLAYEREVENT.GAMEREPORT, gameReportResult)
        this.friendPlayer.pushEvent(CONSTANTS.PLAYEREVENT.GAMEREPORT, gameReportResult)
        this.backPlayer.pushEvent(CONSTANTS.PLAYEREVENT.GAMEREPORT, gameReportResult)
        this.localPlayer.pushEvent(CONSTANTS.PLAYEREVENT.GAMEREPORT, gameReportResult)
    }
    
    update(dt){
        let msg = super.update(dt)
        if(msg != null){
            switch(msg.event){
                case CONSTANTS.PLAYERWORK.SHOWSTAR:
                    this.onPlayerShowStar(msg.playerSeat, msg.data)
                    break
                case CONSTANTS.PLAYERWORK.THROWLASTCARDS:
                    this.onPlayerThrowLastCards(msg.playerSeat, msg.data)
                    break
            }
        }
        return msg
    }

    onPlayerShowStar(playerSeat, playerShowedNum){
        if(!this.modal.setMainColorByShowedJoker(playerSeat, playerShowedNum))
            return
        this.willShowSeat = playerSeat
        if(this.state == CONSTANTS.GAMESTATE.OVERGIVENCARDS){
            this.onResolvePlayerShowStar(this.modal.getFirstCardDataInStack())
        }
    }

    onPlayerThrowLastCards(playerSeat, threwCards){
        this.roundReadyList[playerSeat] = true
        this.modal.throwLastCards(playerSeat, threwCards)
        // 所有玩家已就绪
        if(this.roundReadyList[CONSTANTS.PLAYERSEAT.SELF]&&
            this.roundReadyList[CONSTANTS.PLAYERSEAT.NEXT]&&
            this.roundReadyList[CONSTANTS.PLAYERSEAT.FRIEND]&&
            this.roundReadyList[CONSTANTS.PLAYERSEAT.BACK])
            this.showThrewLastCards()
    }
    
    onThrowCards(playerSeat, cards){
        if(this.modal.roundData.currentNeedThrowPlayer == playerSeat){
            cc.log("出牌轮次:"+this.modal.getRoundIndex()+", 出牌者:"+playerSeat.toString()+", 出牌内容:")
            for(let i=0; i<cards.length; ++i){
                if(!cards[i])
                    cc.error("出牌数据错误: 第"+i+"张牌是空牌")
                else
                    cc.log("    颜色:"+cards[i].getColor().toString()+", 值:"+cards[i].getValue()+", 牌组:"+cards[i].getGroup())
            }
            this.aroundStepOn(cards)
        }else{
            cc.log("出牌次序发生错误, 应出牌者:"+this.modal.roundData.currentNeedThrowPlayer.toString()+", 实出牌者:"+playerSeat.toString())
        }
    }
}