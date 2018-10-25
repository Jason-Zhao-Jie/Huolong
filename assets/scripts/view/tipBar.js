let prefab = null

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

TipBar.setPrefab = (tipbar_prefab)=>{
    prefab = tipbar_prefab
}

TipBar.show = (content)=>{
    let scene = cc.director.getScene()
    let tipBar = cc.instantiate(prefab)
    tipBar.getComponent(TipBar).setContent(content)
    scene.getChildByName('Canvas').addChild(tipBar)
}

export default TipBar
