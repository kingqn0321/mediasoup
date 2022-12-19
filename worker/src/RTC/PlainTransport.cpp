#include "FBS/plainTransport_generated.h"
#define MS_CLASS "RTC::PlainTransport"
// #define MS_LOG_DEV_LEVEL 3

#include "Logger.hpp"
#include "MediaSoupErrors.hpp"
#include "Utils.hpp"
#include "RTC/PlainTransport.hpp"

namespace RTC
{
	/* Static. */

	// clang-format off
	// AES-HMAC: http://tools.ietf.org/html/rfc3711
	static constexpr size_t SrtpMasterKeyLength{ 16 };
	static constexpr size_t SrtpMasterSaltLength{ 14 };
	static constexpr size_t SrtpMasterLength{ SrtpMasterKeyLength + SrtpMasterSaltLength };
	// AES-GCM: http://tools.ietf.org/html/rfc7714
	static constexpr size_t SrtpAesGcm256MasterKeyLength{ 32 };
	static constexpr size_t SrtpAesGcm256MasterSaltLength{ 12 };
	static constexpr size_t SrtpAesGcm256MasterLength{ SrtpAesGcm256MasterKeyLength + SrtpAesGcm256MasterSaltLength };
	static constexpr size_t SrtpAesGcm128MasterKeyLength{ 16 };
	static constexpr size_t SrtpAesGcm128MasterSaltLength{ 12 };
	static constexpr size_t SrtpAesGcm128MasterLength{ SrtpAesGcm128MasterKeyLength + SrtpAesGcm128MasterSaltLength };
	// clang-format on

	/* Class variables. */

	// clang-format off
	absl::flat_hash_map<std::string, RTC::SrtpSession::CryptoSuite> PlainTransport::string2SrtpCryptoSuite =
	{
		{ "AEAD_AES_256_GCM",        RTC::SrtpSession::CryptoSuite::AEAD_AES_256_GCM        },
		{ "AEAD_AES_128_GCM",        RTC::SrtpSession::CryptoSuite::AEAD_AES_128_GCM        },
		{ "AES_CM_128_HMAC_SHA1_80", RTC::SrtpSession::CryptoSuite::AES_CM_128_HMAC_SHA1_80 },
		{ "AES_CM_128_HMAC_SHA1_32", RTC::SrtpSession::CryptoSuite::AES_CM_128_HMAC_SHA1_32 }
	};
	absl::flat_hash_map<RTC::SrtpSession::CryptoSuite, std::string> PlainTransport::srtpCryptoSuite2String =
	{
		{ RTC::SrtpSession::CryptoSuite::AEAD_AES_256_GCM,        "AEAD_AES_256_GCM"        },
		{ RTC::SrtpSession::CryptoSuite::AEAD_AES_128_GCM,        "AEAD_AES_128_GCM"        },
		{ RTC::SrtpSession::CryptoSuite::AES_CM_128_HMAC_SHA1_80, "AES_CM_128_HMAC_SHA1_80" },
		{ RTC::SrtpSession::CryptoSuite::AES_CM_128_HMAC_SHA1_32, "AES_CM_128_HMAC_SHA1_32" }
	};

	/* Instance methods. */

