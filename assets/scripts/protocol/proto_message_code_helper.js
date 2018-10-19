
// Please set this file into the root of protobuffer compiled javascript directory

const message_list = {
	["proto.ArmyAntMessage.System.SocketExtendNormal_V0_0_0_1"] : 1,
	
	["proto.ArmyAntMessage.System.C2SM_GetServerStatueRequest"] : 11001,
	["proto.ArmyAntMessage.System.SM2C_GetServerStatueResponse"] : 12001,
	
	["proto.ArmyAntMessage.SubApps.C2SM_EchoLoginRequest"] : 10011001,
	["proto.ArmyAntMessage.SubApps.SM2C_EchoLoginResponse"] : 10012001,
	["proto.ArmyAntMessage.SubApps.C2SM_EchoLogoutRequest"] : 10011002,
	["proto.ArmyAntMessage.SubApps.SM2C_EchoLogoutResponse"] : 10012002,
	["proto.ArmyAntMessage.SubApps.C2SM_EchoSendRequest"] : 10011003,
	["proto.ArmyAntMessage.SubApps.SM2C_EchoSendResponse"] : 10012003,
	["proto.ArmyAntMessage.SubApps.C2SM_EchoBroadcastRequest"] : 10011004,
	["proto.ArmyAntMessage.SubApps.SM2C_EchoBroadcastResponse"] : 10012004,
	["proto.ArmyAntMessage.SubApps.SM2C_EchoReceiveNotice"] : 10011005,
	["proto.ArmyAntMessage.SubApps.SM2C_EchoError"] : 10011006,
	
	["proto.ArmyAntMessage.SubApps.C2SM_HuolongLoginRequest"] : 10101001,
	["proto.ArmyAntMessage.SubApps.SM2C_HuolongLoginResponse"] : 10102001,
	["proto.ArmyAntMessage.SubApps.C2SM_HuolongLogoutRequest"] : 10101002,
	["proto.ArmyAntMessage.SubApps.SM2C_HuolongLogoutResponse"] : 10102002,
}

const protoMessageCodeHelper = {
	toMsgCode:(message)=>{
		if(!message){
			return -3;
		}
		let property = Object.getPrototypeOf(message);
		let displayName = property.displayName;
		if(!displayName && property.constructor){
			displayName = property.constructor.displayName;
		}
		if(!displayName){
			return -2;
		}
		if(message_list.hasOwnProperty(displayName)){
			return message_list[message];
		}
		return -1;
	},
	toDisplayName:(code)=>{
		if(code <= 0){
			return null;
		}
		for(let i in message_list){
			if(message_list[i]==code){
				return i;
			}
		}
		return "";
	}
}

export default protoMessageCodeHelper
