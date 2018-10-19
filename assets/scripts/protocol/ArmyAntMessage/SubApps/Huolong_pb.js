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
goog.exportSymbol('proto.ArmyAntMessage.SubApps.C2SM_HuolongLoginRequest', null, global);
goog.exportSymbol('proto.ArmyAntMessage.SubApps.C2SM_HuolongLogoutRequest', null, global);
goog.exportSymbol('proto.ArmyAntMessage.SubApps.SM2C_HuolongLoginResponse', null, global);
goog.exportSymbol('proto.ArmyAntMessage.SubApps.SM2C_HuolongLogoutResponse', null, global);

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
proto.ArmyAntMessage.SubApps.C2SM_HuolongLoginRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ArmyAntMessage.SubApps.C2SM_HuolongLoginRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ArmyAntMessage.SubApps.C2SM_HuolongLoginRequest.displayName = 'proto.ArmyAntMessage.SubApps.C2SM_HuolongLoginRequest';
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
proto.ArmyAntMessage.SubApps.C2SM_HuolongLoginRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.ArmyAntMessage.SubApps.C2SM_HuolongLoginRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ArmyAntMessage.SubApps.C2SM_HuolongLoginRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ArmyAntMessage.SubApps.C2SM_HuolongLoginRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    type: jspb.Message.getFieldWithDefault(msg, 1, 0),
    userId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    userPassword: jspb.Message.getFieldWithDefault(msg, 3, ""),
    accountAuth: jspb.Message.getFieldWithDefault(msg, 4, ""),
    autoLoginAuth: jspb.Message.getFieldWithDefault(msg, 5, "")
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
 * @return {!proto.ArmyAntMessage.SubApps.C2SM_HuolongLoginRequest}
 */
proto.ArmyAntMessage.SubApps.C2SM_HuolongLoginRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ArmyAntMessage.SubApps.C2SM_HuolongLoginRequest;
  return proto.ArmyAntMessage.SubApps.C2SM_HuolongLoginRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ArmyAntMessage.SubApps.C2SM_HuolongLoginRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ArmyAntMessage.SubApps.C2SM_HuolongLoginRequest}
 */
