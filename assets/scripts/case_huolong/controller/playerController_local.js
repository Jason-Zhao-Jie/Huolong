import IPlayerController from './iPlayerController'
import CONSTANTS from '../../config/constants'

export default class PlayerController_Local extends IPlayerController{
    constructor(controller){
        super(controller)
    }

    getType(){
        return CONSTANTS.PLAYERTYPE.LOCAL
    }

    sendSetLastCards(cardsIndexes){
        this.controller.pushEvent(this.seat, CONSTANTS.PLAYERWORK.THROWLASTCARDS, this.getCardsByIndexes(cardsIndexes))
    }

    sendReadyToNextRound(){
        this.controller.pushEvent(this.seat, CONSTANTS.PLAYERWORK.ROUNDREADY)
    }

    onGetACard(cards){
        this.controller.noticeViewGiveCard(cards, this.checkCanShow())
    }

    onOverGetCards(canShow){
        this.controller.view.onOverGetCards(canShow)
    }

    onGetLastCards(cards){
        if(this.controller.getZhuangSeat() == CONSTANTS.PLAYERSEAT.SELF){
            this.controller.noticeViewToGetLastCards(cards)
        }
    }

    onShowThrewLastCards(lastCards, pain, gain, allData){
        this.controller.noticeViewShowLastCards(lastCards, pain, gain, allData)
    }
    
    onAskForThrow(color, num){
        this.controller.noticeViewToThrowCards(color, num)
    }

    onRoundOver(reportData){
    }
}