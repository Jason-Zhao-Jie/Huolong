import ServiceBus from './serviceBus'

let instance = null
let $onSocketDisconnected = Symbol("@onSocketDisconnected")

class HallController {
    constructor(){
        this.serviceBus = new ServiceBus(this, this[$onSocketDisconnected].bind(this))
        // Connect to server
        this.serviceBus.connect()
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
