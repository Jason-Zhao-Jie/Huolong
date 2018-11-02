import CONSTANTS from '../config/constants'

let prefab = null

let MessageBox = cc.Class({
    extends: cc.Layout,

    properties: {
        labelContent: {
            default: null,
            type: cc.Label,
            serializable: true
        },

        btnLeft: {
            default: null,
            type: cc.Button,
            serializable: true
        },

        labelBtnLeft: {
            default: null,
            type: cc.Label,
            serializable: true
        },

        btnMiddle: {
            default: null,
            type: cc.Button,
            serializable: true
        },

        labelBtnMiddle: {
            default: null,
            type: cc.Label,
            serializable: true
        },

        btnRight:{
            default: null,
            type: cc.Button,
            serializable: true
        },

        labelBtnRight:{
            default: null,
            type: cc.Label,
            serializable: true
        },

        leftCallback:{
            default: null,
        },

        rightCallback:{
            default: null,
        },
    },

    onLoad () {
        this.btnLeft.node.on(cc.Node.EventType.TOUCH_END, this.onLeft.bind(this))
        this.btnMiddle.node.on(cc.Node.EventType.TOUCH_END, this.onLeft.bind(this))
        this.btnRight.node.on(cc.Node.EventType.TOUCH_END, this.onRight.bind(this))
    },

    start () {
        if(this.parameters){
        }
    },

    // update (dt) {},

    startShow(text, leftLabel = "确定", leftCallback = null, rightLabel = null, rightCallback = null){
        this.labelContent.string = text
        if(rightLabel != null){
            this.btnLeft.node.active = true
            this.btnRight.node.active = true
            this.btnMiddle.node.active = false
            this.labelBtnLeft.string = leftLabel
            this.labelBtnRight.string = rightLabel
        }else{
            this.btnLeft.node.active = false
            this.btnRight.node.active = false
            this.btnMiddle.node.active = true
            this.labelBtnMiddle.string = leftLabel
        }
        this.leftCallback = leftCallback
        this.rightCallback = rightCallback
    },

    onLeft(){
        this.node.removeFromParent()
        if(this.leftCallback){
            this.leftCallback()
        }
    },

    onRight(){
        this.node.removeFromParent()
        if(this.rightCallback){
            this.rightCallback()
        }
    },

});


MessageBox.setPrefab = (messageBox_prefab)=>{
    prefab = messageBox_prefab
}

MessageBox.show = (text, leftLabel = "确定", leftCallback = null, rightLabel = null, rightCallback = null)=>{
    let scene = cc.director.getScene()
    let panel = cc.instantiate(prefab)
    panel.getComponent(MessageBox).startShow(text, leftLabel, leftCallback, rightLabel, rightCallback)
    scene.getChildByName('Canvas').addChild(panel)
    return panel
}


export default MessageBox
