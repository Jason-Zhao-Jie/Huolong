

export default class SocketService{
    constructor(){
        this.socket = null
    }

    connect(serverURI){
        if(this.socket != null)
            return false
        if(!serverURI)
            return false
        this.socket = new WebSocket(serverURI)
        return true
    }
    
}