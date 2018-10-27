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
        maxLength: {
            default: 10,
        },
        okCallback: {
            default: null,
        },
        cancelCallback: {
            default: null,
        },
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
            this.btnCancel.node.on(cc.Node.EventType.TOUCH_END, this.onClickCancel.bind(this))
            this.btnOK.node.on(cc.Node.EventType.TOUCH_END, this.onClickOK.bind(this))
            this.btnOK.interactable = false
        }
    },

    start () {
        if(!CC_EDITOR){
            this.labelRoomNumber.string = ""
        }
    },

    // update (dt) {},

    startShow(okCB, cancelCB = null, maxLength = 10){
        this.okCallback = okCB
        this.cancelCallback = cancelCB
        this.maxLength = maxLength
    },

    onClickNumber(number){
        if(this.labelRoomNumber.string.length < this.maxLength && (this.labelRoomNumber.string != "" || number != 0)){
            this.labelRoomNumber.string += number
            this.btnOK.interactable = true
        }
    },

    onClickCancel(){
        this.cancelCallback()
        this.node.removeFromParent()
    },

    onClickOK(){
        if(this.btnOK.interactable){
            this.okCallback(Number(this.labelRoomNumber.string))
            this.node.removeFromParent()
        }
    },

});

EnterRoomPanel.setPrefab = (enterRoomPanel_prefab)=>{
    prefab = enterRoomPanel_prefab
}

EnterRoomPanel.show = (okCB, cancelCB = null, maxLength = 10)=>{
    let panel = cc.instantiate(prefab)
    panel.getComponent(EnterRoomPanel).startShow(okCB, cancelCB, maxLength)
    return panel
}

export default EnterRoomPanel