	PlainTransport::PlainTransport(
	  RTC::Shared* shared,
	  const std::string& id,
	  RTC::Transport::Listener* listener,
	  const FBS::PlainTransport::PlainTransportOptions* options)
	  : RTC::Transport::Transport(shared, id, listener, options->base())
	{
		MS_TRACE();

		this->listenIp.ip.assign(options->listenIp()->ip()->str());

		// This may throw.
		Utils::IP::NormalizeIp(this->listenIp.ip);

		this->listenIp.announcedIp.assign(options->listenIp()->announcedIp()->str());

		this->rtcpMux = options->rtcpMux();
		this->comedia = options->comedia();

		if (options->enableSrtp())
		{
			if (!flatbuffers::IsFieldPresent(
			      options, FBS::PlainTransport::PlainTransportOptions::VT_SRTPCRYPTOSUITE))
				MS_THROW_TYPE_ERROR("missing srtpCryptoSuite)");

			// Ensure it's a crypto suite supported by us.
			auto it = PlainTransport::string2SrtpCryptoSuite.find(options->srtpCryptoSuite()->str());

			if (it == PlainTransport::string2SrtpCryptoSuite.end())
				MS_THROW_TYPE_ERROR("invalid/unsupported srtpCryptoSuite");

			// NOTE: The SRTP crypto suite may change later on connect().
			this->srtpCryptoSuite = it->second;

			switch (this->srtpCryptoSuite)
			{
				case RTC::SrtpSession::CryptoSuite::AEAD_AES_256_GCM:
				{
					this->srtpMasterLength = SrtpAesGcm256MasterLength;

					break;
				}

				case RTC::SrtpSession::CryptoSuite::AEAD_AES_128_GCM:
				{
					this->srtpMasterLength = SrtpAesGcm128MasterLength;

					break;
				}

				case RTC::SrtpSession::CryptoSuite::AES_CM_128_HMAC_SHA1_80:
				case RTC::SrtpSession::CryptoSuite::AES_CM_128_HMAC_SHA1_32:
				{
					this->srtpMasterLength = SrtpMasterLength;

					break;
				}

				default:
				{
					MS_ABORT("unknown SRTP crypto suite");
				}
			}

			this->srtpKey       = Utils::Crypto::GetRandomString(this->srtpMasterLength);
			this->srtpKeyBase64 = Utils::String::Base64Encode(this->srtpKey);
		}

		try
		{
			// This may throw.
			if (options->port() != 0)
				this->udpSocket = new RTC::UdpSocket(this, this->listenIp.ip, options->port());
			else
				this->udpSocket = new RTC::UdpSocket(this, this->listenIp.ip);

			if (!this->rtcpMux)
			{
				// This may throw.
				this->rtcpUdpSocket = new RTC::UdpSocket(this, this->listenIp.ip);
			}

			// NOTE: This may throw.
			this->shared->channelMessageRegistrator->RegisterHandler(
			  this->id,
			  /*channelRequestHandler*/ this,
			  /*channelNotificationHandler*/ this);
		}
		catch (const MediaSoupError& error)
		{
			delete this->udpSocket;
			this->udpSocket = nullptr;

			delete this->rtcpUdpSocket;
			this->rtcpUdpSocket = nullptr;

			throw;
		}
	}

	PlainTransport::~PlainTransport()
	{
		MS_TRACE();

		this->shared->channelMessageRegistrator->UnregisterHandler(this->id);

		delete this->udpSocket;
		this->udpSocket = nullptr;

		delete this->rtcpUdpSocket;
		this->rtcpUdpSocket = nullptr;

		delete this->tuple;
		this->tuple = nullptr;

		delete this->rtcpTuple;
		this->rtcpTuple = nullptr;

		delete this->srtpSendSession;
		this->srtpSendSession = nullptr;

		delete this->srtpRecvSession;
		this->srtpRecvSession = nullptr;
	}

	flatbuffers::Offset<FBS::PlainTransport::DumpResponse> PlainTransport::FillBuffer(
	  flatbuffers::FlatBufferBuilder& builder) const
	{
		MS_TRACE();

		// Add tuple.
		flatbuffers::Offset<FBS::Transport::Tuple> tuple;

		if (this->tuple)
		{
			tuple = this->tuple->FillBuffer(builder);
		}
		else
		{
			std::string localIp;

			if (this->listenIp.announcedIp.empty())
				localIp = this->udpSocket->GetLocalIp();
			else
				localIp = this->listenIp.announcedIp;

			tuple = FBS::Transport::CreateTupleDirect(
			  builder, localIp.c_str(), this->udpSocket->GetLocalPort(), "", 0, "udp");
		}

		// Add rtcpTuple.
		flatbuffers::Offset<FBS::Transport::Tuple> rtcpTuple;

		if (!this->rtcpMux)
		{
			if (this->rtcpTuple)
			{
				rtcpTuple = this->rtcpTuple->FillBuffer(builder);
			}
			else
			{
				std::string localIp;

				if (this->listenIp.announcedIp.empty())
					localIp = this->rtcpUdpSocket->GetLocalIp();
				else
					localIp = this->listenIp.announcedIp;

				rtcpTuple = FBS::Transport::CreateTupleDirect(
				  builder, localIp.c_str(), this->rtcpUdpSocket->GetLocalPort(), "", 0, "udp");
			}
		}

		// Add srtpParameters.
		flatbuffers::Offset<FBS::Transport::SrtpParameters> srtpParameters;

		if (HasSrtp())
		{
			srtpParameters = FBS::Transport::CreateSrtpParametersDirect(
			  builder,
			  PlainTransport::srtpCryptoSuite2String[this->srtpCryptoSuite].c_str(),
			  this->srtpKeyBase64.c_str());
		}

		// Add base transport dump.
		auto base = Transport::FillBuffer(builder);

		return FBS::PlainTransport::CreateDumpResponse(
		  builder, base, this->rtcpMux, this->comedia, tuple, rtcpTuple, srtpParameters);
	}

