let prefab = null

let WaitingBar = cc.Class({
    extends: cc.Layout,

    properties: {
        content:{
            default:null,
            type: cc.Label
        },
    },
    
    onLoad () {
    },

    start () {
    },

    // update(dt){},

    setContent(text){
        this.content.string = text
    }
})

WaitingBar.setPrefab = (waitingBar_prefab)=>{
    prefab = waitingBar_prefab
}

WaitingBar.show = (content)=>{
    let scene = cc.director.getScene()
    let waitingBar = cc.instantiate(prefab)
    waitingBar.getComponent(WaitingBar).setContent(content)
    scene.getChildByName('Canvas').addChild(waitingBar)
    return waitingBar
}

export default WaitingBar
