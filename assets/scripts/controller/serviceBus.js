import SocketService from './socketService'

export default class ServiceBus{
    constructor(controller){
        this.controller = controller

        this.socketService = new SocketService()
    }

}