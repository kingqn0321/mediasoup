// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

import { Body, unionToBody, unionListToBody } from '../../fbs/request/body';
import { Method } from '../../fbs/request/method';
import { CloseRtpObserverRequest, CloseRtpObserverRequestT } from '../../fbs/router/close-rtp-observer-request';
import { CloseTransportRequest, CloseTransportRequestT } from '../../fbs/router/close-transport-request';
import { CreateActiveSpeakerObserverRequest, CreateActiveSpeakerObserverRequestT } from '../../fbs/router/create-active-speaker-observer-request';
import { CreateAudioLevelObserverRequest, CreateAudioLevelObserverRequestT } from '../../fbs/router/create-audio-level-observer-request';
import { CreateDirectTransportRequest, CreateDirectTransportRequestT } from '../../fbs/router/create-direct-transport-request';
import { CreatePipeTransportRequest, CreatePipeTransportRequestT } from '../../fbs/router/create-pipe-transport-request';
import { CreatePlainTransportRequest, CreatePlainTransportRequestT } from '../../fbs/router/create-plain-transport-request';
import { CreateWebRtcTransportRequest, CreateWebRtcTransportRequestT } from '../../fbs/router/create-web-rtc-transport-request';
import { ConsumeRequest, ConsumeRequestT } from '../../fbs/transport/consume-request';
import { EnableTraceEventRequest, EnableTraceEventRequestT } from '../../fbs/transport/enable-trace-event-request';
import { SetMaxIncomingBitrateRequest, SetMaxIncomingBitrateRequestT } from '../../fbs/transport/set-max-incoming-bitrate-request';
import { SetMaxOutgoingBitrateRequest, SetMaxOutgoingBitrateRequestT } from '../../fbs/transport/set-max-outgoing-bitrate-request';
import { CloseRouterRequest, CloseRouterRequestT } from '../../fbs/worker/close-router-request';
import { CloseWebRtcServerRequest, CloseWebRtcServerRequestT } from '../../fbs/worker/close-web-rtc-server-request';
import { CreateRouterRequest, CreateRouterRequestT } from '../../fbs/worker/create-router-request';
import { CreateWebRtcServerRequest, CreateWebRtcServerRequestT } from '../../fbs/worker/create-web-rtc-server-request';
import { UpdateSettingsRequest, UpdateSettingsRequestT } from '../../fbs/worker/update-settings-request';


export class Request {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):Request {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsRequest(bb:flatbuffers.ByteBuffer, obj?:Request):Request {
  return (obj || new Request()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsRequest(bb:flatbuffers.ByteBuffer, obj?:Request):Request {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new Request()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

id():number {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.readUint32(this.bb_pos + offset) : 0;
}

method():Method {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.readUint8(this.bb_pos + offset) : Method.WORKER_CLOSE;
}

handlerId():string|null
handlerId(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
handlerId(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 8);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

bodyType():Body {
  const offset = this.bb!.__offset(this.bb_pos, 10);
  return offset ? this.bb!.readUint8(this.bb_pos + offset) : Body.NONE;
}

body<T extends flatbuffers.Table>(obj:any):any|null {
  const offset = this.bb!.__offset(this.bb_pos, 12);
  return offset ? this.bb!.__union(obj, this.bb_pos + offset) : null;
}

static startRequest(builder:flatbuffers.Builder) {
  builder.startObject(5);
}

static addId(builder:flatbuffers.Builder, id:number) {
  builder.addFieldInt32(0, id, 0);
}

static addMethod(builder:flatbuffers.Builder, method:Method) {
  builder.addFieldInt8(1, method, Method.WORKER_CLOSE);
}

static addHandlerId(builder:flatbuffers.Builder, handlerIdOffset:flatbuffers.Offset) {
  builder.addFieldOffset(2, handlerIdOffset, 0);
}

static addBodyType(builder:flatbuffers.Builder, bodyType:Body) {
  builder.addFieldInt8(3, bodyType, Body.NONE);
}

static addBody(builder:flatbuffers.Builder, bodyOffset:flatbuffers.Offset) {
  builder.addFieldOffset(4, bodyOffset, 0);
}

static endRequest(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static finishRequestBuffer(builder:flatbuffers.Builder, offset:flatbuffers.Offset) {
  builder.finish(offset);
}

static finishSizePrefixedRequestBuffer(builder:flatbuffers.Builder, offset:flatbuffers.Offset) {
  builder.finish(offset, undefined, true);
}

static createRequest(builder:flatbuffers.Builder, id:number, method:Method, handlerIdOffset:flatbuffers.Offset, bodyType:Body, bodyOffset:flatbuffers.Offset):flatbuffers.Offset {
  Request.startRequest(builder);
  Request.addId(builder, id);
  Request.addMethod(builder, method);
  Request.addHandlerId(builder, handlerIdOffset);
  Request.addBodyType(builder, bodyType);
  Request.addBody(builder, bodyOffset);
  return Request.endRequest(builder);
}

unpack(): RequestT {
  return new RequestT(
    this.id(),
    this.method(),
    this.handlerId(),
    this.bodyType(),
    (() => {
      let temp = unionToBody(this.bodyType(), this.body.bind(this));
      if(temp === null) { return null; }
      return temp.unpack()
  })()
  );
}


unpackTo(_o: RequestT): void {
  _o.id = this.id();
  _o.method = this.method();
  _o.handlerId = this.handlerId();
  _o.bodyType = this.bodyType();
  _o.body = (() => {
      let temp = unionToBody(this.bodyType(), this.body.bind(this));
      if(temp === null) { return null; }
      return temp.unpack()
  })();
}
}

export class RequestT {
constructor(
  public id: number = 0,
  public method: Method = Method.WORKER_CLOSE,
  public handlerId: string|Uint8Array|null = null,
  public bodyType: Body = Body.NONE,
  public body: CloseRouterRequestT|CloseRtpObserverRequestT|CloseTransportRequestT|CloseWebRtcServerRequestT|ConsumeRequestT|CreateActiveSpeakerObserverRequestT|CreateAudioLevelObserverRequestT|CreateDirectTransportRequestT|CreatePipeTransportRequestT|CreatePlainTransportRequestT|CreateRouterRequestT|CreateWebRtcServerRequestT|CreateWebRtcTransportRequestT|EnableTraceEventRequestT|SetMaxIncomingBitrateRequestT|SetMaxOutgoingBitrateRequestT|UpdateSettingsRequestT|null = null
){}


pack(builder:flatbuffers.Builder): flatbuffers.Offset {
  const handlerId = (this.handlerId !== null ? builder.createString(this.handlerId!) : 0);
  const body = builder.createObjectOffset(this.body);

  return Request.createRequest(builder,
    this.id,
    this.method,
    handlerId,
    this.bodyType,
    body
  );
}
}