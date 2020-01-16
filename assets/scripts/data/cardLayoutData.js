import CONSTANTS from '../config/constants'
import Card from './card'

export default class CardLayoutData {
    constructor(parent){
        /** @type {Array<Card>} */
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

    getMainCount(){
        return this.getCardsCountOfColor(CONSTANTS.CARDCOLOR.MAIN)
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

    // 找出指定花色中, 多张相同牌的所有组合. 不指定num, 则所有多于1张的情况都会被记录
    getSameCards(color, num = 0){
        let [cards, otherCards] = this.getCardsOfColor(color)
        let ret = []
        if(cards.count < num)
            return ret
        let sameCount = 1
        for(let i=1; i<cards.count; ++i){
            if(cards[i].getValue() == cards[i-1].getValue() && cards[i].getColor() == cards[i-1].getColor()){
                if(sameCount == 0 && ret.length > 0){
                    ret[ret.length-1].push(i)
                }else{
                    ++sameCount
                }
            }else{
                if(num == 0 && sameCount > 1){
                    let elem = []
                    for(let k=0; k<sameCount; ++k){
                        elem.push(cards[i-k-1])
                    }
                    ret.push(elem)
                }
                sameCount = 1
            }
            if(num > 1 && sameCount >= num){
                let elem = []
                for(let k=0; k<num; ++k){
                    elem.push(cards[i-k])
                }
                ret.push(elem)
                sameCount = 0
            }
        }
        if(num == 0 && sameCount > 1){
            let elem = []
            for(let k=0; k<sameCount; ++k){
                elem.push(cards[cards.count-k-1])
            }
            ret.push(elem)
        }
        return ret
    }

    // 获得当前花色最大的牌, 主花色为大王, 小王, 和主花色主打牌, 非主花色为K(打A时)或A(不打A时)
    // 主牌同时返回多个时, 大的在前(大王 > 小王 > 主花色主打牌)
    // 若指定数量, 则不足数量的不返回; 若不指定数量, 则返回值可能是单牌, 对子, 流星或四条, 按照牌数最多的方式返回. 
    getMax(color){
        let [cards, otherCards] = this.getCardsOfColor(color)
        let ret = []
        if(cards.length <= 0)
            return ret
        let index = 0
        switch(color){
            case CONSTANTS.CARDCOLOR.MAIN:
                while(cards[index].getColor()==CONSTANTS.CARDCOLOR.JOKER){
                    if(index == 0)
                        ret[0] = [cards[index]]
                    else if(cards[index].getValue() == cards[index-1].getValue()){
                        ret[ret.length-1].push(cards[index])
                    }else{
                        ret[1] = [cards[index]]
                    }
                    ++index
                }
                while(cards[index].getColor()==this.modalParent.getMainColor() && cards[index].getValue()==this.modalParent.getCurValue()){
                    if(index == 0 || cards[index-1].getColor() == CONSTANTS.CARDCOLOR.JOKER)
                        ret[0] = [cards[index]]
                    else if(cards[index].getColor() == cards[index-1].getColor()){
                        ret[ret.length-1].push(cards[index])
                    }else{
                        cc.error("发生计算错误")
                    }
                    ++index
                }
                break
            case CONSTANTS.CARDCOLOR.UNMAIN:
                {
                    let v = this.modalParent.getCurValue() == 1 ? 13 : 1
                    for(let i=0; i<cards.length; ++i){
                        if(cards[i].getValue() == v){
                            if(ret.length == 0)
                                ret.push([cards[i]])
                            else if(ret[ret.length-1][0].getColor() == cards[i].getColor())
                                ret[ret.length-1].push(cards[i])
                            else
                                ret.push([cards[i]])
                        }
                    }
                }
                break
            default:
                ret[0] = []
                for(let i=0; i<cards.length; ++i){
                    if(cards[i].getValue() == v){
                        ret[0].push([cards[i]])
                    }
                }
                break
        }
        return ret
    }

    /**
     * 获取指定花色中的单牌, 仅限单牌
     * @param {boolean} withoutMax : 为 true , 则不包括大小王以及非主花色中的 K (打A时) 或 A (不打A时)
     * @returns {Array<Card>}
     */
    getSingles(color, withoutMax){
        let [cards, otherCards] = this.getCardsOfColor(color)
        let ret = []
        if(cards.count < 1)
            return ret
        let backSame = false
        for(let i=0; i<cards.count; ++i){
            let nextSame = !(i == cards.count - 1 || 
                            cards[i].getValue() == cards[i+1].getValue() || 
                            cards[i].getColor() == cards[i+1].getColor())
            if( !backSame && !nextSame ){
                if(!withoutMax ||   
                    (   cards[i].getColor() != CONSTANTS.CARDCOLOR.JOKER && 
                        !(  cards[i].getColor()==this.modalParent.getMainColor() && 
                            cards[i].getValue()==this.modalParent.getCurValue() 
                        ) && 
                        (   !this.modalParent.checkIsMain(cards[i]) && 
                            (   (this.modalParent.getCurValue() == 1 && cards[i].getValue()!=13) ||
                                (this.modalParent.getCurValue() != 1 && cards[i].getValue()!=1) 
                            )
                        )
                    )
                ){
                    ret.push(cards[i])
                }
            }
            backSame = !nextSame
        }
        return ret
    }
}