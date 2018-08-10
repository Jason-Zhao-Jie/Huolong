import CardManager from './card/cardManager'
import CardLayoutData from './card/cardLayoutData'
import CONSTANTS from '../config/constants'

class ModalBase{
    constructor(){
        this.cardManager = new CardManager()
        this.myCardLayout = new CardLayoutData(this)
        this.nextCardLayout = new CardLayoutData(this)
        this.friendCardLayout = new CardLayoutData(this)
        this.backCardLayout = new CardLayoutData(this)
    }

    resetGameData(idMine, idNext, idFriend, idBack, groupNum = 1){
        this.groupNum = groupNum
        this.resetRoundData()
    }

    resetRoundData(){
        this.cardManager.randomAllCards(this.groupNum)
    }

    getGroupNum(){
        return this.groupNum
    }

    getMineCardIdByIndex(index){
        return this.myCardLayout.getCardIdByIndex(index)
    }

    getPlayerCardData(seat){
        switch(seat){
            case CONSTANTS.PLAYERSEAT.SELF:
                return this.myCardLayout
            case CONSTANTS.PLAYERSEAT.NEXT:
                return this.nextCardLayout
            case CONSTANTS.PLAYERSEAT.FRIEND:
                return this.friendCardLayout
            default:
                return this.backCardLayout
        }
    }

    getStackCardsCount(){
        return this.cardManager.cardsCount()
    }
    
    getFirstCardDataInStack(){
        return this.cardManager.showNextCard()
    }

    painGainCards(seat, pain, gain){
        let layout = this.getPlayerCardData(seat)
        layout.painGainCards(pain, gain)
    }

    gainCardsFromStack(seat, num = 0){
        if(num == 0)
            num = this.getStackCardsCount()
        let cards = []
        for(let i=0; i<num; ++i){
            let card = this.cardManager.pickNextCard()
            cards.push(card)
        }
        this.painGainCards(seat, null, cards)
        return cards
    }

    getFriendOfSeat(seat){
        switch(seat){
            case CONSTANTS.PLAYERSEAT.BACK:
                return CONSTANTS.PLAYERSEAT.NEXT
            case CONSTANTS.PLAYERSEAT.FRIEND:
                return CONSTANTS.PLAYERSEAT.SELF
            case CONSTANTS.PLAYERSEAT.NEXT:
                return CONSTANTS.PLAYERSEAT.BACK
            case CONSTANTS.PLAYERSEAT.SELF:
                return CONSTANTS.PLAYERSEAT.FRIEND
        }
        return null
    }

    getBackOfSeat(seat){
        switch(seat){
            case CONSTANTS.PLAYERSEAT.BACK:
                return CONSTANTS.PLAYERSEAT.FRIEND
            case CONSTANTS.PLAYERSEAT.FRIEND:
                return CONSTANTS.PLAYERSEAT.NEXT
            case CONSTANTS.PLAYERSEAT.NEXT:
                return CONSTANTS.PLAYERSEAT.SELF
            case CONSTANTS.PLAYERSEAT.SELF:
                return CONSTANTS.PLAYERSEAT.BACK
        }
        return null
    }

    getNextOfSeat(seat){
        switch(seat){
            case CONSTANTS.PLAYERSEAT.BACK:
                return CONSTANTS.PLAYERSEAT.SELF
            case CONSTANTS.PLAYERSEAT.FRIEND:
                return CONSTANTS.PLAYERSEAT.BACK
            case CONSTANTS.PLAYERSEAT.NEXT:
                return CONSTANTS.PLAYERSEAT.FRIEND
            case CONSTANTS.PLAYERSEAT.SELF:
                return CONSTANTS.PLAYERSEAT.NEXT
        }
        return null
    }

    checkIsLarger(cardA, cardB){
        return null
    }
}

export default ModalBase
