"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.SctpAssociationT = exports.SctpAssociation = void 0;
const flatbuffers = require("flatbuffers");
const sctp_listener_1 = require("../../fbs/transport/sctp-listener");
const sctp_parameters_1 = require("../../fbs/transport/sctp-parameters");
class SctpAssociation {
    bb = null;
    bb_pos = 0;
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    static getRootAsSctpAssociation(bb, obj) {
        return (obj || new SctpAssociation()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    static getSizePrefixedRootAsSctpAssociation(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new SctpAssociation()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    sctpParameters(obj) {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? (obj || new sctp_parameters_1.SctpParameters()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
    }
    stcpState(optionalEncoding) {
        const offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
    }
    stcpListener(obj) {
        const offset = this.bb.__offset(this.bb_pos, 8);
        return offset ? (obj || new sctp_listener_1.SctpListener()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
    }
    static startSctpAssociation(builder) {
        builder.startObject(3);
    }
    static addSctpParameters(builder, sctpParametersOffset) {
        builder.addFieldOffset(0, sctpParametersOffset, 0);
    }
    static addStcpState(builder, stcpStateOffset) {
        builder.addFieldOffset(1, stcpStateOffset, 0);
    }
    static addStcpListener(builder, stcpListenerOffset) {
        builder.addFieldOffset(2, stcpListenerOffset, 0);
    }
    static endSctpAssociation(builder) {
        const offset = builder.endObject();
        builder.requiredField(offset, 4); // sctp_parameters
        builder.requiredField(offset, 6); // stcp_state
        builder.requiredField(offset, 8); // stcp_listener
        return offset;
    }
    unpack() {
        return new SctpAssociationT((this.sctpParameters() !== null ? this.sctpParameters().unpack() : null), this.stcpState(), (this.stcpListener() !== null ? this.stcpListener().unpack() : null));
    }
    unpackTo(_o) {
        _o.sctpParameters = (this.sctpParameters() !== null ? this.sctpParameters().unpack() : null);
        _o.stcpState = this.stcpState();
        _o.stcpListener = (this.stcpListener() !== null ? this.stcpListener().unpack() : null);
    }
}
exports.SctpAssociation = SctpAssociation;
class SctpAssociationT {
    sctpParameters;
    stcpState;
    stcpListener;
    constructor(sctpParameters = null, stcpState = null, stcpListener = null) {
        this.sctpParameters = sctpParameters;
        this.stcpState = stcpState;
        this.stcpListener = stcpListener;
    }
    pack(builder) {
        const sctpParameters = (this.sctpParameters !== null ? this.sctpParameters.pack(builder) : 0);
        const stcpState = (this.stcpState !== null ? builder.createString(this.stcpState) : 0);
        const stcpListener = (this.stcpListener !== null ? this.stcpListener.pack(builder) : 0);
        SctpAssociation.startSctpAssociation(builder);
        SctpAssociation.addSctpParameters(builder, sctpParameters);
        SctpAssociation.addStcpState(builder, stcpState);
        SctpAssociation.addStcpListener(builder, stcpListener);
        return SctpAssociation.endSctpAssociation(builder);
    }
}
exports.SctpAssociationT = SctpAssociationT;