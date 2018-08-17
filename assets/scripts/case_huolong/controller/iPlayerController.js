import CONSTANTS from '../../config/constants'
import Scheduler from '../../utils/scheduler'
import globalConfig from '../../config/globalConfig'

export default class IPlayerController{
    constructor(controller){
        this.controller = controller
        this.scheduler = new Scheduler()
        this.messageQueue = []
        this.seat = null
        this.scheduler.run(this.update.bind(this))
    }

    setSeat(seat){
        this.seat = seat
    }

    getType(){
        return CONSTANTS.PLAYERTYPE.DEFALUT
    }

    getCardLayoutData(){
        return this.controller.modal.getPlayerCardData(this.seat)
    }

    getCardsByIndexes(cardsIndexes){
        return this.getCardLayoutData().getCardsByIndexes(cardsIndexes)
    }

    pushEvent(event, data){
        this.messageQueue.push({event:event, data:data});
    }

    update(dt){
        if(this.messageQueue.length > 0){
            let msg = this.messageQueue[0]
            this.messageQueue.splice(0,1)
            switch(msg.event){
                case CONSTANTS.PLAYEREVENT.STARTGAME:
                    this.onGameStart()
                    break
                case CONSTANTS.PLAYEREVENT.GIVEACARD:
                    this.onGetACard(msg.data)
                    break
                case CONSTANTS.PLAYEREVENT.OVERGIVENCARDS:
                    this.onOverGetCards(this.checkCanShow())
                    break
                case CONSTANTS.PLAYEREVENT.GETLASTCARDS:
                    this.onGetLastCards(msg.data)
                    break
                case CONSTANTS.PLAYEREVENT.PLAYERTHREWLASTCARDS:
                    this.onShowThrewLastCards(msg.data.lastCards, msg.data.pain, msg.data.gain, msg.data.allData)
                    break
                case CONSTANTS.PLAYEREVENT.ASKFORTHROW:
                    this.onAskForThrow(msg.data.color, msg.data.num)
                    break
                case CONSTANTS.PLAYEREVENT.PLAYERTHREWCARD:
                    this.onPlayerThrewCard(msg.data.seat, msg.data.cards)
                    break
                case CONSTANTS.PLAYEREVENT.ROUNDREPORT:
                    this.onRoundOver(msg.data)
                    break
            }
        }
    }

    checkCanShow(){
        let showNeedNum = this.controller.modal.getShowCardNum(this.controller.getState())
        let myNum = this.controller.modal.getPlayerCardData(this.seat).getJoker1().length
        if(showNeedNum == 0)
            return 0
        if(showNeedNum <= myNum)
            return myNum
        return 0
    }

    confirmOverGetCards(canShow){
        this.controller.pushEvent(this.seat, CONSTANTS.PLAYERWORK.CARDSGET)
    }

    onGameStart(){
        this.controller.pushEvent(this.seat, CONSTANTS.PLAYERWORK.ROUNDREADY)
    }

    onGetACard(cards){
        let shows = this.checkCanShow()
        if(shows > 0){
            this.controller.pushEvent(this.seat, CONSTANTS.PLAYERWORK.SHOWSTAR, shows)
        }
    }

    onOverGetCards(canShow){
        this.confirmOverGetCards(canShow)
    }

    onGetLastCards(cards){
        if(this.controller.getZhuangSeat() == this.seat)
            this.controller.pushEvent(this.seat, CONSTANTS.PLAYERWORK.THROWLASTCARDS, cards)
        else
            this.controller.pushEvent(this.seat, CONSTANTS.PLAYERWORK.THROWLASTCARDS, null)
    }

    onShowThrewLastCards(lastCards, pain, gain, allData){

    }

    onAskForThrow(color, num){
        let cardLayout = this.getCardLayoutData()
        let [cards, otherCards] = cardLayout.getCardsOfColor(color)
        if(num == 0)
            num = 1
        let threwCards = []
        for(let i=0; i<num; ++i){
            if(i >= cards.length)
                threwCards.push(otherCards[i - cards.length])
            else
                threwCards.push(cards[i])
        }
        Scheduler.callAfterDelay(()=>{
            this.controller.pushEvent(this.seat, CONSTANTS.PLAYERWORK.THROWCARD, threwCards)
        }, globalConfig.gameSettings.huolong.aroundAIDelay)
    }

    onPlayerThrewCard(seat, cards){

    }

    onRoundOver(reportData){
        this.controller.pushEvent(this.seat, CONSTANTS.PLAYERWORK.ROUNDREADY)
    }
}