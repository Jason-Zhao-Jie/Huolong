
let TipBar = cc.Class({
    extends: cc.Layout,

    properties: {
        content:{
            default:null,
            type: cc.Label
        },
        showedTime:{
            default:0
        }
    },
    
    onLoad () {
    },

    start () {
        this.showedTime = 0
    },

    update(dt){
        this.showedTime += dt
        if(this.showedTime > 3){
            this.node.removeFromParent()
        }
    },

    setContent(text){
        this.content.string = text
    }
})

export default TipBar