	flatbuffers::Offset<FBS::Transport::GetStatsResponse> PlainTransport::FillBufferStats(
			flatbuffers::FlatBufferBuilder& builder)
	{
		MS_TRACE();

		// Add tuple.
		flatbuffers::Offset<FBS::Transport::Tuple> tuple;

		if (this->tuple)
		{
			tuple = this->tuple->FillBuffer(builder);
		}
		else
		{
			std::string localIp;

			if (this->listenIp.announcedIp.empty())
				localIp = this->udpSocket->GetLocalIp();
			else
				localIp = this->listenIp.announcedIp;

			tuple = FBS::Transport::CreateTupleDirect(
					builder,
					// localIp.
					localIp.c_str(),
					// localPort,
					this->udpSocket->GetLocalPort(),
					// remoteIp.
					nullptr,
					// remotePort.
					0,
					// protocol.
					"udp"
					);
		}

		// Add rtcpTuple.
		flatbuffers::Offset<FBS::Transport::Tuple> rtcpTuple;

		if (!this->rtcpMux && this->rtcpTuple)
			rtcpTuple = this->rtcpTuple->FillBuffer(builder);

		// Base Transport stats.
		auto base = Transport::FillBufferStats(builder);
		// PlainTransport stats.
		auto plainTransportStats = FBS::Transport::CreatePlainTransportStats(
				builder,
				base,
				this->rtcpMux,
				this->comedia,
				tuple,
				rtcpTuple);

		return FBS::Transport::CreateGetStatsResponse(
		  builder, FBS::Transport::StatsData::PlainTransportStats, plainTransportStats.Union());
	}

