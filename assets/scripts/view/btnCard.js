import loader from '../utils/loader'
import Card from '../data/card'
import CONSTANTS from '../config/constants'

let BtnCard = cc.Class({
    extends: cc.Button,

    properties: {
        value:{
            default:0,
            type: cc.Integer
        },
        id:{
            default:0
        },
        enabledClick:{
            default:false
        },
        clicked:{
            default:false
        }
    },

    getId(){
        return this.id
    },

    getValue(){
      return Card.getValue(this.id)
    },
  
    getGroup(){
      return Card.getGroup(this.id)
    },
  
    getColor(){
      return Card.getColor(this.id)
    },

    getShownData(){
        return new Card(this.getValue(), this.getColor(), 0)
    },

    setClickEnabled(value){
        if(!value && this.clicked){
            this.clicked = false
            this.node.position.y -= 25
        }
        this.enabledClick = value
    },

    setClickCallback(cb){
        this.callback = cb
    },

    setController(controller){
        this.controller = controller
    },

    setCard(id, imgSrc){
        this.id = id
        this.node.active = false
        loader.loadSpriteFrame(imgSrc, (sp)=>{
            this.normalSprite = sp
            this.pressedSprite = sp
            this.hoverSprite = sp
            this.disabledSprite = sp
            this.node.getComponent(cc.Sprite).spriteFrame = sp
            this.node.active = true
        })
    },
    
    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClick.bind(this))
    },

    start () {
    },

    canClick(){
        return this.enabledClick && 
                (   this.controller.getState() == CONSTANTS.GAMESTATE.INGAME || 
                    this.controller.getState() == CONSTANTS.GAMESTATE.GIVINGLASTCARDS && 
                        ( this.getColor() == CONSTANTS.CARDCOLOR.JOKER || 
                        this.controller.getZhuangSeat() == CONSTANTS.PLAYERSEAT.SELF)   )
    },

    onClick (){
        if(this.canClick()){
            this.clicked = !this.clicked
            this.node.y += 25 * (this.clicked?1:-1)
            if(this.callback)
                this.callback(this)
        }
    }
})

export default BtnCard
