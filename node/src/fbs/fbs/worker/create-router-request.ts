// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';



export class CreateRouterRequest {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):CreateRouterRequest {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsCreateRouterRequest(bb:flatbuffers.ByteBuffer, obj?:CreateRouterRequest):CreateRouterRequest {
  return (obj || new CreateRouterRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsCreateRouterRequest(bb:flatbuffers.ByteBuffer, obj?:CreateRouterRequest):CreateRouterRequest {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new CreateRouterRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

routerId():string|null
routerId(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
routerId(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

static startCreateRouterRequest(builder:flatbuffers.Builder) {
  builder.startObject(1);
}

static addRouterId(builder:flatbuffers.Builder, routerIdOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, routerIdOffset, 0);
}

static endCreateRouterRequest(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  builder.requiredField(offset, 4) // router_id
  return offset;
}

static createCreateRouterRequest(builder:flatbuffers.Builder, routerIdOffset:flatbuffers.Offset):flatbuffers.Offset {
  CreateRouterRequest.startCreateRouterRequest(builder);
  CreateRouterRequest.addRouterId(builder, routerIdOffset);
  return CreateRouterRequest.endCreateRouterRequest(builder);
}

unpack(): CreateRouterRequestT {
  return new CreateRouterRequestT(
    this.routerId()
  );
}


unpackTo(_o: CreateRouterRequestT): void {
  _o.routerId = this.routerId();
}
}

export class CreateRouterRequestT {
constructor(
  public routerId: string|Uint8Array|null = null
){}


pack(builder:flatbuffers.Builder): flatbuffers.Offset {
  const routerId = (this.routerId !== null ? builder.createString(this.routerId!) : 0);

  return CreateRouterRequest.createCreateRouterRequest(builder,
    routerId
  );
}
}