import Constants from '../../config/constants'
import Card from 'card'


function getInitialCards(groupNums, hasJoker, hasJQK){
  let cards = []
  let end = hasJQK ? 13 : 9
  for(let g=1;g<=groupNums;++g){
    for (let i = 1; i <= end; ++i) {
      cards.push(new Card(i, Constants.CARDCOLOR.SPADES, g))
      cards.push(new Card(i, Constants.CARDCOLOR.HEART, g))
      cards.push(new Card(i, Constants.CARDCOLOR.CUBE, g))
      cards.push(new Card(i, Constants.CARDCOLOR.DIAMOND, g))
    }
    if (hasJoker) {
      cards.push(new Card(1, Constants.CARDCOLOR.JOKER, g))
      cards.push(new Card(2, Constants.CARDCOLOR.JOKER, g))
    }
  }
  return cards
}

export default class CardManager {
  constructor(hasJoker = true, hasJQK = true) {
    this.hasJoker = hasJoker
    this.hasJQK = hasJQK
  }

  randomAllCards(groupNums){
    this.groupNums = groupNums
    this.cardQueue = []
    let initCard = getInitialCards(this.groupNums, this.hasJoker, this.hasJQK)
    while(initCard.length > 0){
      let num = parseInt(initCard.length * Math.random())
      this.cardQueue.push(initCard[num])
      initCard.splice(num, 1)
    }
  }

  cardsCount(){
    return this.cardQueue.length
  }

  pickNextCard(){
    if(this.cardQueue.length <= 0)
      return null
    let ret = this.cardQueue[0]
    this.cardQueue.splice(0,1)
    return ret
  }

  showNextCard() {
    if (this.cardQueue.length <= 0)
      return null
    return this.cardQueue[0]
  }

  getCardsCount(){
    return this.cardQueue.length
  }

  calculateScoreInCards(cards){
    if(cards == null || !cards.length)
      return null
    let ret = 0
    for(let i=0; i<cards.length; ++i){
      if(cards[i].getValue() == 5)
        ret += 5
      else if(cards[i].getValue() == 10 || cards[i].getValue() == 13)
        ret += 10
    }
    return ret
  }

}