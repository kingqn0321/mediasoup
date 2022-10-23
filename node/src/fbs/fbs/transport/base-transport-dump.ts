// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

import { StringUint8, StringUint8T } from '../../fbs/common/string-uint8';
import { Uint32String, Uint32StringT } from '../../fbs/common/uint32string';
import { RtpListener, RtpListenerT } from '../../fbs/transport/rtp-listener';
import { SctpListener, SctpListenerT } from '../../fbs/transport/sctp-listener';
import { SctpParameters, SctpParametersT } from '../../fbs/transport/sctp-parameters';


export class BaseTransportDump {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):BaseTransportDump {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsBaseTransportDump(bb:flatbuffers.ByteBuffer, obj?:BaseTransportDump):BaseTransportDump {
  return (obj || new BaseTransportDump()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsBaseTransportDump(bb:flatbuffers.ByteBuffer, obj?:BaseTransportDump):BaseTransportDump {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new BaseTransportDump()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

id():string|null
id(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
id(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

direct():boolean {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? !!this.bb!.readInt8(this.bb_pos + offset) : false;
}

producerIds(index: number):string
producerIds(index: number,optionalEncoding:flatbuffers.Encoding):string|Uint8Array
producerIds(index: number,optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 8);
  return offset ? this.bb!.__string(this.bb!.__vector(this.bb_pos + offset) + index * 4, optionalEncoding) : null;
}

producerIdsLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 8);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

consumerIds(index: number):string
consumerIds(index: number,optionalEncoding:flatbuffers.Encoding):string|Uint8Array
consumerIds(index: number,optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 10);
  return offset ? this.bb!.__string(this.bb!.__vector(this.bb_pos + offset) + index * 4, optionalEncoding) : null;
}

consumerIdsLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 10);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

mapSsrcConsumerId(index: number, obj?:Uint32String):Uint32String|null {
  const offset = this.bb!.__offset(this.bb_pos, 12);
  return offset ? (obj || new Uint32String()).__init(this.bb!.__indirect(this.bb!.__vector(this.bb_pos + offset) + index * 4), this.bb!) : null;
}

mapSsrcConsumerIdLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 12);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

mapRtxSsrcConsumerId(index: number, obj?:Uint32String):Uint32String|null {
  const offset = this.bb!.__offset(this.bb_pos, 14);
  return offset ? (obj || new Uint32String()).__init(this.bb!.__indirect(this.bb!.__vector(this.bb_pos + offset) + index * 4), this.bb!) : null;
}

mapRtxSsrcConsumerIdLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 14);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

dataProducerIds(index: number):string
dataProducerIds(index: number,optionalEncoding:flatbuffers.Encoding):string|Uint8Array
dataProducerIds(index: number,optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 16);
  return offset ? this.bb!.__string(this.bb!.__vector(this.bb_pos + offset) + index * 4, optionalEncoding) : null;
}

dataProducerIdsLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 16);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

dataConsumerIds(index: number):string
dataConsumerIds(index: number,optionalEncoding:flatbuffers.Encoding):string|Uint8Array
dataConsumerIds(index: number,optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 18);
  return offset ? this.bb!.__string(this.bb!.__vector(this.bb_pos + offset) + index * 4, optionalEncoding) : null;
}

dataConsumerIdsLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 18);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

recvRtpHeaderExtensions(index: number, obj?:StringUint8):StringUint8|null {
  const offset = this.bb!.__offset(this.bb_pos, 20);
  return offset ? (obj || new StringUint8()).__init(this.bb!.__indirect(this.bb!.__vector(this.bb_pos + offset) + index * 4), this.bb!) : null;
}

recvRtpHeaderExtensionsLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 20);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

rtpListener(obj?:RtpListener):RtpListener|null {
  const offset = this.bb!.__offset(this.bb_pos, 22);
  return offset ? (obj || new RtpListener()).__init(this.bb!.__indirect(this.bb_pos + offset), this.bb!) : null;
}

maxMessageSize():number {
  const offset = this.bb!.__offset(this.bb_pos, 24);
  return offset ? this.bb!.readUint32(this.bb_pos + offset) : 0;
}

sctpParameters(obj?:SctpParameters):SctpParameters|null {
  const offset = this.bb!.__offset(this.bb_pos, 26);
  return offset ? (obj || new SctpParameters()).__init(this.bb!.__indirect(this.bb_pos + offset), this.bb!) : null;
}

