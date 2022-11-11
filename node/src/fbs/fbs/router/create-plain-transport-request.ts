// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

import { PlainTransportOptions, PlainTransportOptionsT } from '../../fbs/plain-transport/plain-transport-options';


export class CreatePlainTransportRequest {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):CreatePlainTransportRequest {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsCreatePlainTransportRequest(bb:flatbuffers.ByteBuffer, obj?:CreatePlainTransportRequest):CreatePlainTransportRequest {
  return (obj || new CreatePlainTransportRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsCreatePlainTransportRequest(bb:flatbuffers.ByteBuffer, obj?:CreatePlainTransportRequest):CreatePlainTransportRequest {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new CreatePlainTransportRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

transportId():string|null
transportId(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
transportId(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

options(obj?:PlainTransportOptions):PlainTransportOptions|null {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? (obj || new PlainTransportOptions()).__init(this.bb!.__indirect(this.bb_pos + offset), this.bb!) : null;
}

static startCreatePlainTransportRequest(builder:flatbuffers.Builder) {
  builder.startObject(2);
}

static addTransportId(builder:flatbuffers.Builder, transportIdOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, transportIdOffset, 0);
}

static addOptions(builder:flatbuffers.Builder, optionsOffset:flatbuffers.Offset) {
  builder.addFieldOffset(1, optionsOffset, 0);
}

static endCreatePlainTransportRequest(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  builder.requiredField(offset, 4) // transport_id
  builder.requiredField(offset, 6) // options
  return offset;
}


unpack(): CreatePlainTransportRequestT {
  return new CreatePlainTransportRequestT(
    this.transportId(),
    (this.options() !== null ? this.options()!.unpack() : null)
  );
}


unpackTo(_o: CreatePlainTransportRequestT): void {
  _o.transportId = this.transportId();
  _o.options = (this.options() !== null ? this.options()!.unpack() : null);
}
}

export class CreatePlainTransportRequestT {
constructor(
  public transportId: string|Uint8Array|null = null,
  public options: PlainTransportOptionsT|null = null
){}


pack(builder:flatbuffers.Builder): flatbuffers.Offset {
  const transportId = (this.transportId !== null ? builder.createString(this.transportId!) : 0);
  const options = (this.options !== null ? this.options!.pack(builder) : 0);

  CreatePlainTransportRequest.startCreatePlainTransportRequest(builder);
  CreatePlainTransportRequest.addTransportId(builder, transportId);
  CreatePlainTransportRequest.addOptions(builder, options);

  return CreatePlainTransportRequest.endCreatePlainTransportRequest(builder);
}
}