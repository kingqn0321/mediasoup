"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.DumpResponse = void 0;
const flatbuffers = require("flatbuffers");
const channel_message_handlers_1 = require("../../f-b-s/worker/channel-message-handlers");
class DumpResponse {
    bb = null;
    bb_pos = 0;
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    static getRootAsDumpResponse(bb, obj) {
        return (obj || new DumpResponse()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    static getSizePrefixedRootAsDumpResponse(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new DumpResponse()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    pid() {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.readUint64(this.bb_pos + offset) : BigInt('0');
    }
    webrtcServerIds(index, optionalEncoding) {
        const offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.__string(this.bb.__vector(this.bb_pos + offset) + index * 4, optionalEncoding) : null;
    }
    webrtcServerIdsLength() {
        const offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    }
    routerIds(index, optionalEncoding) {
        const offset = this.bb.__offset(this.bb_pos, 8);
        return offset ? this.bb.__string(this.bb.__vector(this.bb_pos + offset) + index * 4, optionalEncoding) : null;
    }
    routerIdsLength() {
        const offset = this.bb.__offset(this.bb_pos, 8);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    }
    channelMessageHandlers(obj) {
        const offset = this.bb.__offset(this.bb_pos, 10);
        return offset ? (obj || new channel_message_handlers_1.ChannelMessageHandlers()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
    }
    static startDumpResponse(builder) {
        builder.startObject(4);
    }
    static addPid(builder, pid) {
        builder.addFieldInt64(0, pid, BigInt('0'));
    }
    static addWebrtcServerIds(builder, webrtcServerIdsOffset) {
        builder.addFieldOffset(1, webrtcServerIdsOffset, 0);
    }
    static createWebrtcServerIdsVector(builder, data) {
        builder.startVector(4, data.length, 4);
        for (let i = data.length - 1; i >= 0; i--) {
            builder.addOffset(data[i]);
        }
        return builder.endVector();
    }
    static startWebrtcServerIdsVector(builder, numElems) {
        builder.startVector(4, numElems, 4);
    }
    static addRouterIds(builder, routerIdsOffset) {
        builder.addFieldOffset(2, routerIdsOffset, 0);
    }
    static createRouterIdsVector(builder, data) {
        builder.startVector(4, data.length, 4);
        for (let i = data.length - 1; i >= 0; i--) {
            builder.addOffset(data[i]);
        }
        return builder.endVector();
    }
    static startRouterIdsVector(builder, numElems) {
        builder.startVector(4, numElems, 4);
    }
    static addChannelMessageHandlers(builder, channelMessageHandlersOffset) {
        builder.addFieldOffset(3, channelMessageHandlersOffset, 0);
    }
    static endDumpResponse(builder) {
        const offset = builder.endObject();
        return offset;
    }
    static finishDumpResponseBuffer(builder, offset) {
        builder.finish(offset);
    }
    static finishSizePrefixedDumpResponseBuffer(builder, offset) {
        builder.finish(offset, undefined, true);
    }
}
exports.DumpResponse = DumpResponse;