	void PlainTransport::HandleRequest(Channel::ChannelRequest* request)
	{
		MS_TRACE();

		switch (request->method)
		{
			case Channel::ChannelRequest::Method::TRANSPORT_DUMP:
			{
				auto dumpOffset = FillBuffer(request->GetBufferBuilder());

				request->Accept(FBS::Response::Body::FBS_PlainTransport_DumpResponse, dumpOffset);

				break;
			}

			case Channel::ChannelRequest::Method::PLAIN_TRANSPORT_CONNECT:
			{
				// Ensure this method is not called twice.
				if (this->connectCalled)
					MS_THROW_ERROR("connect() already called");

				try
				{
					std::string ip;
					uint16_t port{ 0u };
					uint16_t rtcpPort{ 0u };
					std::string srtpKeyBase64;

					const auto *body = request->data->body_as<FBS::PlainTransport::ConnectRequest>();

					auto srtpParametersPresent = flatbuffers::IsFieldPresent(
							body, FBS::PlainTransport::ConnectRequest::VT_SRTPPARAMETERS);

					if (!HasSrtp() && srtpParametersPresent)
					{
						MS_THROW_TYPE_ERROR("invalid srtpParameters (SRTP not enabled)");
					}
					else if (HasSrtp())
					{
						if (!srtpParametersPresent)
						{
							MS_THROW_TYPE_ERROR("missing srtpParameters (SRTP enabled)");
						}

						const auto *srtpParameters = body->srtpParameters();
						// Ensure it's a crypto suite supported by us.
						auto it =
						  PlainTransport::string2SrtpCryptoSuite.find(srtpParameters->cryptoSuite()->str());

						if (it == PlainTransport::string2SrtpCryptoSuite.end())
							MS_THROW_TYPE_ERROR("invalid/unsupported srtpParameters.cryptoSuite");

						// Update out SRTP crypto suite with the one used by the remote.
						auto previousSrtpCryptoSuite = this->srtpCryptoSuite;
						this->srtpCryptoSuite        = it->second;

						switch (this->srtpCryptoSuite)
						{
							case RTC::SrtpSession::CryptoSuite::AEAD_AES_256_GCM:
							{
								this->srtpMasterLength = SrtpAesGcm256MasterLength;

								break;
							}

							case RTC::SrtpSession::CryptoSuite::AEAD_AES_128_GCM:
							{
								this->srtpMasterLength = SrtpAesGcm128MasterLength;

								break;
							}

							case RTC::SrtpSession::CryptoSuite::AES_CM_128_HMAC_SHA1_80:
							case RTC::SrtpSession::CryptoSuite::AES_CM_128_HMAC_SHA1_32:
							{
								this->srtpMasterLength = SrtpMasterLength;

								break;
							}

							default:
							{
								MS_ABORT("unknown SRTP crypto suite");
							}
						}

						// If the SRTP crypto suite changed we must regenerate our SRTP key.
						if (this->srtpCryptoSuite != previousSrtpCryptoSuite)
						{
							this->srtpKey       = Utils::Crypto::GetRandomString(this->srtpMasterLength);
							this->srtpKeyBase64 = Utils::String::Base64Encode(this->srtpKey);
						}

						srtpKeyBase64 = srtpParameters->keyBase64()->str();

						size_t outLen;
						// This may throw.
						auto* srtpKey = Utils::String::Base64Decode(srtpKeyBase64, outLen);

						if (outLen != this->srtpMasterLength)
							MS_THROW_TYPE_ERROR("invalid decoded SRTP key length");

						auto* srtpLocalKey  = new uint8_t[this->srtpMasterLength];
						auto* srtpRemoteKey = new uint8_t[this->srtpMasterLength];

						std::memcpy(srtpLocalKey, this->srtpKey.c_str(), this->srtpMasterLength);
						std::memcpy(srtpRemoteKey, srtpKey, this->srtpMasterLength);

						try
						{
							this->srtpSendSession = new RTC::SrtpSession(
							  RTC::SrtpSession::Type::OUTBOUND,
							  this->srtpCryptoSuite,
							  srtpLocalKey,
							  this->srtpMasterLength);
						}
						catch (const MediaSoupError& error)
						{
							delete[] srtpLocalKey;
							delete[] srtpRemoteKey;

							MS_THROW_ERROR("error creating SRTP sending session: %s", error.what());
						}

						try
						{
							this->srtpRecvSession = new RTC::SrtpSession(
							  RTC::SrtpSession::Type::INBOUND,
							  this->srtpCryptoSuite,
							  srtpRemoteKey,
							  this->srtpMasterLength);
						}
						catch (const MediaSoupError& error)
						{
							delete[] srtpLocalKey;
							delete[] srtpRemoteKey;

							MS_THROW_ERROR("error creating SRTP receiving session: %s", error.what());
						}

						delete[] srtpLocalKey;
						delete[] srtpRemoteKey;
					}

					if (!this->comedia)
					{
						if (!flatbuffers::IsFieldPresent(body, FBS::PlainTransport::ConnectRequest::VT_IP))
							MS_THROW_TYPE_ERROR("missing ip");

						ip = body->ip()->str();

						// This may throw.
						Utils::IP::NormalizeIp(ip);

						if (!body->port().has_value())
						{
							MS_THROW_TYPE_ERROR("missing port");
						}

						port = body->port().value();

						if (body->rtcpPort().has_value())
						{
							if (this->rtcpMux)
								MS_THROW_TYPE_ERROR("cannot set rtcpPort with rtcpMux enabled");

							rtcpPort = body->rtcpPort().value();
						}
						else
						{
							if (!this->rtcpMux)
								MS_THROW_TYPE_ERROR("missing rtcpPort (required with rtcpMux disabled)");
						}

						int err;

						switch (Utils::IP::GetFamily(ip))
						{
							case AF_INET:
							{
								err = uv_ip4_addr(
								  ip.c_str(),
								  static_cast<int>(port),
								  reinterpret_cast<struct sockaddr_in*>(&this->remoteAddrStorage));

								if (err != 0)
									MS_THROW_ERROR("uv_ip4_addr() failed: %s", uv_strerror(err));

								break;
							}

							case AF_INET6:
							{
								err = uv_ip6_addr(
								  ip.c_str(),
								  static_cast<int>(port),
								  reinterpret_cast<struct sockaddr_in6*>(&this->remoteAddrStorage));

								if (err != 0)
									MS_THROW_ERROR("uv_ip6_addr() failed: %s", uv_strerror(err));

								break;
							}

							default:
							{
								MS_THROW_ERROR("invalid IP '%s'", ip.c_str());
							}
						}

						// Create the tuple.
						this->tuple = new RTC::TransportTuple(
						  this->udpSocket, reinterpret_cast<struct sockaddr*>(&this->remoteAddrStorage));

						if (!this->listenIp.announcedIp.empty())
							this->tuple->SetLocalAnnouncedIp(this->listenIp.announcedIp);

						if (!this->rtcpMux)
						{
							switch (Utils::IP::GetFamily(ip))
							{
								case AF_INET:
								{
									err = uv_ip4_addr(
									  ip.c_str(),
									  static_cast<int>(rtcpPort),
									  reinterpret_cast<struct sockaddr_in*>(&this->rtcpRemoteAddrStorage));

									if (err != 0)
										MS_THROW_ERROR("uv_ip4_addr() failed: %s", uv_strerror(err));

									break;
								}

								case AF_INET6:
								{
									err = uv_ip6_addr(
									  ip.c_str(),
									  static_cast<int>(rtcpPort),
									  reinterpret_cast<struct sockaddr_in6*>(&this->rtcpRemoteAddrStorage));

									if (err != 0)
										MS_THROW_ERROR("uv_ip6_addr() failed: %s", uv_strerror(err));

									break;
								}

								default:
								{
									MS_THROW_ERROR("invalid IP '%s'", ip.c_str());
								}
							}

							// Create the tuple.
							this->rtcpTuple = new RTC::TransportTuple(
							  this->rtcpUdpSocket,
							  reinterpret_cast<struct sockaddr*>(&this->rtcpRemoteAddrStorage));

							if (!this->listenIp.announcedIp.empty())
								this->rtcpTuple->SetLocalAnnouncedIp(this->listenIp.announcedIp);
						}
					}
				}
				catch (const MediaSoupError& error)
				{
					delete this->tuple;
					this->tuple = nullptr;

					delete this->rtcpTuple;
					this->rtcpTuple = nullptr;

					delete this->srtpSendSession;
					this->srtpSendSession = nullptr;

					delete this->srtpRecvSession;
					this->srtpRecvSession = nullptr;

					throw;
				}

				this->connectCalled = true;

				// Tell the caller about the selected local DTLS role.
				flatbuffers::Offset<FBS::Transport::Tuple> tupleOffset;
				flatbuffers::Offset<FBS::Transport::Tuple> rtcpTupleOffset;
				flatbuffers::Offset<FBS::Transport::SrtpParameters> srtpParametersOffset;

				if (this->tuple)
					tupleOffset = this->tuple->FillBuffer(request->GetBufferBuilder());

				if (!this->rtcpMux && this->rtcpTuple)
					rtcpTupleOffset = this->rtcpTuple->FillBuffer(request->GetBufferBuilder());

				if (HasSrtp())
				{
					srtpParametersOffset = FBS::Transport::CreateSrtpParametersDirect(
							request->GetBufferBuilder(),
							PlainTransport::srtpCryptoSuite2String[this->srtpCryptoSuite].c_str(),
							this->srtpKeyBase64.c_str()
							);
				}

				auto responseOffset =
				  FBS::PlainTransport::CreateConnectResponse(
				  request->GetBufferBuilder(), tupleOffset, rtcpTupleOffset, srtpParametersOffset);

				request->Accept(FBS::Response::Body::FBS_PlainTransport_ConnectResponse, responseOffset);

				// Assume we are connected (there is no much more we can do to know it)
				// and tell the parent class.
				RTC::Transport::Connected();

				break;
			}

			default:
			{
				// Pass it to the parent class.
				RTC::Transport::HandleRequest(request);
			}
		}
	}