stcpState():string|null
stcpState(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
stcpState(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 28);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

stcpListener(obj?:SctpListener):SctpListener|null {
  const offset = this.bb!.__offset(this.bb_pos, 30);
  return offset ? (obj || new SctpListener()).__init(this.bb!.__indirect(this.bb_pos + offset), this.bb!) : null;
}

traceEventTypes(index: number):string
traceEventTypes(index: number,optionalEncoding:flatbuffers.Encoding):string|Uint8Array
traceEventTypes(index: number,optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 32);
  return offset ? this.bb!.__string(this.bb!.__vector(this.bb_pos + offset) + index * 4, optionalEncoding) : null;
}

traceEventTypesLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 32);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

static startBaseTransportDump(builder:flatbuffers.Builder) {
  builder.startObject(15);
}

static addId(builder:flatbuffers.Builder, idOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, idOffset, 0);
}

static addDirect(builder:flatbuffers.Builder, direct:boolean) {
  builder.addFieldInt8(1, +direct, +false);
}

static addProducerIds(builder:flatbuffers.Builder, producerIdsOffset:flatbuffers.Offset) {
  builder.addFieldOffset(2, producerIdsOffset, 0);
}

static createProducerIdsVector(builder:flatbuffers.Builder, data:flatbuffers.Offset[]):flatbuffers.Offset {
  builder.startVector(4, data.length, 4);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]!);
  }
  return builder.endVector();
}

static startProducerIdsVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
}

static addConsumerIds(builder:flatbuffers.Builder, consumerIdsOffset:flatbuffers.Offset) {
  builder.addFieldOffset(3, consumerIdsOffset, 0);
}

static createConsumerIdsVector(builder:flatbuffers.Builder, data:flatbuffers.Offset[]):flatbuffers.Offset {
  builder.startVector(4, data.length, 4);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]!);
  }
  return builder.endVector();
}

static startConsumerIdsVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
}

static addMapSsrcConsumerId(builder:flatbuffers.Builder, mapSsrcConsumerIdOffset:flatbuffers.Offset) {
  builder.addFieldOffset(4, mapSsrcConsumerIdOffset, 0);
}

static createMapSsrcConsumerIdVector(builder:flatbuffers.Builder, data:flatbuffers.Offset[]):flatbuffers.Offset {
  builder.startVector(4, data.length, 4);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]!);
  }
  return builder.endVector();
}

static startMapSsrcConsumerIdVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
}

static addMapRtxSsrcConsumerId(builder:flatbuffers.Builder, mapRtxSsrcConsumerIdOffset:flatbuffers.Offset) {
  builder.addFieldOffset(5, mapRtxSsrcConsumerIdOffset, 0);
}

static createMapRtxSsrcConsumerIdVector(builder:flatbuffers.Builder, data:flatbuffers.Offset[]):flatbuffers.Offset {
  builder.startVector(4, data.length, 4);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]!);
  }
  return builder.endVector();
}

static startMapRtxSsrcConsumerIdVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
}

static addDataProducerIds(builder:flatbuffers.Builder, dataProducerIdsOffset:flatbuffers.Offset) {
  builder.addFieldOffset(6, dataProducerIdsOffset, 0);
}

static createDataProducerIdsVector(builder:flatbuffers.Builder, data:flatbuffers.Offset[]):flatbuffers.Offset {
  builder.startVector(4, data.length, 4);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]!);
  }
  return builder.endVector();
}

static startDataProducerIdsVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
}

static addDataConsumerIds(builder:flatbuffers.Builder, dataConsumerIdsOffset:flatbuffers.Offset) {
  builder.addFieldOffset(7, dataConsumerIdsOffset, 0);
}

static createDataConsumerIdsVector(builder:flatbuffers.Builder, data:flatbuffers.Offset[]):flatbuffers.Offset {
  builder.startVector(4, data.length, 4);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]!);
  }
  return builder.endVector();
}

static startDataConsumerIdsVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
}

static addRecvRtpHeaderExtensions(builder:flatbuffers.Builder, recvRtpHeaderExtensionsOffset:flatbuffers.Offset) {
  builder.addFieldOffset(8, recvRtpHeaderExtensionsOffset, 0);
}

