import protoMessageCodeHelper from "../protocol/proto_message_code_helper";

// 项目报错时, 执行以下替换:
// 将所有 var jspb = require('google-protobuf') 去掉
// 将require google-protobuf目录下的都去掉, 连同定义的变量的所有引用处

let SystemProto = require("../protocol/ArmyAntMessage/System/SocketHead_pb")

let $socket = Symbol("@socket")
let $conversationIndex = Symbol("@conversationIndex")
let $isBigEnding = Symbol("@isBigEnding")

let $onopen = Symbol("@onopen")
let $onmessage = Symbol("@onmessage")
let $onerror= Symbol("@onerror")
let $onclose = Symbol("@onclose")

let $openedCallback = Symbol("@openedCallback")
let $closedCallback = Symbol("@closedCallback")
let $receivedCallback = Symbol("@receivedCallback")
let $errorCallback = Symbol("@errorCallback")

let $checkIsBigEnding = Symbol("@checkIsBigEnding")
let $parseStringToBinaryArray = Symbol("@parseStringToBinaryArray")
let $createHead = Symbol("@createHead")
let $createExtend = Symbol("@createExtend")
let $getHeadFrom = Symbol("@getHeadFrom")
let $getExtendFrom = Symbol("@getExtendFrom")

let serials = 0
let MessageType = {
    Unknown: 0,
    Normal: 1,
    File: 2,
}
let extend_version = 1
let app_id = 1010

let messageList = {

}

export default class SocketService{
    /** @param {function(boolean, string)} openedCallback */
    /** @param {function(boolean, string, number)} closedCallback */
    /** @param {function(number, any, number, any)} receivedCallback */
    /** @param {function(number, number)} errorCallback */
    constructor(openedCallback=null, closedCallback=null, receivedCallback=null, errorCallback=null){
        this[$socket] = null
        this[$isBigEnding] = this[$checkIsBigEnding]()
        this[$openedCallback] = openedCallback
        this[$closedCallback] = closedCallback
        this[$receivedCallback] = receivedCallback
        this[$errorCallback] = errorCallback
    }

    isBigEnding(){
        return this.isBigEnding
    }

    getMessageByDisplayName(displayName){
        for(let i = 0; i < messageList.length; ++i){
            if(messageList[i].displayName == displayName)
                return messageList[i]
        }
        return null
    }

    /** @param {number} serverURI */
    connect(serverURI){
        if(this[$socket] != null)
            return false
        if(!serverURI)
            return false
        this[$conversationIndex] = 1
        this[$socket] = new WebSocket(serverURI)
        this[$socket].onopen = this[$onopen].bind(this)
        this[$socket].onmessage = this[$onmessage].bind(this)
        this[$socket].onerror = this[$onerror].bind(this)
        this[$socket].onclose = this[$onclose].bind(this)
        return true
    }

    disconnect(){
        if(this[$socket] == null)
            return false
		this[$socket].close()
    }

    isConnection(){
        return this[$socket] != null
    }

    send(message, stepIndex = 0, stepType = SystemProto.ConversationStepType.ASKFOR){
        if(this[$socket] != null)
            return false
        if(!message || !message.serializeBinary)
            return false
        let bytes_msg = message.serializeBinary()
        let arr_extend = this[$createExtend](bytes_msg.length, protoMessageCodeHelper.toMsgCode(message), stepIndex, stepType)
        let arr_head = this[$createHead](serials, MessageType.Normal, extend_version, arr_extend.length)
        let data = Uint8Array.from(arr_head.concat(arr_extend, Array.prototype.slice.call(bytes_msg)))
        this[$socket].send(data)
    }

    [$onopen](event){
        if(this[$openedCallback]!=null){
            this[$openedCallback](event.returnValue, "Websocket connected");
        }
    }
    
    [$onmessage](event){
        let reader = new FileReader();
        reader.onload = function(load_event){
            if(load_event.target.readyState == FileReader.DONE){
                // Get data
                let data = load_event.target.result;
                let dataWriter = this[$parseStringToBinaryArray](data)
                let uint8arr = new Uint8Array(dataWriter)
                // Get head and extend
                let head = this[$getHeadFrom](uint8arr)
                if(head.type != MessageType.Normal){
                    // TODO : message type is incorrect
                    cc.warn("The type of the received message is incorrect !")
                }
                let extend = this[$getExtendFrom](uint8arr, head.extendVersion, head.extendLength)
                this[$conversationIndex] = extend.getConversationCode()
                if(extend.getAppId() != app_id){
                    // TODO : appid is incorrect
                    cc.warn("The appid of the received message is incorrect !")
                }
                // Get content
                let dataBuffer = new ArrayBuffer(extend.getContentLength())
                let data_arr8 = new Uint8Array(dataBuffer);
                for(let i=16+head.extendLength; i<16+head.extendLength+extend.getContentLength(); ++i){
                    data_arr8[i-16-head.extendLength] = uint8arr[i];
                }
                let messageBytes = Array.prototype.slice.call(data_arr8)
                let messageDisplayName= protoMessageCodeHelper.toDisplayName(extend.getMessageCode())
                let messageType = this.getMessageByDisplayName(messageDisplayName)
                if(messageType != null){
                    let message = messageType.deserializeBinary(messageBytes)
                    this[$receivedCallback](extend.getMessageCode(), message, extend.getConversationStepIndex(), extend.getConversationStepType())
                }else{
                    // TODO : parse to message failed
                    cc.warn("Received an unknown message, code: " + extend.getMessageCode() + ", displayName: " + messageDisplayName)
                }
            }else{
                // TODO : parse failed
                    cc.warn("FileReader error")
            }
        }.bind(this);
        reader.readAsBinaryString(event.data);        
    }
    
