/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('db://assets/scripts/protocol/google-protobuf');
var goog = jspb;
var global = Function('return this')();

var google_protobuf_descriptor_pb = require('db://assets/scripts/protocol/google-protobuf/google/protobuf/descriptor_pb.js');
goog.object.extend(proto, google_protobuf_descriptor_pb);
goog.exportSymbol('proto.LoginType', null, global);
goog.exportSymbol('proto.msgCode', null, global);
/**
 * @enum {number}
 */
proto.LoginType = {
  AUTO: 0,
  WECHATIOS: 1,
  WECHATANDROID: 2,
  WECHATOTHERS: 3,
  APPIOSPHONE: 4,
  APPANDROIDPHONE: 5,
  APPOTHERSPHONE: 6,
  HTMLPHONE: 7,
  APPAPPLEINNER: 8,
  APPGOOGLEINNER: 9,
  APPMICROSOFTINNER: 10,
  APPIOSSELFACCOUNT: 11,
  APPANDROIDSELFACCOUNT: 12,
  APPWINDOWSSELFACCOUNT: 13,
  APPWINDOWSSTORESELFACCOUNT: 14,
  APPMACOSSELFACCOUNT: 15,
  APPLINUXSELFACCOUNT: 16,
  HTMLSELFACCOUNT: 17,
  OTHERSSELFACCOUNT: 18,
  APPIOSQQ: 19,
  APPANDROIDQQ: 20,
  APPWINDOWSQQ: 21,
  APPWINDOWSSTOREQQ: 22,
  APPHTMLQQ: 23,
  APPOTHERSQQ: 24,
  HTLMQQ: 25,
  APPIOSWECHAT: 26,
  APPANDROIDWECHAT: 27,
  APPHTMLWECHAT: 28,
  APPOTHERSWECHAT: 29,
  HTMLWECHAT: 30,
  APPIOSGOOGLE: 31,
  APPHTMLGOOGLE: 32,
  APPOTHERSGOOGLE: 33,
  HTMLGOOGLE: 34,
  APPIOSMICROSOFT: 35,
  APPANDROIDMICROSOFT: 36,
  APPHTMLMICROSOFT: 37,
  APPOTHERSMICROSOFT: 38,
  HTMLMICROSOFT: 39,
  FACEBOOK: 40,
  GITHUB: 41,
  APPIOSALIPAY: 42,
  APPANDROIDALIPAY: 43,
  APPHTMLALIPAY: 44,
  APPOTHERSALIPAY: 45,
  HTMLALIPAY: 46,
  APPIOSDINGTALK: 47,
  APPANDROIDDINGTALK: 48,
  APPHTMLDINGTALK: 49,
  APPOTHERSDINGTALK: 50,
  HTMLDINGTALK: 51,
  APPIOSGUEST: 52,
  APPANDROIDGUEST: 53,
  APPWINDOWSGUEST: 54,
  APPWINDOWSSTOREGUEST: 55,
  APPMACOSGUEST: 56,
  APPLINUXGUEST: 57,
  APPHTMLGUEST: 58,
  APPOTHERSGUEST: 59,
  HTMLGUEST: 60,
  APPIOSSINA: 61,
  APPANDROIDSINA: 62,
  APPHTMLSINA: 63,
  APPOTHERSSINA: 64,
  HTMLSINA: 65,
  NETEASE: 66,
  STEAMIOS: 67,
  STEAMANDROID: 68,
  STEAMWINDOWS: 69,
  STEAMMACOS: 70,
  STEAMLINUX: 71,
  STEAMXBOX: 72
};


/**
 * A tuple of {field number, class constructor} for the extension
 * field named `msgCode`.
 * @type {!jspb.ExtensionFieldInfo<number>}
 */
proto.msgCode = new jspb.ExtensionFieldInfo(
    50001,
    {msgCode: 0},
    null,
     /** @type {?function((boolean|undefined),!jspb.Message=): !Object} */ (
         null),
    0);

google_protobuf_descriptor_pb.MessageOptions.extensionsBinary[50001] = new jspb.ExtensionFieldBinaryInfo(
    proto.msgCode,
    jspb.BinaryReader.prototype.readInt32,
    jspb.BinaryWriter.prototype.writeInt32,
    undefined,
    undefined,
    false);
// This registers the extension field with the extended class, so that
// toObject() will function correctly.
google_protobuf_descriptor_pb.MessageOptions.extensions[50001] = proto.msgCode;

goog.object.extend(exports, proto);