static createRecvRtpHeaderExtensionsVector(builder:flatbuffers.Builder, data:flatbuffers.Offset[]):flatbuffers.Offset {
  builder.startVector(4, data.length, 4);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]!);
  }
  return builder.endVector();
}

static startRecvRtpHeaderExtensionsVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
}

static addRtpListener(builder:flatbuffers.Builder, rtpListenerOffset:flatbuffers.Offset) {
  builder.addFieldOffset(9, rtpListenerOffset, 0);
}

static addMaxMessageSize(builder:flatbuffers.Builder, maxMessageSize:number) {
  builder.addFieldInt32(10, maxMessageSize, 0);
}

static addSctpParameters(builder:flatbuffers.Builder, sctpParametersOffset:flatbuffers.Offset) {
  builder.addFieldOffset(11, sctpParametersOffset, 0);
}

static addStcpState(builder:flatbuffers.Builder, stcpStateOffset:flatbuffers.Offset) {
  builder.addFieldOffset(12, stcpStateOffset, 0);
}

static addStcpListener(builder:flatbuffers.Builder, stcpListenerOffset:flatbuffers.Offset) {
  builder.addFieldOffset(13, stcpListenerOffset, 0);
}

static addTraceEventTypes(builder:flatbuffers.Builder, traceEventTypesOffset:flatbuffers.Offset) {
  builder.addFieldOffset(14, traceEventTypesOffset, 0);
}

static createTraceEventTypesVector(builder:flatbuffers.Builder, data:flatbuffers.Offset[]):flatbuffers.Offset {
  builder.startVector(4, data.length, 4);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]!);
  }
  return builder.endVector();
}

static startTraceEventTypesVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
}

static endBaseTransportDump(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  builder.requiredField(offset, 4) // id
  return offset;
}


unpack(): BaseTransportDumpT {
  return new BaseTransportDumpT(
    this.id(),
    this.direct(),
    this.bb!.createScalarList(this.producerIds.bind(this), this.producerIdsLength()),
    this.bb!.createScalarList(this.consumerIds.bind(this), this.consumerIdsLength()),
    this.bb!.createObjList(this.mapSsrcConsumerId.bind(this), this.mapSsrcConsumerIdLength()),
    this.bb!.createObjList(this.mapRtxSsrcConsumerId.bind(this), this.mapRtxSsrcConsumerIdLength()),
    this.bb!.createScalarList(this.dataProducerIds.bind(this), this.dataProducerIdsLength()),
    this.bb!.createScalarList(this.dataConsumerIds.bind(this), this.dataConsumerIdsLength()),
    this.bb!.createObjList(this.recvRtpHeaderExtensions.bind(this), this.recvRtpHeaderExtensionsLength()),
    (this.rtpListener() !== null ? this.rtpListener()!.unpack() : null),
    this.maxMessageSize(),
    (this.sctpParameters() !== null ? this.sctpParameters()!.unpack() : null),
    this.stcpState(),
    (this.stcpListener() !== null ? this.stcpListener()!.unpack() : null),
    this.bb!.createScalarList(this.traceEventTypes.bind(this), this.traceEventTypesLength())
  );
}


unpackTo(_o: BaseTransportDumpT): void {
  _o.id = this.id();
  _o.direct = this.direct();
  _o.producerIds = this.bb!.createScalarList(this.producerIds.bind(this), this.producerIdsLength());
  _o.consumerIds = this.bb!.createScalarList(this.consumerIds.bind(this), this.consumerIdsLength());
  _o.mapSsrcConsumerId = this.bb!.createObjList(this.mapSsrcConsumerId.bind(this), this.mapSsrcConsumerIdLength());
  _o.mapRtxSsrcConsumerId = this.bb!.createObjList(this.mapRtxSsrcConsumerId.bind(this), this.mapRtxSsrcConsumerIdLength());
  _o.dataProducerIds = this.bb!.createScalarList(this.dataProducerIds.bind(this), this.dataProducerIdsLength());
  _o.dataConsumerIds = this.bb!.createScalarList(this.dataConsumerIds.bind(this), this.dataConsumerIdsLength());
  _o.recvRtpHeaderExtensions = this.bb!.createObjList(this.recvRtpHeaderExtensions.bind(this), this.recvRtpHeaderExtensionsLength());
  _o.rtpListener = (this.rtpListener() !== null ? this.rtpListener()!.unpack() : null);
  _o.maxMessageSize = this.maxMessageSize();
  _o.sctpParameters = (this.sctpParameters() !== null ? this.sctpParameters()!.unpack() : null);
  _o.stcpState = this.stcpState();
  _o.stcpListener = (this.stcpListener() !== null ? this.stcpListener()!.unpack() : null);
  _o.traceEventTypes = this.bb!.createScalarList(this.traceEventTypes.bind(this), this.traceEventTypesLength());
}
}