	void PlainTransport::HandleNotification(Channel::ChannelNotification* notification)
	{
		MS_TRACE();

		// Pass it to the parent class.
		RTC::Transport::HandleNotification(notification);
	}

	inline bool PlainTransport::IsConnected() const
	{
		return this->tuple;
	}

	inline bool PlainTransport::HasSrtp() const
	{
		return !this->srtpKey.empty();
	}

	inline bool PlainTransport::IsSrtpReady() const
	{
		return HasSrtp() && this->srtpSendSession && this->srtpRecvSession;
	}

	void PlainTransport::SendRtpPacket(
	  RTC::Consumer* /*consumer*/, RTC::RtpPacket* packet, RTC::Transport::onSendCallback* cb)
	{
		MS_TRACE();

		if (!IsConnected())
		{
			if (cb)
			{
				(*cb)(false);
				delete cb;
			}

			return;
		}

		const uint8_t* data = packet->GetData();
		auto intLen         = static_cast<int>(packet->GetSize());

		if (HasSrtp() && !this->srtpSendSession->EncryptRtp(&data, &intLen))
		{
			if (cb)
			{
				(*cb)(false);
				delete cb;
			}

			return;
		}

		auto len = static_cast<size_t>(intLen);

		this->tuple->Send(data, len, cb);

		// Increase send transmission.
		RTC::Transport::DataSent(len);
	}