proto.ArmyAntMessage.SubApps.C2SM_HuolongLoginRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.LoginType} */ (reader.readEnum());
      msg.setType(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserPassword(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setAccountAuth(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setAutoLoginAuth(value);
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
proto.ArmyAntMessage.SubApps.C2SM_HuolongLoginRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ArmyAntMessage.SubApps.C2SM_HuolongLoginRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ArmyAntMessage.SubApps.C2SM_HuolongLoginRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ArmyAntMessage.SubApps.C2SM_HuolongLoginRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getType();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getUserPassword();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getAccountAuth();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getAutoLoginAuth();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
};


/**
 * optional LoginType type = 1;
 * @return {!proto.LoginType}
 */
proto.ArmyAntMessage.SubApps.C2SM_HuolongLoginRequest.prototype.getType = function() {
  return /** @type {!proto.LoginType} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {!proto.LoginType} value */
proto.ArmyAntMessage.SubApps.C2SM_HuolongLoginRequest.prototype.setType = function(value) {
  jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional string user_id = 2;
 * @return {string}
 */
proto.ArmyAntMessage.SubApps.C2SM_HuolongLoginRequest.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.ArmyAntMessage.SubApps.C2SM_HuolongLoginRequest.prototype.setUserId = function(value) {
  jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string user_password = 3;
 * @return {string}
 */
proto.ArmyAntMessage.SubApps.C2SM_HuolongLoginRequest.prototype.getUserPassword = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/** @param {string} value */
proto.ArmyAntMessage.SubApps.C2SM_HuolongLoginRequest.prototype.setUserPassword = function(value) {
  jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string account_auth = 4;
 * @return {string}
 */
proto.ArmyAntMessage.SubApps.C2SM_HuolongLoginRequest.prototype.getAccountAuth = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/** @param {string} value */
proto.ArmyAntMessage.SubApps.C2SM_HuolongLoginRequest.prototype.setAccountAuth = function(value) {
  jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string auto_login_auth = 5;
 * @return {string}
 */
proto.ArmyAntMessage.SubApps.C2SM_HuolongLoginRequest.prototype.getAutoLoginAuth = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/** @param {string} value */
proto.ArmyAntMessage.SubApps.C2SM_HuolongLoginRequest.prototype.setAutoLoginAuth = function(value) {
  jspb.Message.setProto3StringField(this, 5, value);
};



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
proto.ArmyAntMessage.SubApps.SM2C_HuolongLoginResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ArmyAntMessage.SubApps.SM2C_HuolongLoginResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ArmyAntMessage.SubApps.SM2C_HuolongLoginResponse.displayName = 'proto.ArmyAntMessage.SubApps.SM2C_HuolongLoginResponse';
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
proto.ArmyAntMessage.SubApps.SM2C_HuolongLoginResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.ArmyAntMessage.SubApps.SM2C_HuolongLoginResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ArmyAntMessage.SubApps.SM2C_HuolongLoginResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ArmyAntMessage.SubApps.SM2C_HuolongLoginResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    result: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, ""),
    autoLoginAuth: jspb.Message.getFieldWithDefault(msg, 3, "")
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
 * @return {!proto.ArmyAntMessage.SubApps.SM2C_HuolongLoginResponse}
 */
proto.ArmyAntMessage.SubApps.SM2C_HuolongLoginResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ArmyAntMessage.SubApps.SM2C_HuolongLoginResponse;
  return proto.ArmyAntMessage.SubApps.SM2C_HuolongLoginResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ArmyAntMessage.SubApps.SM2C_HuolongLoginResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ArmyAntMessage.SubApps.SM2C_HuolongLoginResponse}
 */
proto.ArmyAntMessage.SubApps.SM2C_HuolongLoginResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setResult(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setAutoLoginAuth(value);
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
proto.ArmyAntMessage.SubApps.SM2C_HuolongLoginResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ArmyAntMessage.SubApps.SM2C_HuolongLoginResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ArmyAntMessage.SubApps.SM2C_HuolongLoginResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ArmyAntMessage.SubApps.SM2C_HuolongLoginResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getResult();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getAutoLoginAuth();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional int32 result = 1;
 * @return {number}
 */
proto.ArmyAntMessage.SubApps.SM2C_HuolongLoginResponse.prototype.getResult = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.ArmyAntMessage.SubApps.SM2C_HuolongLoginResponse.prototype.setResult = function(value) {
  jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.ArmyAntMessage.SubApps.SM2C_HuolongLoginResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.ArmyAntMessage.SubApps.SM2C_HuolongLoginResponse.prototype.setMessage = function(value) {
  jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string auto_login_auth = 3;
 * @return {string}
 */
proto.ArmyAntMessage.SubApps.SM2C_HuolongLoginResponse.prototype.getAutoLoginAuth = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/** @param {string} value */
proto.ArmyAntMessage.SubApps.SM2C_HuolongLoginResponse.prototype.setAutoLoginAuth = function(value) {
  jspb.Message.setProto3StringField(this, 3, value);
};



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
proto.ArmyAntMessage.SubApps.C2SM_HuolongLogoutRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ArmyAntMessage.SubApps.C2SM_HuolongLogoutRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ArmyAntMessage.SubApps.C2SM_HuolongLogoutRequest.displayName = 'proto.ArmyAntMessage.SubApps.C2SM_HuolongLogoutRequest';
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
proto.ArmyAntMessage.SubApps.C2SM_HuolongLogoutRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.ArmyAntMessage.SubApps.C2SM_HuolongLogoutRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ArmyAntMessage.SubApps.C2SM_HuolongLogoutRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ArmyAntMessage.SubApps.C2SM_HuolongLogoutRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    autoLoginAuth: jspb.Message.getFieldWithDefault(msg, 1, "")
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
 * @return {!proto.ArmyAntMessage.SubApps.C2SM_HuolongLogoutRequest}
 */
proto.ArmyAntMessage.SubApps.C2SM_HuolongLogoutRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ArmyAntMessage.SubApps.C2SM_HuolongLogoutRequest;
  return proto.ArmyAntMessage.SubApps.C2SM_HuolongLogoutRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ArmyAntMessage.SubApps.C2SM_HuolongLogoutRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ArmyAntMessage.SubApps.C2SM_HuolongLogoutRequest}
 */
proto.ArmyAntMessage.SubApps.C2SM_HuolongLogoutRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setAutoLoginAuth(value);
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
proto.ArmyAntMessage.SubApps.C2SM_HuolongLogoutRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ArmyAntMessage.SubApps.C2SM_HuolongLogoutRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ArmyAntMessage.SubApps.C2SM_HuolongLogoutRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ArmyAntMessage.SubApps.C2SM_HuolongLogoutRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAutoLoginAuth();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string auto_login_auth = 1;
 * @return {string}
 */
proto.ArmyAntMessage.SubApps.C2SM_HuolongLogoutRequest.prototype.getAutoLoginAuth = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.ArmyAntMessage.SubApps.C2SM_HuolongLogoutRequest.prototype.setAutoLoginAuth = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};



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
proto.ArmyAntMessage.SubApps.SM2C_HuolongLogoutResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ArmyAntMessage.SubApps.SM2C_HuolongLogoutResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ArmyAntMessage.SubApps.SM2C_HuolongLogoutResponse.displayName = 'proto.ArmyAntMessage.SubApps.SM2C_HuolongLogoutResponse';
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
proto.ArmyAntMessage.SubApps.SM2C_HuolongLogoutResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.ArmyAntMessage.SubApps.SM2C_HuolongLogoutResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ArmyAntMessage.SubApps.SM2C_HuolongLogoutResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ArmyAntMessage.SubApps.SM2C_HuolongLogoutResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    result: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
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
 * @return {!proto.ArmyAntMessage.SubApps.SM2C_HuolongLogoutResponse}
 */
proto.ArmyAntMessage.SubApps.SM2C_HuolongLogoutResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ArmyAntMessage.SubApps.SM2C_HuolongLogoutResponse;
  return proto.ArmyAntMessage.SubApps.SM2C_HuolongLogoutResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ArmyAntMessage.SubApps.SM2C_HuolongLogoutResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ArmyAntMessage.SubApps.SM2C_HuolongLogoutResponse}
 */
proto.ArmyAntMessage.SubApps.SM2C_HuolongLogoutResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setResult(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
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
proto.ArmyAntMessage.SubApps.SM2C_HuolongLogoutResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ArmyAntMessage.SubApps.SM2C_HuolongLogoutResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ArmyAntMessage.SubApps.SM2C_HuolongLogoutResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ArmyAntMessage.SubApps.SM2C_HuolongLogoutResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getResult();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional int32 result = 1;
 * @return {number}
 */
proto.ArmyAntMessage.SubApps.SM2C_HuolongLogoutResponse.prototype.getResult = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.ArmyAntMessage.SubApps.SM2C_HuolongLogoutResponse.prototype.setResult = function(value) {
  jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.ArmyAntMessage.SubApps.SM2C_HuolongLogoutResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.ArmyAntMessage.SubApps.SM2C_HuolongLogoutResponse.prototype.setMessage = function(value) {
  jspb.Message.setProto3StringField(this, 2, value);
};


goog.object.extend(exports, proto.ArmyAntMessage.SubApps);
