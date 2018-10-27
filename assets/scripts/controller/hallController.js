import ServiceBus from './serviceBus'
import MessageSender from './messageSender'
import MessageReceiver from './messageReceiver'

let instance = null
let $onSocketDisconnected = Symbol("@onSocketDisconnected")

class HallController {
    constructor(){
        this.serviceBus = new ServiceBus(this, this[$onSocketDisconnected].bind(this))
        this.messageSender = new MessageSender(this.serviceBus)
        this.messageReceiver = new MessageReceiver(this.serviceBus)
        // Connect to server
        this.serviceBus.connect()
    }

    getWechatSharedCanvasRenderedTexture(){
        return this.serviceBus.getWechatSharedCanvasRenderedTexture()
    }

    // private member functions
    [$onSocketDisconnected](){
        cc.log("Will reconnect to server ...")
        this.serviceBus.connect()
    }
}

HallController.getInstance = ()=>{
    if (instance == null){
        instance= new HallController()
    }
    return instance
}

export default HallController
