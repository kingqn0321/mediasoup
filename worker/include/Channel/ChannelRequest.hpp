#ifndef MS_CHANNEL_REQUEST_HPP
#define MS_CHANNEL_REQUEST_HPP

#include "common.hpp"
#include "FBS/request_generated.h"
#include "FBS/response_generated.h"
#include <absl/container/flat_hash_map.h>
#include <nlohmann/json.hpp>
#include <flatbuffers/minireflect.h>
#include <string>

using json = nlohmann::json;

namespace Channel
{
	// Avoid cyclic #include problem by declaring classes instead of including
	// the corresponding header files.
	class ChannelSocket;

	class ChannelRequest
	{
	public:
		// TODO: Remove once JSON is removed.
		enum class MethodId
		{
			WORKER_GET_RESOURCE_USAGE,
			WORKER_UPDATE_SETTINGS,
			WORKER_CREATE_WEBRTC_SERVER,
			WORKER_CREATE_ROUTER,
			WORKER_WEBRTC_SERVER_CLOSE,
			WEBRTC_SERVER_DUMP,
			WORKER_CLOSE_ROUTER,
			ROUTER_DUMP,
			ROUTER_CREATE_WEBRTC_TRANSPORT,
			ROUTER_CREATE_WEBRTC_TRANSPORT_WITH_SERVER,
			ROUTER_CREATE_PLAIN_TRANSPORT,
			ROUTER_CREATE_PIPE_TRANSPORT,
			ROUTER_CREATE_DIRECT_TRANSPORT,
			ROUTER_CLOSE_TRANSPORT,
			ROUTER_CREATE_ACTIVE_SPEAKER_OBSERVER,
			ROUTER_CREATE_AUDIO_LEVEL_OBSERVER,
			ROUTER_CLOSE_RTP_OBSERVER,
			TRANSPORT_DUMP,
			TRANSPORT_GET_STATS,
			TRANSPORT_CONNECT,
			TRANSPORT_SET_MAX_INCOMING_BITRATE,
			TRANSPORT_SET_MAX_OUTGOING_BITRATE,
			TRANSPORT_RESTART_ICE,
			TRANSPORT_PRODUCE,
			TRANSPORT_PRODUCE_DATA,
			TRANSPORT_CONSUME_DATA,
			TRANSPORT_ENABLE_TRACE_EVENT,
			TRANSPORT_CLOSE_PRODUCER,
			PRODUCER_DUMP,
			PRODUCER_GET_STATS,
			PRODUCER_PAUSE,
			PRODUCER_RESUME,
			PRODUCER_ENABLE_TRACE_EVENT,
			TRANSPORT_CLOSE_CONSUMER,
			CONSUMER_DUMP,
			CONSUMER_GET_STATS,
			CONSUMER_PAUSE,
			CONSUMER_RESUME,
			CONSUMER_SET_PREFERRED_LAYERS,
			CONSUMER_SET_PRIORITY,
			CONSUMER_REQUEST_KEY_FRAME,
			CONSUMER_ENABLE_TRACE_EVENT,
			TRANSPORT_CLOSE_DATA_PRODUCER,
			DATA_PRODUCER_DUMP,
			DATA_PRODUCER_GET_STATS,
			TRANSPORT_CLOSE_DATA_CONSUMER,
			DATA_CONSUMER_DUMP,
			DATA_CONSUMER_GET_STATS,
			DATA_CONSUMER_GET_BUFFERED_AMOUNT,
			DATA_CONSUMER_SET_BUFFERED_AMOUNT_LOW_THRESHOLD,
			RTP_OBSERVER_PAUSE,
			RTP_OBSERVER_RESUME,
			RTP_OBSERVER_ADD_PRODUCER,
			RTP_OBSERVER_REMOVE_PRODUCER
		};

	public:
		static absl::flat_hash_map<FBS::Request::Method, const char*> method2String;

	private:
		// TODO: Remove once JSON is removed.
		static absl::flat_hash_map<std::string, MethodId> string2MethodId;

	public:
		static flatbuffers::FlatBufferBuilder bufferBuilder;

	public:
		ChannelRequest(Channel::ChannelSocket* channel, const char* msg, size_t msgLen);
		ChannelRequest(Channel::ChannelSocket* channel, const uint8_t* msg);
		virtual ~ChannelRequest();

		flatbuffers::FlatBufferBuilder& GetBufferBuilder()
		{
			return bufferBuilder;
		}
		void Accept();
		template <class Body>
		void Accept(flatbuffers::FlatBufferBuilder& builder, FBS::Response::Body type, flatbuffers::Offset<Body>& body)
		{
			auto response = FBS::Response::CreateResponse(builder, this->id, true, type, body.Union());

			builder.Finish(response);

			this->Send(builder.GetBufferPointer(), builder.GetSize());

			builder.Reset();
		}
		void Accept(json& data);
		void Error(const char* reason = nullptr);
		void TypeError(const char* reason = nullptr);

	private:
		void Send(uint8_t* buffer, size_t size);

	public:
		// Passed by argument.
		Channel::ChannelSocket* channel{ nullptr };
		uint32_t id{ 0u };
		std::string method;
		// TODO: Rename to `method` once JSON is removed.
		FBS::Request::Method _method;
		MethodId methodId;
		std::string handlerId;
		json data;
		// TODO: Rename to `data` once JSON is removed.
		const FBS::Request::Request* _data{ nullptr };
		// Others.
		bool replied{ false };
	};
} // namespace Channel

#endif
