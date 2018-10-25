let prefab = null

let EnterRoomPanel = cc.Class({
    extends: cc.Layout,

    properties: {
        labelRoomNumber: {
            default: null,
            type: cc.Label
        },
        btnNumber1: {
            default: null,
            type: cc.Button
        },
        btnNumber2: {
            default: null,
            type: cc.Button
        },
        btnNumber3: {
            default: null,
            type: cc.Button
        },
        btnNumber4: {
            default: null,
            type: cc.Button
        },
        btnNumber5: {
            default: null,
            type: cc.Button
        },
        btnNumber6: {
            default: null,
            type: cc.Button
        },
        btnNumber7: {
            default: null,
            type: cc.Button
        },
        btnNumber8: {
            default: null,
            type: cc.Button
        },
        btnNumber9: {
            default: null,
            type: cc.Button
        },
        btnNumber0: {
            default: null,
            type: cc.Button
        },
        btnCancel: {
            default: null,
            type: cc.Button
        },
        btnOK: {
            default: null,
            type: cc.Button
        },
        callback: {
            default: null,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if(!CC_EDITOR){
            this.btnNumber1.node.on(cc.Node.EventType.TOUCH_END, ()=>{this.onClickNumber(1)})
            this.btnNumber2.node.on(cc.Node.EventType.TOUCH_END, ()=>{this.onClickNumber(2)})
            this.btnNumber3.node.on(cc.Node.EventType.TOUCH_END, ()=>{this.onClickNumber(3)})
            this.btnNumber4.node.on(cc.Node.EventType.TOUCH_END, ()=>{this.onClickNumber(4)})
            this.btnNumber5.node.on(cc.Node.EventType.TOUCH_END, ()=>{this.onClickNumber(5)})
            this.btnNumber6.node.on(cc.Node.EventType.TOUCH_END, ()=>{this.onClickNumber(6)})
            this.btnNumber7.node.on(cc.Node.EventType.TOUCH_END, ()=>{this.onClickNumber(7)})
            this.btnNumber8.node.on(cc.Node.EventType.TOUCH_END, ()=>{this.onClickNumber(8)})
            this.btnNumber9.node.on(cc.Node.EventType.TOUCH_END, ()=>{this.onClickNumber(9)})
            this.btnNumber0.node.on(cc.Node.EventType.TOUCH_END, ()=>{this.onClickNumber(0)})
        }
    },

    start () {
        if(!CC_EDITOR){
        }
    },

    // update (dt) {},

    startShow(callback){
        this.callback = callback
        this.labelRoomNumber.string = ""
    },

    onClickNumber(number){
        if(this.labelRoomNumber.string != "" || number != 0){
            this.labelRoomNumber.string += number
        }
    },

    onClickCancel(){
        this.node.removeFromParent()
    },

    onClickOK(){
        this.callback(Number(this.labelRoomNumber.string))
        this.node.removeFromParent()
    },

});

EnterRoomPanel.setPrefab = (enterRoomPanel_prefab)=>{
    prefab = enterRoomPanel_prefab
}

EnterRoomPanel.show = (callback)=>{
    let panel = cc.instantiate(prefab)
    panel.getComponent(EnterRoomPanel).startShow(callback)
    return panel
}

export default EnterRoomPanel
