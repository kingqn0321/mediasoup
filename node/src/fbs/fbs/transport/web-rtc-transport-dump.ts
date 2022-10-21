// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

import { DtlsParameters, DtlsParametersT } from '../../fbs/transport/dtls-parameters';
import { IceCandidate, IceCandidateT } from '../../fbs/transport/ice-candidate';
import { IceParameters, IceParametersT } from '../../fbs/transport/ice-parameters';
import { TransportDump, TransportDumpT } from '../../fbs/transport/transport-dump';
import { Tuple, TupleT } from '../../fbs/transport/tuple';


export class WebRtcTransportDump {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):WebRtcTransportDump {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsWebRtcTransportDump(bb:flatbuffers.ByteBuffer, obj?:WebRtcTransportDump):WebRtcTransportDump {
  return (obj || new WebRtcTransportDump()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsWebRtcTransportDump(bb:flatbuffers.ByteBuffer, obj?:WebRtcTransportDump):WebRtcTransportDump {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new WebRtcTransportDump()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

base(obj?:TransportDump):TransportDump|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? (obj || new TransportDump()).__init(this.bb!.__indirect(this.bb_pos + offset), this.bb!) : null;
}

iceRole():string|null
iceRole(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
iceRole(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

iceParameters(obj?:IceParameters):IceParameters|null {
  const offset = this.bb!.__offset(this.bb_pos, 8);
  return offset ? (obj || new IceParameters()).__init(this.bb!.__indirect(this.bb_pos + offset), this.bb!) : null;
}

iceCandidates(index: number, obj?:IceCandidate):IceCandidate|null {
  const offset = this.bb!.__offset(this.bb_pos, 10);
  return offset ? (obj || new IceCandidate()).__init(this.bb!.__indirect(this.bb!.__vector(this.bb_pos + offset) + index * 4), this.bb!) : null;
}

iceCandidatesLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 10);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

iceState():string|null
iceState(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
iceState(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 12);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

iceSelectedTuple(obj?:Tuple):Tuple|null {
  const offset = this.bb!.__offset(this.bb_pos, 14);
  return offset ? (obj || new Tuple()).__init(this.bb!.__indirect(this.bb_pos + offset), this.bb!) : null;
}

dtlsParameters(obj?:DtlsParameters):DtlsParameters|null {
  const offset = this.bb!.__offset(this.bb_pos, 16);
  return offset ? (obj || new DtlsParameters()).__init(this.bb!.__indirect(this.bb_pos + offset), this.bb!) : null;
}

static startWebRtcTransportDump(builder:flatbuffers.Builder) {
  builder.startObject(7);
}

static addBase(builder:flatbuffers.Builder, baseOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, baseOffset, 0);
}

static addIceRole(builder:flatbuffers.Builder, iceRoleOffset:flatbuffers.Offset) {
  builder.addFieldOffset(1, iceRoleOffset, 0);
}

static addIceParameters(builder:flatbuffers.Builder, iceParametersOffset:flatbuffers.Offset) {
  builder.addFieldOffset(2, iceParametersOffset, 0);
}

static addIceCandidates(builder:flatbuffers.Builder, iceCandidatesOffset:flatbuffers.Offset) {
  builder.addFieldOffset(3, iceCandidatesOffset, 0);
}

static createIceCandidatesVector(builder:flatbuffers.Builder, data:flatbuffers.Offset[]):flatbuffers.Offset {
  builder.startVector(4, data.length, 4);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]!);
  }
  return builder.endVector();
}

static startIceCandidatesVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
}

static addIceState(builder:flatbuffers.Builder, iceStateOffset:flatbuffers.Offset) {
  builder.addFieldOffset(4, iceStateOffset, 0);
}

static addIceSelectedTuple(builder:flatbuffers.Builder, iceSelectedTupleOffset:flatbuffers.Offset) {
  builder.addFieldOffset(5, iceSelectedTupleOffset, 0);
}

static addDtlsParameters(builder:flatbuffers.Builder, dtlsParametersOffset:flatbuffers.Offset) {
  builder.addFieldOffset(6, dtlsParametersOffset, 0);
}

static endWebRtcTransportDump(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  builder.requiredField(offset, 4) // base
  builder.requiredField(offset, 6) // ice_role
  builder.requiredField(offset, 8) // ice_parameters
  builder.requiredField(offset, 10) // ice_candidates
  builder.requiredField(offset, 12) // ice_state
  builder.requiredField(offset, 16) // dtls_parameters
  return offset;
}


unpack(): WebRtcTransportDumpT {
  return new WebRtcTransportDumpT(
    (this.base() !== null ? this.base()!.unpack() : null),
    this.iceRole(),
    (this.iceParameters() !== null ? this.iceParameters()!.unpack() : null),
    this.bb!.createObjList(this.iceCandidates.bind(this), this.iceCandidatesLength()),
    this.iceState(),
    (this.iceSelectedTuple() !== null ? this.iceSelectedTuple()!.unpack() : null),
    (this.dtlsParameters() !== null ? this.dtlsParameters()!.unpack() : null)
  );
}


unpackTo(_o: WebRtcTransportDumpT): void {
  _o.base = (this.base() !== null ? this.base()!.unpack() : null);
  _o.iceRole = this.iceRole();
  _o.iceParameters = (this.iceParameters() !== null ? this.iceParameters()!.unpack() : null);
  _o.iceCandidates = this.bb!.createObjList(this.iceCandidates.bind(this), this.iceCandidatesLength());
  _o.iceState = this.iceState();
  _o.iceSelectedTuple = (this.iceSelectedTuple() !== null ? this.iceSelectedTuple()!.unpack() : null);
  _o.dtlsParameters = (this.dtlsParameters() !== null ? this.dtlsParameters()!.unpack() : null);
}
}

export class WebRtcTransportDumpT {
constructor(
  public base: TransportDumpT|null = null,
  public iceRole: string|Uint8Array|null = null,
  public iceParameters: IceParametersT|null = null,
  public iceCandidates: (IceCandidateT)[] = [],
  public iceState: string|Uint8Array|null = null,
  public iceSelectedTuple: TupleT|null = null,
  public dtlsParameters: DtlsParametersT|null = null
){}


pack(builder:flatbuffers.Builder): flatbuffers.Offset {
  const base = (this.base !== null ? this.base!.pack(builder) : 0);
  const iceRole = (this.iceRole !== null ? builder.createString(this.iceRole!) : 0);
  const iceParameters = (this.iceParameters !== null ? this.iceParameters!.pack(builder) : 0);
  const iceCandidates = WebRtcTransportDump.createIceCandidatesVector(builder, builder.createObjectOffsetList(this.iceCandidates));
  const iceState = (this.iceState !== null ? builder.createString(this.iceState!) : 0);
  const iceSelectedTuple = (this.iceSelectedTuple !== null ? this.iceSelectedTuple!.pack(builder) : 0);
  const dtlsParameters = (this.dtlsParameters !== null ? this.dtlsParameters!.pack(builder) : 0);

  WebRtcTransportDump.startWebRtcTransportDump(builder);
  WebRtcTransportDump.addBase(builder, base);
  WebRtcTransportDump.addIceRole(builder, iceRole);
  WebRtcTransportDump.addIceParameters(builder, iceParameters);
  WebRtcTransportDump.addIceCandidates(builder, iceCandidates);
  WebRtcTransportDump.addIceState(builder, iceState);
  WebRtcTransportDump.addIceSelectedTuple(builder, iceSelectedTuple);
  WebRtcTransportDump.addDtlsParameters(builder, dtlsParameters);

  return WebRtcTransportDump.endWebRtcTransportDump(builder);
}
}