	void PlainTransport::SendRtcpPacket(RTC::RTCP::Packet* packet)
	{
		MS_TRACE();

		if (!IsConnected())
			return;

		const uint8_t* data = packet->GetData();
		auto intLen         = static_cast<int>(packet->GetSize());

		if (HasSrtp() && !this->srtpSendSession->EncryptRtcp(&data, &intLen))
			return;

		auto len = static_cast<size_t>(intLen);

		if (this->rtcpMux)
			this->tuple->Send(data, len);
		else if (this->rtcpTuple)
			this->rtcpTuple->Send(data, len);

		// Increase send transmission.
		RTC::Transport::DataSent(len);
	}

	void PlainTransport::SendRtcpCompoundPacket(RTC::RTCP::CompoundPacket* packet)
	{
		MS_TRACE();

		if (!IsConnected())
			return;

		packet->Serialize(RTC::RTCP::Buffer);

		const uint8_t* data = packet->GetData();
		auto intLen         = static_cast<int>(packet->GetSize());

		if (HasSrtp() && !this->srtpSendSession->EncryptRtcp(&data, &intLen))
			return;

		auto len = static_cast<size_t>(intLen);

		if (this->rtcpMux)
			this->tuple->Send(data, len);
		else if (this->rtcpTuple)
			this->rtcpTuple->Send(data, len);

		// Increase send transmission.
		RTC::Transport::DataSent(len);
	}

	void PlainTransport::SendMessage(
	  RTC::DataConsumer* dataConsumer, uint32_t ppid, const uint8_t* msg, size_t len, onQueuedCallback* cb)
	{
		MS_TRACE();

		this->sctpAssociation->SendSctpMessage(dataConsumer, ppid, msg, len, cb);
	}

	void PlainTransport::SendSctpData(const uint8_t* data, size_t len)
	{
		MS_TRACE();

		if (!IsConnected())
			return;

		this->tuple->Send(data, len);

		// Increase send transmission.
		RTC::Transport::DataSent(len);
	}

	void PlainTransport::RecvStreamClosed(uint32_t ssrc)
	{
		MS_TRACE();

		if (this->srtpRecvSession)
		{
			this->srtpRecvSession->RemoveStream(ssrc);
		}
	}

	void PlainTransport::SendStreamClosed(uint32_t ssrc)
	{
		MS_TRACE();

		if (this->srtpSendSession)
		{
			this->srtpSendSession->RemoveStream(ssrc);
		}
	}

	inline void PlainTransport::OnPacketReceived(RTC::TransportTuple* tuple, const uint8_t* data, size_t len)
	{
		MS_TRACE();

		// Increase receive transmission.
		RTC::Transport::DataReceived(len);

		// Check if it's RTCP.
		if (RTC::RTCP::Packet::IsRtcp(data, len))
		{
			OnRtcpDataReceived(tuple, data, len);
		}
		// Check if it's RTP.
		else if (RTC::RtpPacket::IsRtp(data, len))
		{
			OnRtpDataReceived(tuple, data, len);
		}
		// Check if it's SCTP.
		else if (RTC::SctpAssociation::IsSctp(data, len))
		{
			OnSctpDataReceived(tuple, data, len);
		}
		else
		{
			MS_WARN_DEV("ignoring received packet of unknown type");
		}
	}

