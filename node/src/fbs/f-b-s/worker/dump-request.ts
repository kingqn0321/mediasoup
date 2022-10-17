// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';



export class DumpRequest {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
__init(i:number, bb:flatbuffers.ByteBuffer):DumpRequest {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsDumpRequest(bb:flatbuffers.ByteBuffer, obj?:DumpRequest):DumpRequest {
  return (obj || new DumpRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsDumpRequest(bb:flatbuffers.ByteBuffer, obj?:DumpRequest):DumpRequest {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new DumpRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static startDumpRequest(builder:flatbuffers.Builder) {
  builder.startObject(0);
}

static endDumpRequest(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createDumpRequest(builder:flatbuffers.Builder):flatbuffers.Offset {
  DumpRequest.startDumpRequest(builder);
  return DumpRequest.endDumpRequest(builder);
}

unpack(): DumpRequestT {
  return new DumpRequestT();
}


unpackTo(_o: DumpRequestT): void {}
}

export class DumpRequestT {
constructor(){}


pack(builder:flatbuffers.Builder): flatbuffers.Offset {
  return DumpRequest.createDumpRequest(builder);
}
}