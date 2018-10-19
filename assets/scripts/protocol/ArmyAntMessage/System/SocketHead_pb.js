/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

 
var goog = jspb;
var global = Function('return this')();

var ArmyAntMessage_Common_base_pb = require('../../ArmyAntMessage/Common/base_pb.js');
goog.object.extend(proto, ArmyAntMessage_Common_base_pb);
goog.exportSymbol('proto.ArmyAntMessage.System.ConversationStepType', null, global);
goog.exportSymbol('proto.ArmyAntMessage.System.SocketExtendNormal_V0_0_0_1', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ArmyAntMessage.System.SocketExtendNormal_V0_0_0_1 = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ArmyAntMessage.System.SocketExtendNormal_V0_0_0_1, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ArmyAntMessage.System.SocketExtendNormal_V0_0_0_1.displayName = 'proto.ArmyAntMessage.System.SocketExtendNormal_V0_0_0_1';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ArmyAntMessage.System.SocketExtendNormal_V0_0_0_1.prototype.toObject = function(opt_includeInstance) {
  return proto.ArmyAntMessage.System.SocketExtendNormal_V0_0_0_1.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ArmyAntMessage.System.SocketExtendNormal_V0_0_0_1} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ArmyAntMessage.System.SocketExtendNormal_V0_0_0_1.toObject = function(includeInstance, msg) {
  var f, obj = {
    appId: jspb.Message.getFieldWithDefault(msg, 1, 0),
    contentLength: jspb.Message.getFieldWithDefault(msg, 2, 0),
    messageCode: jspb.Message.getFieldWithDefault(msg, 3, 0),
    conversationCode: jspb.Message.getFieldWithDefault(msg, 4, 0),
    conversationStepIndex: jspb.Message.getFieldWithDefault(msg, 5, 0),
    conversationStepType: jspb.Message.getFieldWithDefault(msg, 6, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ArmyAntMessage.System.SocketExtendNormal_V0_0_0_1}
 */
proto.ArmyAntMessage.System.SocketExtendNormal_V0_0_0_1.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ArmyAntMessage.System.SocketExtendNormal_V0_0_0_1;
  return proto.ArmyAntMessage.System.SocketExtendNormal_V0_0_0_1.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ArmyAntMessage.System.SocketExtendNormal_V0_0_0_1} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ArmyAntMessage.System.SocketExtendNormal_V0_0_0_1}
 */
proto.ArmyAntMessage.System.SocketExtendNormal_V0_0_0_1.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setAppId(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setContentLength(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMessageCode(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setConversationCode(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setConversationStepIndex(value);
      break;
    case 6:
      var value = /** @type {!proto.ArmyAntMessage.System.ConversationStepType} */ (reader.readEnum());
      msg.setConversationStepType(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ArmyAntMessage.System.SocketExtendNormal_V0_0_0_1.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ArmyAntMessage.System.SocketExtendNormal_V0_0_0_1.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ArmyAntMessage.System.SocketExtendNormal_V0_0_0_1} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ArmyAntMessage.System.SocketExtendNormal_V0_0_0_1.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAppId();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getContentLength();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getMessageCode();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getConversationCode();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
  f = message.getConversationStepIndex();
  if (f !== 0) {
    writer.writeInt32(
      5,
      f
    );
  }
  f = message.getConversationStepType();
  if (f !== 0.0) {
    writer.writeEnum(
      6,
      f
    );
  }
};


/**
 * optional int64 app_id = 1;
 * @return {number}
 */
proto.ArmyAntMessage.System.SocketExtendNormal_V0_0_0_1.prototype.getAppId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.ArmyAntMessage.System.SocketExtendNormal_V0_0_0_1.prototype.setAppId = function(value) {
  jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int32 content_length = 2;
 * @return {number}
 */
proto.ArmyAntMessage.System.SocketExtendNormal_V0_0_0_1.prototype.getContentLength = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.ArmyAntMessage.System.SocketExtendNormal_V0_0_0_1.prototype.setContentLength = function(value) {
  jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 message_code = 3;
 * @return {number}
 */
proto.ArmyAntMessage.System.SocketExtendNormal_V0_0_0_1.prototype.getMessageCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/** @param {number} value */
proto.ArmyAntMessage.System.SocketExtendNormal_V0_0_0_1.prototype.setMessageCode = function(value) {
  jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int32 conversation_code = 4;
 * @return {number}
 */
proto.ArmyAntMessage.System.SocketExtendNormal_V0_0_0_1.prototype.getConversationCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/** @param {number} value */
proto.ArmyAntMessage.System.SocketExtendNormal_V0_0_0_1.prototype.setConversationCode = function(value) {
  jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional int32 conversation_step_index = 5;
 * @return {number}
 */
proto.ArmyAntMessage.System.SocketExtendNormal_V0_0_0_1.prototype.getConversationStepIndex = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/** @param {number} value */
proto.ArmyAntMessage.System.SocketExtendNormal_V0_0_0_1.prototype.setConversationStepIndex = function(value) {
  jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional ConversationStepType conversation_step_type = 6;
 * @return {!proto.ArmyAntMessage.System.ConversationStepType}
 */
proto.ArmyAntMessage.System.SocketExtendNormal_V0_0_0_1.prototype.getConversationStepType = function() {
  return /** @type {!proto.ArmyAntMessage.System.ConversationStepType} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/** @param {!proto.ArmyAntMessage.System.ConversationStepType} value */
proto.ArmyAntMessage.System.SocketExtendNormal_V0_0_0_1.prototype.setConversationStepType = function(value) {
  jspb.Message.setProto3EnumField(this, 6, value);
};


/**
 * @enum {number}
 */
proto.ArmyAntMessage.System.ConversationStepType = {
  DEFAULT: 0,
  NOTICEONLY: 1,
  ASKFOR: 2,
  STARTCONVERSATION: 3,
  CONVERSATIONSTEPON: 4,
  RESPONSEEND: 5
};

goog.object.extend(exports, proto.ArmyAntMessage.System);
