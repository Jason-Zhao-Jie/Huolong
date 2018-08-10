import CONSTANTS from '../../config/constants'

export default class CardLayoutData {
    constructor(parent){
        this.cards = []
        this.jokers = []
        this.modalParent = parent
    }

    painGainCards(pain, gain = null){
        let aboutJoker = false
        if(pain != null){
            for(let i=0; i<pain.length; ++i){
                this.cards.splice(this.getIndexOfCards(pain[i]), 1)
                if(pain[i].getColor() == CONSTANTS.CARDCOLOR.JOKER && pain[i].getValue() == 1)
                    aboutJoker = true
            }
        }
        if(gain != null){
            for(let i=0; i<gain.length; ++i){
                this.cards.push(gain[i])
                if(gain[i].getColor() == CONSTANTS.CARDCOLOR.JOKER && gain[i].getValue() == 1)
                    aboutJoker = true
            }
        }
        this.cards.sort((a,b)=>{
            return this.modalParent.checkIsLarger(a,b,true) ? 1:-1
        })
        if(aboutJoker){
            this.jokers = []
            for(let i=0; i<this.cards.length; ++i){
                if(this.cards[i].getColor() == CONSTANTS.CARDCOLOR.JOKER && this.cards[i].getValue() == 1)
                    this.jokers.push(this.cards[i])
            }
        }
    }

    getJoker1(){
        return this.jokers
    }

    getIndexOfCards(card){
        let cardId = card.getId()
        for(let i=0;i<this.cards.length;++i){
            if(this.cards[i].getId() == cardId)
                return i;
        }
        return -1
    }

    getCardByIndex(index){
        if(index < 0)
            index += this.cards.length
        return this.cards[index]
    }
    
    getCardsByIndexes(cardsIndexes){
        if(cardsIndexes == null)
            return null
        let ret = []
        for(let i=0; i<cardsIndexes.length; ++i){
            ret.push(this.getCardByIndex(cardsIndexes[i]))
        }
        return ret
    }

    getCardsOfColor(color){
        let ret = []
        let others = []
        switch(color){
            case CONSTANTS.CARDCOLOR.MAIN:
                for(let i=0; i<this.cards.length; ++i){
                    if(this.modalParent.checkIsMain(this.cards[i]))
                        ret.push(this.cards[i])
                    else
                        others.push(this.cards[i])
                }
                break
            case CONSTANTS.CARDCOLOR.UNMAIN:
                for(let i=0; i<this.cards.length; ++i){
                    if(!this.modalParent.checkIsMain(this.cards[i]))
                        ret.push(this.cards[i])
                    else
                        others.push(this.cards[i])
                }
                break
            case CONSTANTS.CARDCOLOR.ANY:
                for(let i=0; i<this.cards.length; ++i){
                    ret.push(this.cards[i])
                }
                break
            default:
                for(let i=0; i<this.cards.length; ++i){
                    if(this.cards[i].getColor() == color && !this.modalParent.checkIsMain(this.cards[i]))
                        ret.push(this.cards[i])
                    else
                        others.push(this.cards[i])
                }
        }
        return [ret, others]
    }

    getCardsCountOfColor(color){
        let ret = 0
        switch(color){
            case CONSTANTS.CARDCOLOR.MAIN:
                for(let i=0; i<this.cards.length; ++i){
                    if(this.modalParent.checkIsMain(this.cards[i]))
                        ++ret
                }
                break
            case CONSTANTS.CARDCOLOR.UNMAIN:
                for(let i=0; i<this.cards.length; ++i){
                    if(!this.modalParent.checkIsMain(this.cards[i]))
                        ++ret
                }
                break
            case CONSTANTS.CARDCOLOR.ANY:
                for(let i=0; i<this.cards.length; ++i){
                    ++ret
                }
                break
            default:
                for(let i=0; i<this.cards.length; ++i){
                    if(this.cards[i].getColor() == color && !this.modalParent.checkIsMain(this.cards[i]))
                        ++ret
                }
        }
        return ret
    }

    getCardIdByIndex(index){
        if(typeof this.cards[index] == 'undefined'){
            cc.log("error:index="+index)
        }
        if(typeof this.cards[index] == "undefined"){
            cc.log("index="+index+",length="+this.cards.length)
        }
        return this.cards[index].getId()
    }
}