	inline void PlainTransport::OnRtpDataReceived(
	  RTC::TransportTuple* tuple, const uint8_t* data, size_t len)
	{
		MS_TRACE();

		if (HasSrtp() && !IsSrtpReady())
			return;

		// Decrypt the SRTP packet.
		auto intLen = static_cast<int>(len);

		if (HasSrtp() && !this->srtpRecvSession->DecryptSrtp(const_cast<uint8_t*>(data), &intLen))
		{
			RTC::RtpPacket* packet = RTC::RtpPacket::Parse(data, static_cast<size_t>(intLen));

			if (!packet)
			{
				MS_WARN_TAG(srtp, "DecryptSrtp() failed due to an invalid RTP packet");
			}
			else
			{
				MS_WARN_TAG(
				  srtp,
				  "DecryptSrtp() failed [ssrc:%" PRIu32 ", payloadType:%" PRIu8 ", seq:%" PRIu16 "]",
				  packet->GetSsrc(),
				  packet->GetPayloadType(),
				  packet->GetSequenceNumber());

				delete packet;
			}

			return;
		}

		RTC::RtpPacket* packet = RTC::RtpPacket::Parse(data, static_cast<size_t>(intLen));

		if (!packet)
		{
			MS_WARN_TAG(rtp, "received data is not a valid RTP packet");

			return;
		}

		// If we don't have a RTP tuple yet, check whether comedia mode is set.
		if (!this->tuple)
		{
			if (!this->comedia)
			{
				MS_DEBUG_TAG(rtp, "ignoring RTP packet while not connected");

				// Remove this SSRC.
				RecvStreamClosed(packet->GetSsrc());

				delete packet;

				return;
			}

			MS_DEBUG_TAG(rtp, "setting RTP tuple (comedia mode enabled)");

			auto wasConnected = IsConnected();

			this->tuple = new RTC::TransportTuple(tuple);

			if (!this->listenIp.announcedIp.empty())
				this->tuple->SetLocalAnnouncedIp(this->listenIp.announcedIp);

			// If not yet connected do it now.
			if (!wasConnected)
			{
				// Notify the Node PlainTransport.
				EmitTuple();

				RTC::Transport::Connected();
			}
		}
		// Otherwise, if RTP tuple is set, verify that it matches the origin
		// of the packet.
		else if (!this->tuple->Compare(tuple))
		{
			MS_DEBUG_TAG(rtp, "ignoring RTP packet from unknown IP:port");

			// Remove this SSRC.
			RecvStreamClosed(packet->GetSsrc());

			delete packet;

			return;
		}

		// Pass the packet to the parent transport.
		RTC::Transport::ReceiveRtpPacket(packet);
	}

	inline void PlainTransport::OnRtcpDataReceived(
	  RTC::TransportTuple* tuple, const uint8_t* data, size_t len)
	{
		MS_TRACE();

		if (HasSrtp() && !IsSrtpReady())
			return;

		// Decrypt the SRTCP packet.
		auto intLen = static_cast<int>(len);

		if (HasSrtp() && !this->srtpRecvSession->DecryptSrtcp(const_cast<uint8_t*>(data), &intLen))
		{
			return;
		}

		// If we don't have a RTP tuple yet, check whether RTCP-mux and comedia
		// mode are set.
		if (this->rtcpMux && !this->tuple)
		{
			if (!this->comedia)
			{
				MS_DEBUG_TAG(rtcp, "ignoring RTCP packet while not connected");

				return;
			}

			MS_DEBUG_TAG(rtp, "setting RTP tuple (comedia mode enabled)");

			auto wasConnected = IsConnected();

			this->tuple = new RTC::TransportTuple(tuple);

			if (!this->listenIp.announcedIp.empty())
				this->tuple->SetLocalAnnouncedIp(this->listenIp.announcedIp);

			// If not yet connected do it now.
			if (!wasConnected)
			{
				// Notify the Node PlainTransport.
				EmitTuple();

				RTC::Transport::Connected();
			}
		}
		// Otherwise, if RTCP-mux is unset and RTCP tuple is unset, set it if we
		// are in comedia mode.
		else if (!this->rtcpMux && !this->rtcpTuple)
		{
			if (!this->comedia)
			{
				MS_DEBUG_TAG(rtcp, "ignoring RTCP packet while not connected");

				return;
			}

			MS_DEBUG_TAG(rtcp, "setting RTCP tuple (comedia mode enabled)");

			this->rtcpTuple = new RTC::TransportTuple(tuple);

			if (!this->listenIp.announcedIp.empty())
				this->rtcpTuple->SetLocalAnnouncedIp(this->listenIp.announcedIp);

			// Notify the Node PlainTransport.
			EmitRtcpTuple();
		}
		// If RTCP-mux verify that the packet's tuple matches our RTP tuple.
		else if (this->rtcpMux && !this->tuple->Compare(tuple))
		{
			MS_DEBUG_TAG(rtcp, "ignoring RTCP packet from unknown IP:port");

			return;
		}
		// If no RTCP-mux verify that the packet's tuple matches our RTCP tuple.
		else if (!this->rtcpMux && !this->rtcpTuple->Compare(tuple))
		{
			MS_DEBUG_TAG(rtcp, "ignoring RTCP packet from unknown IP:port");

			return;
		}

		RTC::RTCP::Packet* packet = RTC::RTCP::Packet::Parse(data, static_cast<size_t>(intLen));

		if (!packet)
		{
			MS_WARN_TAG(rtcp, "received data is not a valid RTCP compound or single packet");

			return;
		}

		// Pass the packet to the parent transport.
		RTC::Transport::ReceiveRtcpPacket(packet);
	}

