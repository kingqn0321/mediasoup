// automatically generated by the FlatBuffers compiler, do not modify


#ifndef FLATBUFFERS_GENERATED_RTPOBSERVER_FBS_RTPOBSERVER_H_
#define FLATBUFFERS_GENERATED_RTPOBSERVER_FBS_RTPOBSERVER_H_

#include "flatbuffers/flatbuffers.h"

// Ensure the included flatbuffers.h is the same version as when this file was
// generated, otherwise it may not be compatible.
static_assert(FLATBUFFERS_VERSION_MAJOR == 2 &&
              FLATBUFFERS_VERSION_MINOR == 0 &&
              FLATBUFFERS_VERSION_REVISION == 8,
             "Non-compatible flatbuffers version included");

namespace FBS {
namespace RtpObserver {

struct AddProducerRequest;
struct AddProducerRequestBuilder;

struct RemoveProducerRequest;
struct RemoveProducerRequestBuilder;

inline const flatbuffers::TypeTable *AddProducerRequestTypeTable();

inline const flatbuffers::TypeTable *RemoveProducerRequestTypeTable();

struct AddProducerRequest FLATBUFFERS_FINAL_CLASS : private flatbuffers::Table {
  typedef AddProducerRequestBuilder Builder;
  static const flatbuffers::TypeTable *MiniReflectTypeTable() {
    return AddProducerRequestTypeTable();
  }
  enum FlatBuffersVTableOffset FLATBUFFERS_VTABLE_UNDERLYING_TYPE {
    VT_PRODUCERID = 4
  };
  const flatbuffers::String *producerId() const {
    return GetPointer<const flatbuffers::String *>(VT_PRODUCERID);
  }
  bool Verify(flatbuffers::Verifier &verifier) const {
    return VerifyTableStart(verifier) &&
           VerifyOffsetRequired(verifier, VT_PRODUCERID) &&
           verifier.VerifyString(producerId()) &&
           verifier.EndTable();
  }
};

struct AddProducerRequestBuilder {
  typedef AddProducerRequest Table;
  flatbuffers::FlatBufferBuilder &fbb_;
  flatbuffers::uoffset_t start_;
  void add_producerId(flatbuffers::Offset<flatbuffers::String> producerId) {
    fbb_.AddOffset(AddProducerRequest::VT_PRODUCERID, producerId);
  }
  explicit AddProducerRequestBuilder(flatbuffers::FlatBufferBuilder &_fbb)
        : fbb_(_fbb) {
    start_ = fbb_.StartTable();
  }
  flatbuffers::Offset<AddProducerRequest> Finish() {
    const auto end = fbb_.EndTable(start_);
    auto o = flatbuffers::Offset<AddProducerRequest>(end);
    fbb_.Required(o, AddProducerRequest::VT_PRODUCERID);
    return o;
  }
};

inline flatbuffers::Offset<AddProducerRequest> CreateAddProducerRequest(
    flatbuffers::FlatBufferBuilder &_fbb,
    flatbuffers::Offset<flatbuffers::String> producerId = 0) {
  AddProducerRequestBuilder builder_(_fbb);
  builder_.add_producerId(producerId);
  return builder_.Finish();
}

inline flatbuffers::Offset<AddProducerRequest> CreateAddProducerRequestDirect(
    flatbuffers::FlatBufferBuilder &_fbb,
    const char *producerId = nullptr) {
  auto producerId__ = producerId ? _fbb.CreateString(producerId) : 0;
  return FBS::RtpObserver::CreateAddProducerRequest(
      _fbb,
      producerId__);
}

struct RemoveProducerRequest FLATBUFFERS_FINAL_CLASS : private flatbuffers::Table {
  typedef RemoveProducerRequestBuilder Builder;
  static const flatbuffers::TypeTable *MiniReflectTypeTable() {
    return RemoveProducerRequestTypeTable();
  }
  enum FlatBuffersVTableOffset FLATBUFFERS_VTABLE_UNDERLYING_TYPE {
    VT_PRODUCERID = 4
  };
  const flatbuffers::String *producerId() const {
    return GetPointer<const flatbuffers::String *>(VT_PRODUCERID);
  }
  bool Verify(flatbuffers::Verifier &verifier) const {
    return VerifyTableStart(verifier) &&
           VerifyOffsetRequired(verifier, VT_PRODUCERID) &&
           verifier.VerifyString(producerId()) &&
           verifier.EndTable();
  }
};

struct RemoveProducerRequestBuilder {
  typedef RemoveProducerRequest Table;
  flatbuffers::FlatBufferBuilder &fbb_;
  flatbuffers::uoffset_t start_;
  void add_producerId(flatbuffers::Offset<flatbuffers::String> producerId) {
    fbb_.AddOffset(RemoveProducerRequest::VT_PRODUCERID, producerId);
  }
  explicit RemoveProducerRequestBuilder(flatbuffers::FlatBufferBuilder &_fbb)
        : fbb_(_fbb) {
    start_ = fbb_.StartTable();
  }
  flatbuffers::Offset<RemoveProducerRequest> Finish() {
    const auto end = fbb_.EndTable(start_);
    auto o = flatbuffers::Offset<RemoveProducerRequest>(end);
    fbb_.Required(o, RemoveProducerRequest::VT_PRODUCERID);
    return o;
  }
};

inline flatbuffers::Offset<RemoveProducerRequest> CreateRemoveProducerRequest(
    flatbuffers::FlatBufferBuilder &_fbb,
    flatbuffers::Offset<flatbuffers::String> producerId = 0) {
  RemoveProducerRequestBuilder builder_(_fbb);
  builder_.add_producerId(producerId);
  return builder_.Finish();
}

inline flatbuffers::Offset<RemoveProducerRequest> CreateRemoveProducerRequestDirect(
    flatbuffers::FlatBufferBuilder &_fbb,
    const char *producerId = nullptr) {
  auto producerId__ = producerId ? _fbb.CreateString(producerId) : 0;
  return FBS::RtpObserver::CreateRemoveProducerRequest(
      _fbb,
      producerId__);
}

inline const flatbuffers::TypeTable *AddProducerRequestTypeTable() {
  static const flatbuffers::TypeCode type_codes[] = {
    { flatbuffers::ET_STRING, 0, -1 }
  };
  static const char * const names[] = {
    "producerId"
  };
  static const flatbuffers::TypeTable tt = {
    flatbuffers::ST_TABLE, 1, type_codes, nullptr, nullptr, nullptr, names
  };
  return &tt;
}

inline const flatbuffers::TypeTable *RemoveProducerRequestTypeTable() {
  static const flatbuffers::TypeCode type_codes[] = {
    { flatbuffers::ET_STRING, 0, -1 }
  };
  static const char * const names[] = {
    "producerId"
  };
  static const flatbuffers::TypeTable tt = {
    flatbuffers::ST_TABLE, 1, type_codes, nullptr, nullptr, nullptr, names
  };
  return &tt;
}

}  // namespace RtpObserver
}  // namespace FBS

#endif  // FLATBUFFERS_GENERATED_RTPOBSERVER_FBS_RTPOBSERVER_H_