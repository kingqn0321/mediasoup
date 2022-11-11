// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';



export class StringStringArray {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):StringStringArray {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsStringStringArray(bb:flatbuffers.ByteBuffer, obj?:StringStringArray):StringStringArray {
  return (obj || new StringStringArray()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsStringStringArray(bb:flatbuffers.ByteBuffer, obj?:StringStringArray):StringStringArray {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new StringStringArray()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

key():string|null
key(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
key(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

values(index: number):string
values(index: number,optionalEncoding:flatbuffers.Encoding):string|Uint8Array
values(index: number,optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.__string(this.bb!.__vector(this.bb_pos + offset) + index * 4, optionalEncoding) : null;
}

valuesLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

static startStringStringArray(builder:flatbuffers.Builder) {
  builder.startObject(2);
}

static addKey(builder:flatbuffers.Builder, keyOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, keyOffset, 0);
}

static addValues(builder:flatbuffers.Builder, valuesOffset:flatbuffers.Offset) {
  builder.addFieldOffset(1, valuesOffset, 0);
}

static createValuesVector(builder:flatbuffers.Builder, data:flatbuffers.Offset[]):flatbuffers.Offset {
  builder.startVector(4, data.length, 4);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]!);
  }
  return builder.endVector();
}

static startValuesVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
}

static endStringStringArray(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  builder.requiredField(offset, 4) // key
  return offset;
}

static createStringStringArray(builder:flatbuffers.Builder, keyOffset:flatbuffers.Offset, valuesOffset:flatbuffers.Offset):flatbuffers.Offset {
  StringStringArray.startStringStringArray(builder);
  StringStringArray.addKey(builder, keyOffset);
  StringStringArray.addValues(builder, valuesOffset);
  return StringStringArray.endStringStringArray(builder);
}

unpack(): StringStringArrayT {
  return new StringStringArrayT(
    this.key(),
    this.bb!.createScalarList(this.values.bind(this), this.valuesLength())
  );
}


unpackTo(_o: StringStringArrayT): void {
  _o.key = this.key();
  _o.values = this.bb!.createScalarList(this.values.bind(this), this.valuesLength());
}
}

export class StringStringArrayT {
constructor(
  public key: string|Uint8Array|null = null,
  public values: (string)[] = []
){}


pack(builder:flatbuffers.Builder): flatbuffers.Offset {
  const key = (this.key !== null ? builder.createString(this.key!) : 0);
  const values = StringStringArray.createValuesVector(builder, builder.createObjectOffsetList(this.values));

  return StringStringArray.createStringStringArray(builder,
    key,
    values
  );
}
}