	inline void PlainTransport::OnSctpDataReceived(
	  RTC::TransportTuple* tuple, const uint8_t* data, size_t len)
	{
		MS_TRACE();

		// If we don't have a RTP tuple yet, check whether comedia mode is set.
		if (!this->tuple)
		{
			if (!this->comedia)
			{
				MS_DEBUG_TAG(sctp, "ignoring SCTP packet while not connected");

				return;
			}

			MS_DEBUG_TAG(sctp, "setting RTP/SCTP tuple (comedia mode enabled)");

			auto wasConnected = IsConnected();

			this->tuple = new RTC::TransportTuple(tuple);

			if (!this->listenIp.announcedIp.empty())
				this->tuple->SetLocalAnnouncedIp(this->listenIp.announcedIp);

			// If not yet connected do it now.
			if (!wasConnected)
			{
				// Notify the Node PlainTransport.
				EmitTuple();

				RTC::Transport::Connected();
			}
		}
		// Otherwise, if RTP tuple is set, verify that it matches the origin
		// of the packet.
		if (!this->tuple->Compare(tuple))
		{
			MS_DEBUG_TAG(sctp, "ignoring SCTP packet from unknown IP:port");

			return;
		}

		// Pass it to the parent transport.
		RTC::Transport::ReceiveSctpData(data, len);
	}

	inline void PlainTransport::EmitTuple() const
	{
		auto tuple = this->tuple->FillBuffer(this->shared->channelNotifier->GetBufferBuilder());
		auto notification = FBS::PlainTransport::CreateTupleNotification(
				this->shared->channelNotifier->GetBufferBuilder(),
				tuple);

		this->shared->channelNotifier->Emit(
				this->id,
				FBS::Notification::Event::PLAINTRANSPORT_TUPLE,
				FBS::Notification::Body::FBS_PlainTransport_TupleNotification,
				notification);
	}

	inline void PlainTransport::EmitRtcpTuple() const
	{
		auto rtcpTuple = this->rtcpTuple->FillBuffer(this->shared->channelNotifier->GetBufferBuilder());
		auto notification = FBS::PlainTransport::CreateRtcpTupleNotification(
				this->shared->channelNotifier->GetBufferBuilder(),
				rtcpTuple);

		this->shared->channelNotifier->Emit(
				this->id,
				FBS::Notification::Event::PLAINTRANSPORT_RTCP_TUPLE,
				FBS::Notification::Body::FBS_PlainTransport_RtcpTupleNotification,
				notification);
	}

	inline void PlainTransport::OnUdpSocketPacketReceived(
	  RTC::UdpSocket* socket, const uint8_t* data, size_t len, const struct sockaddr* remoteAddr)
	{
		MS_TRACE();

		RTC::TransportTuple tuple(socket, remoteAddr);

		OnPacketReceived(&tuple, data, len);
	}
} // namespace RTC
