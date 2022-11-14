// automatically generated by the FlatBuffers compiler, do not modify


#ifndef FLATBUFFERS_GENERATED_WORKER_FBS_WORKER_H_
#define FLATBUFFERS_GENERATED_WORKER_FBS_WORKER_H_

#include "flatbuffers/flatbuffers.h"

// Ensure the included flatbuffers.h is the same version as when this file was
// generated, otherwise it may not be compatible.
static_assert(FLATBUFFERS_VERSION_MAJOR == 2 &&
              FLATBUFFERS_VERSION_MINOR == 0 &&
              FLATBUFFERS_VERSION_REVISION == 8,
             "Non-compatible flatbuffers version included");

#include "webRtcServer_generated.h"

namespace FBS {
namespace Worker {

struct ChannelMessageHandlers;
struct ChannelMessageHandlersBuilder;

struct DumpResponse;
struct DumpResponseBuilder;

struct ResourceUsageResponse;
struct ResourceUsageResponseBuilder;

struct UpdateSettingsRequest;
struct UpdateSettingsRequestBuilder;

struct CreateWebRtcServerRequest;
struct CreateWebRtcServerRequestBuilder;

struct CloseWebRtcServerRequest;
struct CloseWebRtcServerRequestBuilder;

struct CreateRouterRequest;
struct CreateRouterRequestBuilder;

struct CloseRouterRequest;
struct CloseRouterRequestBuilder;

inline const flatbuffers::TypeTable *ChannelMessageHandlersTypeTable();

inline const flatbuffers::TypeTable *DumpResponseTypeTable();

inline const flatbuffers::TypeTable *ResourceUsageResponseTypeTable();

inline const flatbuffers::TypeTable *UpdateSettingsRequestTypeTable();

inline const flatbuffers::TypeTable *CreateWebRtcServerRequestTypeTable();

inline const flatbuffers::TypeTable *CloseWebRtcServerRequestTypeTable();

inline const flatbuffers::TypeTable *CreateRouterRequestTypeTable();

inline const flatbuffers::TypeTable *CloseRouterRequestTypeTable();

struct ChannelMessageHandlers FLATBUFFERS_FINAL_CLASS : private flatbuffers::Table {
  typedef ChannelMessageHandlersBuilder Builder;
  static const flatbuffers::TypeTable *MiniReflectTypeTable() {
    return ChannelMessageHandlersTypeTable();
  }
  enum FlatBuffersVTableOffset FLATBUFFERS_VTABLE_UNDERLYING_TYPE {
    VT_CHANNELREQUESTHANDLERS = 4,
    VT_PAYLOADCHANNELREQUESTHANDLERS = 6,
    VT_PAYLOADCHANNELNOTIFICATIONHANDLERS = 8
  };
  const flatbuffers::Vector<flatbuffers::Offset<flatbuffers::String>> *channelRequestHandlers() const {
    return GetPointer<const flatbuffers::Vector<flatbuffers::Offset<flatbuffers::String>> *>(VT_CHANNELREQUESTHANDLERS);
  }
  const flatbuffers::Vector<flatbuffers::Offset<flatbuffers::String>> *payloadChannelRequestHandlers() const {
    return GetPointer<const flatbuffers::Vector<flatbuffers::Offset<flatbuffers::String>> *>(VT_PAYLOADCHANNELREQUESTHANDLERS);
  }
  const flatbuffers::Vector<flatbuffers::Offset<flatbuffers::String>> *payloadChannelNotificationHandlers() const {
    return GetPointer<const flatbuffers::Vector<flatbuffers::Offset<flatbuffers::String>> *>(VT_PAYLOADCHANNELNOTIFICATIONHANDLERS);
  }
  bool Verify(flatbuffers::Verifier &verifier) const {
    return VerifyTableStart(verifier) &&
           VerifyOffset(verifier, VT_CHANNELREQUESTHANDLERS) &&
           verifier.VerifyVector(channelRequestHandlers()) &&
           verifier.VerifyVectorOfStrings(channelRequestHandlers()) &&
           VerifyOffset(verifier, VT_PAYLOADCHANNELREQUESTHANDLERS) &&
           verifier.VerifyVector(payloadChannelRequestHandlers()) &&
           verifier.VerifyVectorOfStrings(payloadChannelRequestHandlers()) &&
           VerifyOffset(verifier, VT_PAYLOADCHANNELNOTIFICATIONHANDLERS) &&
           verifier.VerifyVector(payloadChannelNotificationHandlers()) &&
           verifier.VerifyVectorOfStrings(payloadChannelNotificationHandlers()) &&
           verifier.EndTable();
  }
};

struct ChannelMessageHandlersBuilder {
  typedef ChannelMessageHandlers Table;
  flatbuffers::FlatBufferBuilder &fbb_;
  flatbuffers::uoffset_t start_;
  void add_channelRequestHandlers(flatbuffers::Offset<flatbuffers::Vector<flatbuffers::Offset<flatbuffers::String>>> channelRequestHandlers) {
    fbb_.AddOffset(ChannelMessageHandlers::VT_CHANNELREQUESTHANDLERS, channelRequestHandlers);
  }
  void add_payloadChannelRequestHandlers(flatbuffers::Offset<flatbuffers::Vector<flatbuffers::Offset<flatbuffers::String>>> payloadChannelRequestHandlers) {
    fbb_.AddOffset(ChannelMessageHandlers::VT_PAYLOADCHANNELREQUESTHANDLERS, payloadChannelRequestHandlers);
  }
  void add_payloadChannelNotificationHandlers(flatbuffers::Offset<flatbuffers::Vector<flatbuffers::Offset<flatbuffers::String>>> payloadChannelNotificationHandlers) {
    fbb_.AddOffset(ChannelMessageHandlers::VT_PAYLOADCHANNELNOTIFICATIONHANDLERS, payloadChannelNotificationHandlers);
  }
  explicit ChannelMessageHandlersBuilder(flatbuffers::FlatBufferBuilder &_fbb)
        : fbb_(_fbb) {
    start_ = fbb_.StartTable();
  }
  flatbuffers::Offset<ChannelMessageHandlers> Finish() {
    const auto end = fbb_.EndTable(start_);
    auto o = flatbuffers::Offset<ChannelMessageHandlers>(end);
    return o;
  }
};

inline flatbuffers::Offset<ChannelMessageHandlers> CreateChannelMessageHandlers(
    flatbuffers::FlatBufferBuilder &_fbb,
    flatbuffers::Offset<flatbuffers::Vector<flatbuffers::Offset<flatbuffers::String>>> channelRequestHandlers = 0,
    flatbuffers::Offset<flatbuffers::Vector<flatbuffers::Offset<flatbuffers::String>>> payloadChannelRequestHandlers = 0,
    flatbuffers::Offset<flatbuffers::Vector<flatbuffers::Offset<flatbuffers::String>>> payloadChannelNotificationHandlers = 0) {
  ChannelMessageHandlersBuilder builder_(_fbb);
  builder_.add_payloadChannelNotificationHandlers(payloadChannelNotificationHandlers);
  builder_.add_payloadChannelRequestHandlers(payloadChannelRequestHandlers);
  builder_.add_channelRequestHandlers(channelRequestHandlers);
  return builder_.Finish();
}

inline flatbuffers::Offset<ChannelMessageHandlers> CreateChannelMessageHandlersDirect(
    flatbuffers::FlatBufferBuilder &_fbb,
    const std::vector<flatbuffers::Offset<flatbuffers::String>> *channelRequestHandlers = nullptr,
    const std::vector<flatbuffers::Offset<flatbuffers::String>> *payloadChannelRequestHandlers = nullptr,
    const std::vector<flatbuffers::Offset<flatbuffers::String>> *payloadChannelNotificationHandlers = nullptr) {
  auto channelRequestHandlers__ = channelRequestHandlers ? _fbb.CreateVector<flatbuffers::Offset<flatbuffers::String>>(*channelRequestHandlers) : 0;
  auto payloadChannelRequestHandlers__ = payloadChannelRequestHandlers ? _fbb.CreateVector<flatbuffers::Offset<flatbuffers::String>>(*payloadChannelRequestHandlers) : 0;
  auto payloadChannelNotificationHandlers__ = payloadChannelNotificationHandlers ? _fbb.CreateVector<flatbuffers::Offset<flatbuffers::String>>(*payloadChannelNotificationHandlers) : 0;
  return FBS::Worker::CreateChannelMessageHandlers(
      _fbb,
      channelRequestHandlers__,
      payloadChannelRequestHandlers__,
      payloadChannelNotificationHandlers__);
}

struct DumpResponse FLATBUFFERS_FINAL_CLASS : private flatbuffers::Table {
  typedef DumpResponseBuilder Builder;
  static const flatbuffers::TypeTable *MiniReflectTypeTable() {
    return DumpResponseTypeTable();
  }
  enum FlatBuffersVTableOffset FLATBUFFERS_VTABLE_UNDERLYING_TYPE {
    VT_PID = 4,
    VT_WEBRTCSERVERIDS = 6,
    VT_ROUTERIDS = 8,
    VT_CHANNELMESSAGEHANDLERS = 10
  };
  uint32_t pid() const {
    return GetField<uint32_t>(VT_PID, 0);
  }
  const flatbuffers::Vector<flatbuffers::Offset<flatbuffers::String>> *webRtcServerIds() const {
    return GetPointer<const flatbuffers::Vector<flatbuffers::Offset<flatbuffers::String>> *>(VT_WEBRTCSERVERIDS);
  }
  const flatbuffers::Vector<flatbuffers::Offset<flatbuffers::String>> *routerIds() const {
    return GetPointer<const flatbuffers::Vector<flatbuffers::Offset<flatbuffers::String>> *>(VT_ROUTERIDS);
  }
  const FBS::Worker::ChannelMessageHandlers *channelMessageHandlers() const {
    return GetPointer<const FBS::Worker::ChannelMessageHandlers *>(VT_CHANNELMESSAGEHANDLERS);
  }
  bool Verify(flatbuffers::Verifier &verifier) const {
    return VerifyTableStart(verifier) &&
           VerifyField<uint32_t>(verifier, VT_PID, 4) &&
           VerifyOffset(verifier, VT_WEBRTCSERVERIDS) &&
           verifier.VerifyVector(webRtcServerIds()) &&
           verifier.VerifyVectorOfStrings(webRtcServerIds()) &&
           VerifyOffset(verifier, VT_ROUTERIDS) &&
           verifier.VerifyVector(routerIds()) &&
           verifier.VerifyVectorOfStrings(routerIds()) &&
           VerifyOffset(verifier, VT_CHANNELMESSAGEHANDLERS) &&
           verifier.VerifyTable(channelMessageHandlers()) &&
           verifier.EndTable();
  }
};

struct DumpResponseBuilder {
  typedef DumpResponse Table;
  flatbuffers::FlatBufferBuilder &fbb_;
  flatbuffers::uoffset_t start_;
  void add_pid(uint32_t pid) {
    fbb_.AddElement<uint32_t>(DumpResponse::VT_PID, pid, 0);
  }
  void add_webRtcServerIds(flatbuffers::Offset<flatbuffers::Vector<flatbuffers::Offset<flatbuffers::String>>> webRtcServerIds) {
    fbb_.AddOffset(DumpResponse::VT_WEBRTCSERVERIDS, webRtcServerIds);
  }
  void add_routerIds(flatbuffers::Offset<flatbuffers::Vector<flatbuffers::Offset<flatbuffers::String>>> routerIds) {
    fbb_.AddOffset(DumpResponse::VT_ROUTERIDS, routerIds);
  }
  void add_channelMessageHandlers(flatbuffers::Offset<FBS::Worker::ChannelMessageHandlers> channelMessageHandlers) {
    fbb_.AddOffset(DumpResponse::VT_CHANNELMESSAGEHANDLERS, channelMessageHandlers);
  }
  explicit DumpResponseBuilder(flatbuffers::FlatBufferBuilder &_fbb)
        : fbb_(_fbb) {
    start_ = fbb_.StartTable();
  }
  flatbuffers::Offset<DumpResponse> Finish() {
    const auto end = fbb_.EndTable(start_);
    auto o = flatbuffers::Offset<DumpResponse>(end);
    return o;
  }
};

inline flatbuffers::Offset<DumpResponse> CreateDumpResponse(
    flatbuffers::FlatBufferBuilder &_fbb,
    uint32_t pid = 0,
    flatbuffers::Offset<flatbuffers::Vector<flatbuffers::Offset<flatbuffers::String>>> webRtcServerIds = 0,
    flatbuffers::Offset<flatbuffers::Vector<flatbuffers::Offset<flatbuffers::String>>> routerIds = 0,
    flatbuffers::Offset<FBS::Worker::ChannelMessageHandlers> channelMessageHandlers = 0) {
  DumpResponseBuilder builder_(_fbb);
  builder_.add_channelMessageHandlers(channelMessageHandlers);
  builder_.add_routerIds(routerIds);
  builder_.add_webRtcServerIds(webRtcServerIds);
  builder_.add_pid(pid);
  return builder_.Finish();
}

inline flatbuffers::Offset<DumpResponse> CreateDumpResponseDirect(
    flatbuffers::FlatBufferBuilder &_fbb,
    uint32_t pid = 0,
    const std::vector<flatbuffers::Offset<flatbuffers::String>> *webRtcServerIds = nullptr,
    const std::vector<flatbuffers::Offset<flatbuffers::String>> *routerIds = nullptr,
    flatbuffers::Offset<FBS::Worker::ChannelMessageHandlers> channelMessageHandlers = 0) {
  auto webRtcServerIds__ = webRtcServerIds ? _fbb.CreateVector<flatbuffers::Offset<flatbuffers::String>>(*webRtcServerIds) : 0;
  auto routerIds__ = routerIds ? _fbb.CreateVector<flatbuffers::Offset<flatbuffers::String>>(*routerIds) : 0;
  return FBS::Worker::CreateDumpResponse(
      _fbb,
      pid,
      webRtcServerIds__,
      routerIds__,
      channelMessageHandlers);
}

struct ResourceUsageResponse FLATBUFFERS_FINAL_CLASS : private flatbuffers::Table {
  typedef ResourceUsageResponseBuilder Builder;
  static const flatbuffers::TypeTable *MiniReflectTypeTable() {
    return ResourceUsageResponseTypeTable();
  }
  enum FlatBuffersVTableOffset FLATBUFFERS_VTABLE_UNDERLYING_TYPE {
    VT_RUUTIME = 4,
    VT_RUSTIME = 6,
    VT_RUMAXRSS = 8,
    VT_RUIXRSS = 10,
    VT_RUIDRSS = 12,
    VT_RUISRSS = 14,
    VT_RUMINFLT = 16,
    VT_RUMAJFLT = 18,
    VT_RUNSWAP = 20,
    VT_RUINBLOCK = 22,
    VT_RUOUBLOCK = 24,
    VT_RUMSGSND = 26,
    VT_RUMSGRCV = 28,
    VT_RUNSIGNALS = 30,
    VT_RUNVCSW = 32,
    VT_RUNIVCSW = 34
  };
  uint64_t ruUtime() const {
    return GetField<uint64_t>(VT_RUUTIME, 0);
  }
  uint64_t ruStime() const {
    return GetField<uint64_t>(VT_RUSTIME, 0);
  }
  uint64_t ruMaxrss() const {
    return GetField<uint64_t>(VT_RUMAXRSS, 0);
  }
  uint64_t ruIxrss() const {
    return GetField<uint64_t>(VT_RUIXRSS, 0);
  }
  uint64_t ruIdrss() const {
    return GetField<uint64_t>(VT_RUIDRSS, 0);
  }
  uint64_t ruIsrss() const {
    return GetField<uint64_t>(VT_RUISRSS, 0);
  }
  uint64_t ruMinflt() const {
    return GetField<uint64_t>(VT_RUMINFLT, 0);
  }
  uint64_t ruMajflt() const {
    return GetField<uint64_t>(VT_RUMAJFLT, 0);
  }
  uint64_t ruNswap() const {
    return GetField<uint64_t>(VT_RUNSWAP, 0);
  }
  uint64_t ruInblock() const {
    return GetField<uint64_t>(VT_RUINBLOCK, 0);
  }
  uint64_t ruOublock() const {
    return GetField<uint64_t>(VT_RUOUBLOCK, 0);
  }
  uint64_t ruMsgsnd() const {
    return GetField<uint64_t>(VT_RUMSGSND, 0);
  }
  uint64_t ruMsgrcv() const {
    return GetField<uint64_t>(VT_RUMSGRCV, 0);
  }
  uint64_t ruNsignals() const {
    return GetField<uint64_t>(VT_RUNSIGNALS, 0);
  }
  uint64_t ruNvcsw() const {
    return GetField<uint64_t>(VT_RUNVCSW, 0);
  }
  uint64_t ruNivcsw() const {
    return GetField<uint64_t>(VT_RUNIVCSW, 0);
  }
  bool Verify(flatbuffers::Verifier &verifier) const {
    return VerifyTableStart(verifier) &&
           VerifyField<uint64_t>(verifier, VT_RUUTIME, 8) &&
           VerifyField<uint64_t>(verifier, VT_RUSTIME, 8) &&
           VerifyField<uint64_t>(verifier, VT_RUMAXRSS, 8) &&
           VerifyField<uint64_t>(verifier, VT_RUIXRSS, 8) &&
           VerifyField<uint64_t>(verifier, VT_RUIDRSS, 8) &&
           VerifyField<uint64_t>(verifier, VT_RUISRSS, 8) &&
           VerifyField<uint64_t>(verifier, VT_RUMINFLT, 8) &&
           VerifyField<uint64_t>(verifier, VT_RUMAJFLT, 8) &&
           VerifyField<uint64_t>(verifier, VT_RUNSWAP, 8) &&
           VerifyField<uint64_t>(verifier, VT_RUINBLOCK, 8) &&
           VerifyField<uint64_t>(verifier, VT_RUOUBLOCK, 8) &&
           VerifyField<uint64_t>(verifier, VT_RUMSGSND, 8) &&
           VerifyField<uint64_t>(verifier, VT_RUMSGRCV, 8) &&
           VerifyField<uint64_t>(verifier, VT_RUNSIGNALS, 8) &&
           VerifyField<uint64_t>(verifier, VT_RUNVCSW, 8) &&
           VerifyField<uint64_t>(verifier, VT_RUNIVCSW, 8) &&
           verifier.EndTable();
  }
};

struct ResourceUsageResponseBuilder {
  typedef ResourceUsageResponse Table;
  flatbuffers::FlatBufferBuilder &fbb_;
  flatbuffers::uoffset_t start_;
  void add_ruUtime(uint64_t ruUtime) {
    fbb_.AddElement<uint64_t>(ResourceUsageResponse::VT_RUUTIME, ruUtime, 0);
  }
  void add_ruStime(uint64_t ruStime) {
    fbb_.AddElement<uint64_t>(ResourceUsageResponse::VT_RUSTIME, ruStime, 0);
  }
  void add_ruMaxrss(uint64_t ruMaxrss) {
    fbb_.AddElement<uint64_t>(ResourceUsageResponse::VT_RUMAXRSS, ruMaxrss, 0);
  }
  void add_ruIxrss(uint64_t ruIxrss) {
    fbb_.AddElement<uint64_t>(ResourceUsageResponse::VT_RUIXRSS, ruIxrss, 0);
  }
  void add_ruIdrss(uint64_t ruIdrss) {
    fbb_.AddElement<uint64_t>(ResourceUsageResponse::VT_RUIDRSS, ruIdrss, 0);
  }
  void add_ruIsrss(uint64_t ruIsrss) {
    fbb_.AddElement<uint64_t>(ResourceUsageResponse::VT_RUISRSS, ruIsrss, 0);
  }
  void add_ruMinflt(uint64_t ruMinflt) {
    fbb_.AddElement<uint64_t>(ResourceUsageResponse::VT_RUMINFLT, ruMinflt, 0);
  }
  void add_ruMajflt(uint64_t ruMajflt) {
    fbb_.AddElement<uint64_t>(ResourceUsageResponse::VT_RUMAJFLT, ruMajflt, 0);
  }
  void add_ruNswap(uint64_t ruNswap) {
    fbb_.AddElement<uint64_t>(ResourceUsageResponse::VT_RUNSWAP, ruNswap, 0);
  }
  void add_ruInblock(uint64_t ruInblock) {
    fbb_.AddElement<uint64_t>(ResourceUsageResponse::VT_RUINBLOCK, ruInblock, 0);
  }
  void add_ruOublock(uint64_t ruOublock) {
    fbb_.AddElement<uint64_t>(ResourceUsageResponse::VT_RUOUBLOCK, ruOublock, 0);
  }
  void add_ruMsgsnd(uint64_t ruMsgsnd) {
    fbb_.AddElement<uint64_t>(ResourceUsageResponse::VT_RUMSGSND, ruMsgsnd, 0);
  }
  void add_ruMsgrcv(uint64_t ruMsgrcv) {
    fbb_.AddElement<uint64_t>(ResourceUsageResponse::VT_RUMSGRCV, ruMsgrcv, 0);
  }
  void add_ruNsignals(uint64_t ruNsignals) {
    fbb_.AddElement<uint64_t>(ResourceUsageResponse::VT_RUNSIGNALS, ruNsignals, 0);
  }
  void add_ruNvcsw(uint64_t ruNvcsw) {
    fbb_.AddElement<uint64_t>(ResourceUsageResponse::VT_RUNVCSW, ruNvcsw, 0);
  }
  void add_ruNivcsw(uint64_t ruNivcsw) {
    fbb_.AddElement<uint64_t>(ResourceUsageResponse::VT_RUNIVCSW, ruNivcsw, 0);
  }
  explicit ResourceUsageResponseBuilder(flatbuffers::FlatBufferBuilder &_fbb)
        : fbb_(_fbb) {
    start_ = fbb_.StartTable();
  }
  flatbuffers::Offset<ResourceUsageResponse> Finish() {
    const auto end = fbb_.EndTable(start_);
    auto o = flatbuffers::Offset<ResourceUsageResponse>(end);
    return o;
  }
};

inline flatbuffers::Offset<ResourceUsageResponse> CreateResourceUsageResponse(
    flatbuffers::FlatBufferBuilder &_fbb,
    uint64_t ruUtime = 0,
    uint64_t ruStime = 0,
    uint64_t ruMaxrss = 0,
    uint64_t ruIxrss = 0,
    uint64_t ruIdrss = 0,
    uint64_t ruIsrss = 0,
    uint64_t ruMinflt = 0,
    uint64_t ruMajflt = 0,
    uint64_t ruNswap = 0,
    uint64_t ruInblock = 0,
    uint64_t ruOublock = 0,
    uint64_t ruMsgsnd = 0,
    uint64_t ruMsgrcv = 0,
    uint64_t ruNsignals = 0,
    uint64_t ruNvcsw = 0,
    uint64_t ruNivcsw = 0) {
  ResourceUsageResponseBuilder builder_(_fbb);
  builder_.add_ruNivcsw(ruNivcsw);
  builder_.add_ruNvcsw(ruNvcsw);
  builder_.add_ruNsignals(ruNsignals);
  builder_.add_ruMsgrcv(ruMsgrcv);
  builder_.add_ruMsgsnd(ruMsgsnd);
  builder_.add_ruOublock(ruOublock);
  builder_.add_ruInblock(ruInblock);
  builder_.add_ruNswap(ruNswap);
  builder_.add_ruMajflt(ruMajflt);
  builder_.add_ruMinflt(ruMinflt);
  builder_.add_ruIsrss(ruIsrss);
  builder_.add_ruIdrss(ruIdrss);
  builder_.add_ruIxrss(ruIxrss);
  builder_.add_ruMaxrss(ruMaxrss);
  builder_.add_ruStime(ruStime);
  builder_.add_ruUtime(ruUtime);
  return builder_.Finish();
}

struct UpdateSettingsRequest FLATBUFFERS_FINAL_CLASS : private flatbuffers::Table {
  typedef UpdateSettingsRequestBuilder Builder;
  static const flatbuffers::TypeTable *MiniReflectTypeTable() {
    return UpdateSettingsRequestTypeTable();
  }
  enum FlatBuffersVTableOffset FLATBUFFERS_VTABLE_UNDERLYING_TYPE {
    VT_LOGLEVEL = 4,
    VT_LOGTAGS = 6
  };
  const flatbuffers::String *logLevel() const {
    return GetPointer<const flatbuffers::String *>(VT_LOGLEVEL);
  }
  const flatbuffers::Vector<flatbuffers::Offset<flatbuffers::String>> *logTags() const {
    return GetPointer<const flatbuffers::Vector<flatbuffers::Offset<flatbuffers::String>> *>(VT_LOGTAGS);
  }
  bool Verify(flatbuffers::Verifier &verifier) const {
    return VerifyTableStart(verifier) &&
           VerifyOffset(verifier, VT_LOGLEVEL) &&
           verifier.VerifyString(logLevel()) &&
           VerifyOffset(verifier, VT_LOGTAGS) &&
           verifier.VerifyVector(logTags()) &&
           verifier.VerifyVectorOfStrings(logTags()) &&
           verifier.EndTable();
  }
};

struct UpdateSettingsRequestBuilder {
  typedef UpdateSettingsRequest Table;
  flatbuffers::FlatBufferBuilder &fbb_;
  flatbuffers::uoffset_t start_;
  void add_logLevel(flatbuffers::Offset<flatbuffers::String> logLevel) {
    fbb_.AddOffset(UpdateSettingsRequest::VT_LOGLEVEL, logLevel);
  }
  void add_logTags(flatbuffers::Offset<flatbuffers::Vector<flatbuffers::Offset<flatbuffers::String>>> logTags) {
    fbb_.AddOffset(UpdateSettingsRequest::VT_LOGTAGS, logTags);
  }
  explicit UpdateSettingsRequestBuilder(flatbuffers::FlatBufferBuilder &_fbb)
        : fbb_(_fbb) {
    start_ = fbb_.StartTable();
  }
  flatbuffers::Offset<UpdateSettingsRequest> Finish() {
    const auto end = fbb_.EndTable(start_);
    auto o = flatbuffers::Offset<UpdateSettingsRequest>(end);
    return o;
  }
};

inline flatbuffers::Offset<UpdateSettingsRequest> CreateUpdateSettingsRequest(
    flatbuffers::FlatBufferBuilder &_fbb,
    flatbuffers::Offset<flatbuffers::String> logLevel = 0,
    flatbuffers::Offset<flatbuffers::Vector<flatbuffers::Offset<flatbuffers::String>>> logTags = 0) {
  UpdateSettingsRequestBuilder builder_(_fbb);
  builder_.add_logTags(logTags);
  builder_.add_logLevel(logLevel);
  return builder_.Finish();
}

inline flatbuffers::Offset<UpdateSettingsRequest> CreateUpdateSettingsRequestDirect(
    flatbuffers::FlatBufferBuilder &_fbb,
    const char *logLevel = nullptr,
    const std::vector<flatbuffers::Offset<flatbuffers::String>> *logTags = nullptr) {
  auto logLevel__ = logLevel ? _fbb.CreateString(logLevel) : 0;
  auto logTags__ = logTags ? _fbb.CreateVector<flatbuffers::Offset<flatbuffers::String>>(*logTags) : 0;
  return FBS::Worker::CreateUpdateSettingsRequest(
      _fbb,
      logLevel__,
      logTags__);
}

struct CreateWebRtcServerRequest FLATBUFFERS_FINAL_CLASS : private flatbuffers::Table {
  typedef CreateWebRtcServerRequestBuilder Builder;
  static const flatbuffers::TypeTable *MiniReflectTypeTable() {
    return CreateWebRtcServerRequestTypeTable();
  }
  enum FlatBuffersVTableOffset FLATBUFFERS_VTABLE_UNDERLYING_TYPE {
    VT_WEBRTCSERVERID = 4,
    VT_LISTENINFOS = 6
  };
  const flatbuffers::String *webRtcServerId() const {
    return GetPointer<const flatbuffers::String *>(VT_WEBRTCSERVERID);
  }
  const flatbuffers::Vector<flatbuffers::Offset<FBS::WebRtcServer::WebRtcServerListenInfo>> *listenInfos() const {
    return GetPointer<const flatbuffers::Vector<flatbuffers::Offset<FBS::WebRtcServer::WebRtcServerListenInfo>> *>(VT_LISTENINFOS);
  }
  bool Verify(flatbuffers::Verifier &verifier) const {
    return VerifyTableStart(verifier) &&
           VerifyOffsetRequired(verifier, VT_WEBRTCSERVERID) &&
           verifier.VerifyString(webRtcServerId()) &&
           VerifyOffset(verifier, VT_LISTENINFOS) &&
           verifier.VerifyVector(listenInfos()) &&
           verifier.VerifyVectorOfTables(listenInfos()) &&
           verifier.EndTable();
  }
};

struct CreateWebRtcServerRequestBuilder {
  typedef CreateWebRtcServerRequest Table;
  flatbuffers::FlatBufferBuilder &fbb_;
  flatbuffers::uoffset_t start_;
  void add_webRtcServerId(flatbuffers::Offset<flatbuffers::String> webRtcServerId) {
    fbb_.AddOffset(CreateWebRtcServerRequest::VT_WEBRTCSERVERID, webRtcServerId);
  }
  void add_listenInfos(flatbuffers::Offset<flatbuffers::Vector<flatbuffers::Offset<FBS::WebRtcServer::WebRtcServerListenInfo>>> listenInfos) {
    fbb_.AddOffset(CreateWebRtcServerRequest::VT_LISTENINFOS, listenInfos);
  }
  explicit CreateWebRtcServerRequestBuilder(flatbuffers::FlatBufferBuilder &_fbb)
        : fbb_(_fbb) {
    start_ = fbb_.StartTable();
  }
  flatbuffers::Offset<CreateWebRtcServerRequest> Finish() {
    const auto end = fbb_.EndTable(start_);
    auto o = flatbuffers::Offset<CreateWebRtcServerRequest>(end);
    fbb_.Required(o, CreateWebRtcServerRequest::VT_WEBRTCSERVERID);
    return o;
  }
};

inline flatbuffers::Offset<CreateWebRtcServerRequest> CreateCreateWebRtcServerRequest(
    flatbuffers::FlatBufferBuilder &_fbb,
    flatbuffers::Offset<flatbuffers::String> webRtcServerId = 0,
    flatbuffers::Offset<flatbuffers::Vector<flatbuffers::Offset<FBS::WebRtcServer::WebRtcServerListenInfo>>> listenInfos = 0) {
  CreateWebRtcServerRequestBuilder builder_(_fbb);
  builder_.add_listenInfos(listenInfos);
  builder_.add_webRtcServerId(webRtcServerId);
  return builder_.Finish();
}

inline flatbuffers::Offset<CreateWebRtcServerRequest> CreateCreateWebRtcServerRequestDirect(
    flatbuffers::FlatBufferBuilder &_fbb,
    const char *webRtcServerId = nullptr,
    const std::vector<flatbuffers::Offset<FBS::WebRtcServer::WebRtcServerListenInfo>> *listenInfos = nullptr) {
  auto webRtcServerId__ = webRtcServerId ? _fbb.CreateString(webRtcServerId) : 0;
  auto listenInfos__ = listenInfos ? _fbb.CreateVector<flatbuffers::Offset<FBS::WebRtcServer::WebRtcServerListenInfo>>(*listenInfos) : 0;
  return FBS::Worker::CreateCreateWebRtcServerRequest(
      _fbb,
      webRtcServerId__,
      listenInfos__);
}

struct CloseWebRtcServerRequest FLATBUFFERS_FINAL_CLASS : private flatbuffers::Table {
  typedef CloseWebRtcServerRequestBuilder Builder;
  static const flatbuffers::TypeTable *MiniReflectTypeTable() {
    return CloseWebRtcServerRequestTypeTable();
  }
  enum FlatBuffersVTableOffset FLATBUFFERS_VTABLE_UNDERLYING_TYPE {
    VT_WEBRTCSERVERID = 4
  };
  const flatbuffers::String *webRtcServerId() const {
    return GetPointer<const flatbuffers::String *>(VT_WEBRTCSERVERID);
  }
  bool Verify(flatbuffers::Verifier &verifier) const {
    return VerifyTableStart(verifier) &&
           VerifyOffsetRequired(verifier, VT_WEBRTCSERVERID) &&
           verifier.VerifyString(webRtcServerId()) &&
           verifier.EndTable();
  }
};

struct CloseWebRtcServerRequestBuilder {
  typedef CloseWebRtcServerRequest Table;
  flatbuffers::FlatBufferBuilder &fbb_;
  flatbuffers::uoffset_t start_;
  void add_webRtcServerId(flatbuffers::Offset<flatbuffers::String> webRtcServerId) {
    fbb_.AddOffset(CloseWebRtcServerRequest::VT_WEBRTCSERVERID, webRtcServerId);
  }
  explicit CloseWebRtcServerRequestBuilder(flatbuffers::FlatBufferBuilder &_fbb)
        : fbb_(_fbb) {
    start_ = fbb_.StartTable();
  }
  flatbuffers::Offset<CloseWebRtcServerRequest> Finish() {
    const auto end = fbb_.EndTable(start_);
    auto o = flatbuffers::Offset<CloseWebRtcServerRequest>(end);
    fbb_.Required(o, CloseWebRtcServerRequest::VT_WEBRTCSERVERID);
    return o;
  }
};

inline flatbuffers::Offset<CloseWebRtcServerRequest> CreateCloseWebRtcServerRequest(
    flatbuffers::FlatBufferBuilder &_fbb,
    flatbuffers::Offset<flatbuffers::String> webRtcServerId = 0) {
  CloseWebRtcServerRequestBuilder builder_(_fbb);
  builder_.add_webRtcServerId(webRtcServerId);
  return builder_.Finish();
}

inline flatbuffers::Offset<CloseWebRtcServerRequest> CreateCloseWebRtcServerRequestDirect(
    flatbuffers::FlatBufferBuilder &_fbb,
    const char *webRtcServerId = nullptr) {
  auto webRtcServerId__ = webRtcServerId ? _fbb.CreateString(webRtcServerId) : 0;
  return FBS::Worker::CreateCloseWebRtcServerRequest(
      _fbb,
      webRtcServerId__);
}

struct CreateRouterRequest FLATBUFFERS_FINAL_CLASS : private flatbuffers::Table {
  typedef CreateRouterRequestBuilder Builder;
  static const flatbuffers::TypeTable *MiniReflectTypeTable() {
    return CreateRouterRequestTypeTable();
  }
  enum FlatBuffersVTableOffset FLATBUFFERS_VTABLE_UNDERLYING_TYPE {
    VT_ROUTERID = 4
  };
  const flatbuffers::String *routerId() const {
    return GetPointer<const flatbuffers::String *>(VT_ROUTERID);
  }
  bool Verify(flatbuffers::Verifier &verifier) const {
    return VerifyTableStart(verifier) &&
           VerifyOffsetRequired(verifier, VT_ROUTERID) &&
           verifier.VerifyString(routerId()) &&
           verifier.EndTable();
  }
};

struct CreateRouterRequestBuilder {
  typedef CreateRouterRequest Table;
  flatbuffers::FlatBufferBuilder &fbb_;
  flatbuffers::uoffset_t start_;
  void add_routerId(flatbuffers::Offset<flatbuffers::String> routerId) {
    fbb_.AddOffset(CreateRouterRequest::VT_ROUTERID, routerId);
  }
  explicit CreateRouterRequestBuilder(flatbuffers::FlatBufferBuilder &_fbb)
        : fbb_(_fbb) {
    start_ = fbb_.StartTable();
  }
  flatbuffers::Offset<CreateRouterRequest> Finish() {
    const auto end = fbb_.EndTable(start_);
    auto o = flatbuffers::Offset<CreateRouterRequest>(end);
    fbb_.Required(o, CreateRouterRequest::VT_ROUTERID);
    return o;
  }
};

inline flatbuffers::Offset<CreateRouterRequest> CreateCreateRouterRequest(
    flatbuffers::FlatBufferBuilder &_fbb,
    flatbuffers::Offset<flatbuffers::String> routerId = 0) {
  CreateRouterRequestBuilder builder_(_fbb);
  builder_.add_routerId(routerId);
  return builder_.Finish();
}

inline flatbuffers::Offset<CreateRouterRequest> CreateCreateRouterRequestDirect(
    flatbuffers::FlatBufferBuilder &_fbb,
    const char *routerId = nullptr) {
  auto routerId__ = routerId ? _fbb.CreateString(routerId) : 0;
  return FBS::Worker::CreateCreateRouterRequest(
      _fbb,
      routerId__);
}

struct CloseRouterRequest FLATBUFFERS_FINAL_CLASS : private flatbuffers::Table {
  typedef CloseRouterRequestBuilder Builder;
  static const flatbuffers::TypeTable *MiniReflectTypeTable() {
    return CloseRouterRequestTypeTable();
  }
  enum FlatBuffersVTableOffset FLATBUFFERS_VTABLE_UNDERLYING_TYPE {
    VT_ROUTERID = 4
  };
  const flatbuffers::String *routerId() const {
    return GetPointer<const flatbuffers::String *>(VT_ROUTERID);
  }
  bool Verify(flatbuffers::Verifier &verifier) const {
    return VerifyTableStart(verifier) &&
           VerifyOffsetRequired(verifier, VT_ROUTERID) &&
           verifier.VerifyString(routerId()) &&
           verifier.EndTable();
  }
};

struct CloseRouterRequestBuilder {
  typedef CloseRouterRequest Table;
  flatbuffers::FlatBufferBuilder &fbb_;
  flatbuffers::uoffset_t start_;
  void add_routerId(flatbuffers::Offset<flatbuffers::String> routerId) {
    fbb_.AddOffset(CloseRouterRequest::VT_ROUTERID, routerId);
  }
  explicit CloseRouterRequestBuilder(flatbuffers::FlatBufferBuilder &_fbb)
        : fbb_(_fbb) {
    start_ = fbb_.StartTable();
  }
  flatbuffers::Offset<CloseRouterRequest> Finish() {
    const auto end = fbb_.EndTable(start_);
    auto o = flatbuffers::Offset<CloseRouterRequest>(end);
    fbb_.Required(o, CloseRouterRequest::VT_ROUTERID);
    return o;
  }
};

inline flatbuffers::Offset<CloseRouterRequest> CreateCloseRouterRequest(
    flatbuffers::FlatBufferBuilder &_fbb,
    flatbuffers::Offset<flatbuffers::String> routerId = 0) {
  CloseRouterRequestBuilder builder_(_fbb);
  builder_.add_routerId(routerId);
  return builder_.Finish();
}

inline flatbuffers::Offset<CloseRouterRequest> CreateCloseRouterRequestDirect(
    flatbuffers::FlatBufferBuilder &_fbb,
    const char *routerId = nullptr) {
  auto routerId__ = routerId ? _fbb.CreateString(routerId) : 0;
  return FBS::Worker::CreateCloseRouterRequest(
      _fbb,
      routerId__);
}

inline const flatbuffers::TypeTable *ChannelMessageHandlersTypeTable() {
  static const flatbuffers::TypeCode type_codes[] = {
    { flatbuffers::ET_STRING, 1, -1 },
    { flatbuffers::ET_STRING, 1, -1 },
    { flatbuffers::ET_STRING, 1, -1 }
  };
  static const char * const names[] = {
    "channelRequestHandlers",
    "payloadChannelRequestHandlers",
    "payloadChannelNotificationHandlers"
  };
  static const flatbuffers::TypeTable tt = {
    flatbuffers::ST_TABLE, 3, type_codes, nullptr, nullptr, nullptr, names
  };
  return &tt;
}

inline const flatbuffers::TypeTable *DumpResponseTypeTable() {
  static const flatbuffers::TypeCode type_codes[] = {
    { flatbuffers::ET_UINT, 0, -1 },
    { flatbuffers::ET_STRING, 1, -1 },
    { flatbuffers::ET_STRING, 1, -1 },
    { flatbuffers::ET_SEQUENCE, 0, 0 }
  };
  static const flatbuffers::TypeFunction type_refs[] = {
    FBS::Worker::ChannelMessageHandlersTypeTable
  };
  static const char * const names[] = {
    "pid",
    "webRtcServerIds",
    "routerIds",
    "channelMessageHandlers"
  };
  static const flatbuffers::TypeTable tt = {
    flatbuffers::ST_TABLE, 4, type_codes, type_refs, nullptr, nullptr, names
  };
  return &tt;
}

inline const flatbuffers::TypeTable *ResourceUsageResponseTypeTable() {
  static const flatbuffers::TypeCode type_codes[] = {
    { flatbuffers::ET_ULONG, 0, -1 },
    { flatbuffers::ET_ULONG, 0, -1 },
    { flatbuffers::ET_ULONG, 0, -1 },
    { flatbuffers::ET_ULONG, 0, -1 },
    { flatbuffers::ET_ULONG, 0, -1 },
    { flatbuffers::ET_ULONG, 0, -1 },
    { flatbuffers::ET_ULONG, 0, -1 },
    { flatbuffers::ET_ULONG, 0, -1 },
    { flatbuffers::ET_ULONG, 0, -1 },
    { flatbuffers::ET_ULONG, 0, -1 },
    { flatbuffers::ET_ULONG, 0, -1 },
    { flatbuffers::ET_ULONG, 0, -1 },
    { flatbuffers::ET_ULONG, 0, -1 },
    { flatbuffers::ET_ULONG, 0, -1 },
    { flatbuffers::ET_ULONG, 0, -1 },
    { flatbuffers::ET_ULONG, 0, -1 }
  };
  static const char * const names[] = {
    "ruUtime",
    "ruStime",
    "ruMaxrss",
    "ruIxrss",
    "ruIdrss",
    "ruIsrss",
    "ruMinflt",
    "ruMajflt",
    "ruNswap",
    "ruInblock",
    "ruOublock",
    "ruMsgsnd",
    "ruMsgrcv",
    "ruNsignals",
    "ruNvcsw",
    "ruNivcsw"
  };
  static const flatbuffers::TypeTable tt = {
    flatbuffers::ST_TABLE, 16, type_codes, nullptr, nullptr, nullptr, names
  };
  return &tt;
}

inline const flatbuffers::TypeTable *UpdateSettingsRequestTypeTable() {
  static const flatbuffers::TypeCode type_codes[] = {
    { flatbuffers::ET_STRING, 0, -1 },
    { flatbuffers::ET_STRING, 1, -1 }
  };
  static const char * const names[] = {
    "logLevel",
    "logTags"
  };
  static const flatbuffers::TypeTable tt = {
    flatbuffers::ST_TABLE, 2, type_codes, nullptr, nullptr, nullptr, names
  };
  return &tt;
}

inline const flatbuffers::TypeTable *CreateWebRtcServerRequestTypeTable() {
  static const flatbuffers::TypeCode type_codes[] = {
    { flatbuffers::ET_STRING, 0, -1 },
    { flatbuffers::ET_SEQUENCE, 1, 0 }
  };
  static const flatbuffers::TypeFunction type_refs[] = {
    FBS::WebRtcServer::WebRtcServerListenInfoTypeTable
  };
  static const char * const names[] = {
    "webRtcServerId",
    "listenInfos"
  };
  static const flatbuffers::TypeTable tt = {
    flatbuffers::ST_TABLE, 2, type_codes, type_refs, nullptr, nullptr, names
  };
  return &tt;
}

inline const flatbuffers::TypeTable *CloseWebRtcServerRequestTypeTable() {
  static const flatbuffers::TypeCode type_codes[] = {
    { flatbuffers::ET_STRING, 0, -1 }
  };
  static const char * const names[] = {
    "webRtcServerId"
  };
  static const flatbuffers::TypeTable tt = {
    flatbuffers::ST_TABLE, 1, type_codes, nullptr, nullptr, nullptr, names
  };
  return &tt;
}

inline const flatbuffers::TypeTable *CreateRouterRequestTypeTable() {
  static const flatbuffers::TypeCode type_codes[] = {
    { flatbuffers::ET_STRING, 0, -1 }
  };
  static const char * const names[] = {
    "routerId"
  };
  static const flatbuffers::TypeTable tt = {
    flatbuffers::ST_TABLE, 1, type_codes, nullptr, nullptr, nullptr, names
  };
  return &tt;
}

inline const flatbuffers::TypeTable *CloseRouterRequestTypeTable() {
  static const flatbuffers::TypeCode type_codes[] = {
    { flatbuffers::ET_STRING, 0, -1 }
  };
  static const char * const names[] = {
    "routerId"
  };
  static const flatbuffers::TypeTable tt = {
    flatbuffers::ST_TABLE, 1, type_codes, nullptr, nullptr, nullptr, names
  };
  return &tt;
}

}  // namespace Worker
}  // namespace FBS

#endif  // FLATBUFFERS_GENERATED_WORKER_FBS_WORKER_H_