export class BaseTransportDumpT {
constructor(
  public id: string|Uint8Array|null = null,
  public direct: boolean = false,
  public producerIds: (string)[] = [],
  public consumerIds: (string)[] = [],
  public mapSsrcConsumerId: (Uint32StringT)[] = [],
  public mapRtxSsrcConsumerId: (Uint32StringT)[] = [],
  public dataProducerIds: (string)[] = [],
  public dataConsumerIds: (string)[] = [],
  public recvRtpHeaderExtensions: (StringUint8T)[] = [],
  public rtpListener: RtpListenerT|null = null,
  public maxMessageSize: number = 0,
  public sctpParameters: SctpParametersT|null = null,
  public stcpState: string|Uint8Array|null = null,
  public stcpListener: SctpListenerT|null = null,
  public traceEventTypes: (string)[] = []
){}


pack(builder:flatbuffers.Builder): flatbuffers.Offset {
  const id = (this.id !== null ? builder.createString(this.id!) : 0);
  const producerIds = BaseTransportDump.createProducerIdsVector(builder, builder.createObjectOffsetList(this.producerIds));
  const consumerIds = BaseTransportDump.createConsumerIdsVector(builder, builder.createObjectOffsetList(this.consumerIds));
  const mapSsrcConsumerId = BaseTransportDump.createMapSsrcConsumerIdVector(builder, builder.createObjectOffsetList(this.mapSsrcConsumerId));
  const mapRtxSsrcConsumerId = BaseTransportDump.createMapRtxSsrcConsumerIdVector(builder, builder.createObjectOffsetList(this.mapRtxSsrcConsumerId));
  const dataProducerIds = BaseTransportDump.createDataProducerIdsVector(builder, builder.createObjectOffsetList(this.dataProducerIds));
  const dataConsumerIds = BaseTransportDump.createDataConsumerIdsVector(builder, builder.createObjectOffsetList(this.dataConsumerIds));
  const recvRtpHeaderExtensions = BaseTransportDump.createRecvRtpHeaderExtensionsVector(builder, builder.createObjectOffsetList(this.recvRtpHeaderExtensions));
  const rtpListener = (this.rtpListener !== null ? this.rtpListener!.pack(builder) : 0);
  const sctpParameters = (this.sctpParameters !== null ? this.sctpParameters!.pack(builder) : 0);
  const stcpState = (this.stcpState !== null ? builder.createString(this.stcpState!) : 0);
  const stcpListener = (this.stcpListener !== null ? this.stcpListener!.pack(builder) : 0);
  const traceEventTypes = BaseTransportDump.createTraceEventTypesVector(builder, builder.createObjectOffsetList(this.traceEventTypes));

  BaseTransportDump.startBaseTransportDump(builder);
  BaseTransportDump.addId(builder, id);
  BaseTransportDump.addDirect(builder, this.direct);
  BaseTransportDump.addProducerIds(builder, producerIds);
  BaseTransportDump.addConsumerIds(builder, consumerIds);
  BaseTransportDump.addMapSsrcConsumerId(builder, mapSsrcConsumerId);
  BaseTransportDump.addMapRtxSsrcConsumerId(builder, mapRtxSsrcConsumerId);
  BaseTransportDump.addDataProducerIds(builder, dataProducerIds);
  BaseTransportDump.addDataConsumerIds(builder, dataConsumerIds);
  BaseTransportDump.addRecvRtpHeaderExtensions(builder, recvRtpHeaderExtensions);
  BaseTransportDump.addRtpListener(builder, rtpListener);
  BaseTransportDump.addMaxMessageSize(builder, this.maxMessageSize);
  BaseTransportDump.addSctpParameters(builder, sctpParameters);
  BaseTransportDump.addStcpState(builder, stcpState);
  BaseTransportDump.addStcpListener(builder, stcpListener);
  BaseTransportDump.addTraceEventTypes(builder, traceEventTypes);

  return BaseTransportDump.endBaseTransportDump(builder);
}
}