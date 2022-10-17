// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';



export class ConsumerLayers {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
__init(i:number, bb:flatbuffers.ByteBuffer):ConsumerLayers {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsConsumerLayers(bb:flatbuffers.ByteBuffer, obj?:ConsumerLayers):ConsumerLayers {
  return (obj || new ConsumerLayers()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsConsumerLayers(bb:flatbuffers.ByteBuffer, obj?:ConsumerLayers):ConsumerLayers {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new ConsumerLayers()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

spatialLayer():number {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.readUint8(this.bb_pos + offset) : 0;
}

temporalLayer():number {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.readUint8(this.bb_pos + offset) : 0;
}

static startConsumerLayers(builder:flatbuffers.Builder) {
  builder.startObject(2);
}

static addSpatialLayer(builder:flatbuffers.Builder, spatialLayer:number) {
  builder.addFieldInt8(0, spatialLayer, 0);
}

static addTemporalLayer(builder:flatbuffers.Builder, temporalLayer:number) {
  builder.addFieldInt8(1, temporalLayer, 0);
}

static endConsumerLayers(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static finishConsumerLayersBuffer(builder:flatbuffers.Builder, offset:flatbuffers.Offset) {
  builder.finish(offset);
}

static finishSizePrefixedConsumerLayersBuffer(builder:flatbuffers.Builder, offset:flatbuffers.Offset) {
  builder.finish(offset, undefined, true);
}

static createConsumerLayers(builder:flatbuffers.Builder, spatialLayer:number, temporalLayer:number):flatbuffers.Offset {
  ConsumerLayers.startConsumerLayers(builder);
  ConsumerLayers.addSpatialLayer(builder, spatialLayer);
  ConsumerLayers.addTemporalLayer(builder, temporalLayer);
  return ConsumerLayers.endConsumerLayers(builder);
}

unpack(): ConsumerLayersT {
  return new ConsumerLayersT(
    this.spatialLayer(),
    this.temporalLayer()
  );
}


unpackTo(_o: ConsumerLayersT): void {
  _o.spatialLayer = this.spatialLayer();
  _o.temporalLayer = this.temporalLayer();
}
}

export class ConsumerLayersT {
constructor(
  public spatialLayer: number = 0,
  public temporalLayer: number = 0
){}


pack(builder:flatbuffers.Builder): flatbuffers.Offset {
  return ConsumerLayers.createConsumerLayers(builder,
    this.spatialLayer,
    this.temporalLayer
  );
}
}