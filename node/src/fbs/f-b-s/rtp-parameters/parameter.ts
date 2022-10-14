// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

import { Value, unionToValue, unionListToValue } from '../../f-b-s/rtp-parameters/value';


export class Parameter {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
__init(i:number, bb:flatbuffers.ByteBuffer):Parameter {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsParameter(bb:flatbuffers.ByteBuffer, obj?:Parameter):Parameter {
  return (obj || new Parameter()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsParameter(bb:flatbuffers.ByteBuffer, obj?:Parameter):Parameter {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new Parameter()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

name():string|null
name(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
name(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

valueType():Value {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.readUint8(this.bb_pos + offset) : Value.NONE;
}

value<T extends flatbuffers.Table>(obj:any):any|null {
  const offset = this.bb!.__offset(this.bb_pos, 8);
  return offset ? this.bb!.__union(obj, this.bb_pos + offset) : null;
}

static startParameter(builder:flatbuffers.Builder) {
  builder.startObject(3);
}

static addName(builder:flatbuffers.Builder, nameOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, nameOffset, 0);
}

static addValueType(builder:flatbuffers.Builder, valueType:Value) {
  builder.addFieldInt8(1, valueType, Value.NONE);
}

static addValue(builder:flatbuffers.Builder, valueOffset:flatbuffers.Offset) {
  builder.addFieldOffset(2, valueOffset, 0);
}

static endParameter(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createParameter(builder:flatbuffers.Builder, nameOffset:flatbuffers.Offset, valueType:Value, valueOffset:flatbuffers.Offset):flatbuffers.Offset {
  Parameter.startParameter(builder);
  Parameter.addName(builder, nameOffset);
  Parameter.addValueType(builder, valueType);
  Parameter.addValue(builder, valueOffset);
  return Parameter.endParameter(builder);
}
}
