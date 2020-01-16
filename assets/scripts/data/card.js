import Constants from '../config/constants'
import CONSTANTS from '../config/constants'

const CARD_IMG_DIR = 'cards/'

class Card {
  constructor(value, color, group) {
    switch(color){
      case Constants.CARDCOLOR.SPADES:
        this.id = value + 100 + 1000 * group
        break
      case Constants.CARDCOLOR.HEART:
        this.id = value + 200 + 1000 * group
        break
      case Constants.CARDCOLOR.CUBE:
        this.id = value + 300 + 1000 * group
        break
      case Constants.CARDCOLOR.DIAMOND:
        this.id = value + 400 + 1000 * group
        break
      case Constants.CARDCOLOR.JOKER:
        this.id = value + 500 + 1000 * group
        break
      case 0:
        this.id = value + 1000 * group
      default:
        this.id = value
    }
  }

  getValue(){
    return Card.getValue(this.id)
  }

  getGroup(){
    return Card.getGroup(this.id)
  }

  getColor(){
    return Card.getColor(this.id)
  }

  getImgPath(){
    if(this.getValue() <= 0)
      return CARD_IMG_DIR + 'bg_card'
    switch(this.getColor()){
      case Constants.CARDCOLOR.SPADES:
        return CARD_IMG_DIR + 's' + this.getValue()
      case Constants.CARDCOLOR.HEART:
        return CARD_IMG_DIR + 'h' + this.getValue()
      case Constants.CARDCOLOR.CUBE:
        return CARD_IMG_DIR + 'c' + this.getValue()
      case Constants.CARDCOLOR.DIAMOND:
        return CARD_IMG_DIR + 'd' + this.getValue()
      case Constants.CARDCOLOR.JOKER:
        return CARD_IMG_DIR + 'joker' + this.getValue()
      default:
        return CARD_IMG_DIR + 'empty'
    }
  }

  getId(){
    return this.id
  }

  toString(){
    return Card.toString(this.id)
  }

  static getColor = (id)=>{
    let color =  Math.floor(id / 100) % 10
    switch(color){
      case 1:
        return Constants.CARDCOLOR.SPADES
      case 2:
        return Constants.CARDCOLOR.HEART
      case 3:
        return Constants.CARDCOLOR.CUBE
      case 4:
        return Constants.CARDCOLOR.DIAMOND
      case 5:
        return Constants.CARDCOLOR.JOKER
      default:
        return 0
    }
  }
  
  static getGroup = (id)=>{
    return Math.floor(id / 1000)
  }
  
  static getValue = (id)=>{
    return id % 100
  }

  static toString = (id)=>{
    switch(Card.getColor(id)){
      case CONSTANTS.CARDCOLOR.SPADES:
        return "黑桃[" + Card.getValue(id) + "]";
      case CONSTANTS.CARDCOLOR.HEART:
        return "红桃[" + Card.getValue(id) + "]";
      case CONSTANTS.CARDCOLOR.CUBE:
        return "草花[" + Card.getValue(id) + "]";
      case CONSTANTS.CARDCOLOR.DIAMOND:
        return "方块[" + Card.getValue(id) + "]";
      case CONSTANTS.CARDCOLOR.JOKER:
        switch(Card.getValue(id)){
          case 1:
            return "大王";
          case 2:
            return "小王";
          default:
            return "未知王牌[" + Card.getValue(id) + "]";
        }
      default:
        return "未知花色[" + Card.getValue(id) + "]";
    }
  }

  /**
   * 
   * @param {Array<Card>} array 
   * @returns {Array<string>}
   */
  static arrayToCCLogString(array){
    let strArr = [];
    for(let i in array){
      strArr[i] = array[i].toString()
    }
    return strArr;
  }
}

export default Card
