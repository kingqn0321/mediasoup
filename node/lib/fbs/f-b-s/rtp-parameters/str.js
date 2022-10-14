"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.Str = void 0;
const flatbuffers = require("flatbuffers");
class Str {
    bb = null;
    bb_pos = 0;
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    static getRootAsStr(bb, obj) {
        return (obj || new Str()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    static getSizePrefixedRootAsStr(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new Str()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    value(optionalEncoding) {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
    }
    static startStr(builder) {
        builder.startObject(1);
    }
    static addValue(builder, valueOffset) {
        builder.addFieldOffset(0, valueOffset, 0);
    }
    static endStr(builder) {
        const offset = builder.endObject();
        return offset;
    }
    static createStr(builder, valueOffset) {
        Str.startStr(builder);
        Str.addValue(builder, valueOffset);
        return Str.endStr(builder);
    }
}
exports.Str = Str;
