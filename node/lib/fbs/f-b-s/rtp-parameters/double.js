"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.Double = void 0;
const flatbuffers = require("flatbuffers");
class Double {
    bb = null;
    bb_pos = 0;
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    static getRootAsDouble(bb, obj) {
        return (obj || new Double()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    static getSizePrefixedRootAsDouble(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new Double()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    value() {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
    }
    static startDouble(builder) {
        builder.startObject(1);
    }
    static addValue(builder, value) {
        builder.addFieldFloat64(0, value, 0.0);
    }
    static endDouble(builder) {
        const offset = builder.endObject();
        return offset;
    }
    static createDouble(builder, value) {
        Double.startDouble(builder);
        Double.addValue(builder, value);
        return Double.endDouble(builder);
    }
}
exports.Double = Double;