    [$onerror](event){
        if(this[$errorCallback]!=null){
            let readyState = null
            if(event.srcElement){
                readyState = event.srcElement.readyState
            }
            this[$errorCallback](event.eventPhase, readyState);
        }
    }
    
    [$onclose](event){
        this[$socket] = null
        if(this[$closedCallback]!=null){
            this[$closedCallback](event.returnValue, event.reason, event.code);
        }
    }
    
	[$checkIsBigEnding](){
		let buffer = new ArrayBuffer(8)
		let uint32 = new Uint32Array(buffer)
		uint32[0] =1 // 在uint32对应的缓冲区的开始，用四个字节，写入数字1 默认按计算机存储方式， 如果是小端存储，每一个缓冲区byte分别为 1，0，0，0. 大端存储为0,0,0,1
 
		let uint8 = new Uint8Array(buffer, 0, 1) //让uint8对应缓冲区的前1个字节，并按uint8 来呈现缓冲区
		return uint8 == 0
    }
    
    [$parseStringToBinaryArray](binstr){
        let ret = new ArrayBuffer(binstr.length); // 2 bytes for each char
        let bufView = new Uint8Array(ret);
        for (var i=0, strLen=str.length; i<strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return ret
    }
	
	[$createHead](serials, type, extendVersion, extendLength){
		let buffer = new ArrayBuffer(16)
		let arr32 = new Uint32Array(buffer);
		if(this[$isBigEnding]){
			arr32[0] = extendLength
			arr32[1] = extendVersion
			arr32[2] = type
			arr32[3] = serials
			let ret = Array.prototype.slice.call(new Uint8Array(buffer))
			return ret.reverse()
		} else {
			arr32[0] = serials
			arr32[1] = type
			arr32[2] = extendVersion
			arr32[3] = extendLength
			let ret = Array.prototype.slice.call(new Uint8Array(buffer))
			return ret
		}
    }
    
    [$createExtend](contentLength, msgCode, stepIndex = 0, stepType = SystemProto.ConversationStepType.ASKFOR){
        let extend = new SystemProto.SocketExtendNormal_V0_0_0_1()
        extend.setAppId(app_id)
        extend.setContentLength(contentLength)
        extend.setMessageCode(msgCode)
        extend.setConversationCode(++this[$conversationIndex])
        extend.setConversationStepIndex(stepIndex)
        extend.setConversationStepType(stepType)
        let bytes_extend = extend.serializeBinary()
        return Array.prototype.slice.call(bytes_extend)
    }

    [$getHeadFrom](u8arr){
        let headBuffer = new ArrayBuffer(16)
        let head_arr8 = new Uint8Array(headBuffer);
        for(let i=0; i<16; ++i){
            head_arr8[i] = u8arr[i];
        }
        let head_arr32 = new Uint32Array(headBuffer);
        let ret = {}
        if(this[$isBigEnding]){
            let head = Array.prototype.slice.call(head_arr8).reverse()
            let reversed = Uint32Array.from(head)
            ret.extendLength = reversed[0]
            ret.extendVersion = reversed[1]
            ret.type = reversed[2]
            ret.serials = reversed[3]
        } else {
            ret.serials = head_arr32[0]
            ret.type = head_arr32[1]
            ret.extendVersion = head_arr32[2]
            ret.extendLength = head_arr32[3]
        }
        return ret
    }

    [$getExtendFrom](u8arr, extendVersion, extendLength){
        let extendBuffer = new ArrayBuffer(extendLength)
        let extend_arr8 = new Uint8Array(extendBuffer);
        for(let i = 16; i < 16 + extendLength; ++i){
            extend_arr8[i-16] = u8arr[i];
        }
        switch(extendVersion){
            case 1:
                return SystemProto.SocketExtendNormal_V0_0_0_1.deserializeBinary(Array.prototype.slice.call(extend_arr8))
        }
        return null
    }
}