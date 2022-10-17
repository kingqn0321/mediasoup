// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';



export class RtcpParameters {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
__init(i:number, bb:flatbuffers.ByteBuffer):RtcpParameters {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsRtcpParameters(bb:flatbuffers.ByteBuffer, obj?:RtcpParameters):RtcpParameters {
  return (obj || new RtcpParameters()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsRtcpParameters(bb:flatbuffers.ByteBuffer, obj?:RtcpParameters):RtcpParameters {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new RtcpParameters()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

cname():string|null
cname(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
cname(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

reducedSize():boolean {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? !!this.bb!.readInt8(this.bb_pos + offset) : true;
}

mux():boolean {
  const offset = this.bb!.__offset(this.bb_pos, 8);
  return offset ? !!this.bb!.readInt8(this.bb_pos + offset) : true;
}

static startRtcpParameters(builder:flatbuffers.Builder) {
  builder.startObject(3);
}

static addCname(builder:flatbuffers.Builder, cnameOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, cnameOffset, 0);
}

static addReducedSize(builder:flatbuffers.Builder, reducedSize:boolean) {
  builder.addFieldInt8(1, +reducedSize, +true);
}

static addMux(builder:flatbuffers.Builder, mux:boolean) {
  builder.addFieldInt8(2, +mux, +true);
}

static endRtcpParameters(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createRtcpParameters(builder:flatbuffers.Builder, cnameOffset:flatbuffers.Offset, reducedSize:boolean, mux:boolean):flatbuffers.Offset {
  RtcpParameters.startRtcpParameters(builder);
  RtcpParameters.addCname(builder, cnameOffset);
  RtcpParameters.addReducedSize(builder, reducedSize);
  RtcpParameters.addMux(builder, mux);
  return RtcpParameters.endRtcpParameters(builder);
}

unpack(): RtcpParametersT {
  return new RtcpParametersT(
    this.cname(),
    this.reducedSize(),
    this.mux()
  );
}


unpackTo(_o: RtcpParametersT): void {
  _o.cname = this.cname();
  _o.reducedSize = this.reducedSize();
  _o.mux = this.mux();
}
}

export class RtcpParametersT {
constructor(
  public cname: string|Uint8Array|null = null,
  public reducedSize: boolean = true,
  public mux: boolean = true
){}


pack(builder:flatbuffers.Builder): flatbuffers.Offset {
  const cname = (this.cname !== null ? builder.createString(this.cname!) : 0);

  return RtcpParameters.createRtcpParameters(builder,
    cname,
    this.reducedSize,
    this.mux
  );
}
}