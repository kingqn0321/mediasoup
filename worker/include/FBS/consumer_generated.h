// automatically generated by the FlatBuffers compiler, do not modify


#ifndef FLATBUFFERS_GENERATED_CONSUMER_FBS_CONSUMER_H_
#define FLATBUFFERS_GENERATED_CONSUMER_FBS_CONSUMER_H_

#include "flatbuffers/flatbuffers.h"

namespace FBS {
namespace Consumer {

struct ConsumerLayers;

inline const flatbuffers::TypeTable *ConsumerLayersTypeTable();

FLATBUFFERS_MANUALLY_ALIGNED_STRUCT(1) ConsumerLayers FLATBUFFERS_FINAL_CLASS {
 private:
  uint8_t spatial_layer_;
  uint8_t temporal_layer_;

 public:
  static const flatbuffers::TypeTable *MiniReflectTypeTable() {
    return ConsumerLayersTypeTable();
  }
  ConsumerLayers()
      : spatial_layer_(0),
        temporal_layer_(0) {
  }
  ConsumerLayers(uint8_t _spatial_layer, uint8_t _temporal_layer)
      : spatial_layer_(flatbuffers::EndianScalar(_spatial_layer)),
        temporal_layer_(flatbuffers::EndianScalar(_temporal_layer)) {
  }
  uint8_t spatial_layer() const {
    return flatbuffers::EndianScalar(spatial_layer_);
  }
  uint8_t temporal_layer() const {
    return flatbuffers::EndianScalar(temporal_layer_);
  }
};
FLATBUFFERS_STRUCT_END(ConsumerLayers, 2);

inline const flatbuffers::TypeTable *ConsumerLayersTypeTable() {
  static const flatbuffers::TypeCode type_codes[] = {
    { flatbuffers::ET_UCHAR, 0, -1 },
    { flatbuffers::ET_UCHAR, 0, -1 }
  };
  static const int64_t values[] = { 0, 1, 2 };
  static const char * const names[] = {
    "spatial_layer",
    "temporal_layer"
  };
  static const flatbuffers::TypeTable tt = {
    flatbuffers::ST_STRUCT, 2, type_codes, nullptr, nullptr, values, names
  };
  return &tt;
}

}  // namespace Consumer
}  // namespace FBS

#endif  // FLATBUFFERS_GENERATED_CONSUMER_FBS_CONSUMER_H_
