"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePipeTransportDump = exports.PipeTransport = void 0;
const uuid_1 = require("uuid");
const Logger_1 = require("./Logger");
const ortc = require("./ortc");
const Transport_1 = require("./Transport");
const Consumer_1 = require("./Consumer");
const RtpParameters_1 = require("./RtpParameters");
const SrtpParameters_1 = require("./SrtpParameters");
const media_kind_1 = require("./fbs/fbs/rtp-parameters/media-kind");
const FbsRequest = require("./fbs/request_generated");
const FbsResponse = require("./fbs/response_generated");
const FbsTransport = require("./fbs/transport_generated");
const logger = new Logger_1.Logger('PipeTransport');
class PipeTransport extends Transport_1.Transport {
    // PipeTransport data.
    #data;
    /**
     * @private
     */
    constructor(options) {
        super(options);
        logger.debug('constructor()');
        const { data } = options;
        this.#data =
            {
                tuple: data.tuple,
                sctpParameters: data.sctpParameters,
                sctpState: data.sctpState,
                rtx: data.rtx,
                srtpParameters: data.srtpParameters
            };
        this.handleWorkerNotifications();
    }
    /**
     * Transport tuple.
     */
    get tuple() {
        return this.#data.tuple;
    }
    /**
     * SCTP parameters.
     */
    get sctpParameters() {
        return this.#data.sctpParameters;
    }
    /**
     * SCTP state.
     */
    get sctpState() {
        return this.#data.sctpState;
    }
    /**
     * SRTP parameters.
     */
    get srtpParameters() {
        return this.#data.srtpParameters;
    }
    /**
     * Close the PipeTransport.
     *
     * @override
     */
    close() {
        if (this.closed)
            return;
        if (this.#data.sctpState)
            this.#data.sctpState = 'closed';
        super.close();
    }
    /**
     * Router was closed.
     *
     * @private
     * @override
     */
    routerClosed() {
        if (this.closed)
            return;
        if (this.#data.sctpState)
            this.#data.sctpState = 'closed';
        super.routerClosed();
    }
    /**
     * Get PipeTransport stats.
     *
     * @override
     */
    async getStats() {
        logger.debug('getStats()');
        return this.channel.request('transport.getStats', this.internal.transportId);
    }
    /**
     * Provide the PipeTransport remote parameters.
     *
     * @override
     */
    async connect({ ip, port, srtpParameters }) {
        logger.debug('connect()');
        const reqData = { ip, port, srtpParameters };
        const data = await this.channel.request('transport.connect', this.internal.transportId, reqData);
        // Update data.
        this.#data.tuple = data.tuple;
    }
    /**
     * Create a pipe Consumer.
     *
     * @override
     */
    async consume({ producerId, appData }) {
        logger.debug('consume()');
        if (!producerId || typeof producerId !== 'string')
            throw new TypeError('missing producerId');
        else if (appData && typeof appData !== 'object')
            throw new TypeError('if given, appData must be an object');
        const producer = this.getProducerById(producerId);
        if (!producer)
            throw Error(`Producer with id "${producerId}" not found`);
        // This may throw.
        const rtpParameters = ortc.getPipeConsumerRtpParameters(producer.consumableRtpParameters, this.#data.rtx);
        const consumerId = (0, uuid_1.v4)();
        const consumeRequestOffset = createConsumeRequest({
            builder: this.channel.bufferBuilder,
            consumerId,
            producer,
            rtpParameters
        });
        const response = await this.channel.requestBinary(FbsRequest.Method.TRANSPORT_CONSUME, FbsRequest.Body.FBS_Transport_ConsumeRequest, consumeRequestOffset, this.internal.transportId);
        /* Decode the response. */
        const consumeResponse = new FbsResponse.ConsumeResponse();
        response.body(consumeResponse);
        const status = consumeResponse.unpack();
        const data = {
            producerId,
            kind: producer.kind,
            rtpParameters,
            type: 'pipe'
        };
        const consumer = new Consumer_1.Consumer({
            internal: {
                ...this.internal,
                consumerId
            },
            data,
            channel: this.channel,
            payloadChannel: this.payloadChannel,
            appData,
            paused: status.paused,
            producerPaused: status.producerPaused
        });
        this.consumers.set(consumer.id, consumer);
        consumer.on('@close', () => this.consumers.delete(consumer.id));
        consumer.on('@producerclose', () => this.consumers.delete(consumer.id));
        // Emit observer event.
        this.observer.safeEmit('newconsumer', consumer);
        return consumer;
    }
    handleWorkerNotifications() {
        this.channel.on(this.internal.transportId, (event, data) => {
            switch (event) {
                case 'sctpstatechange':
                    {
                        const sctpState = data.sctpState;
                        this.#data.sctpState = sctpState;
                        this.safeEmit('sctpstatechange', sctpState);
                        // Emit observer event.
                        this.observer.safeEmit('sctpstatechange', sctpState);
                        break;
                    }
                case 'trace':
                    {
                        const trace = data;
                        this.safeEmit('trace', trace);
                        // Emit observer event.
                        this.observer.safeEmit('trace', trace);
                        break;
                    }
                default:
                    {
                        logger.error('ignoring unknown event "%s"', event);
                    }
            }
        });
    }
}
exports.PipeTransport = PipeTransport;
/*
 * flatbuffers helpers
 */
function createConsumeRequest({ builder, consumerId, producer, rtpParameters }) {
    // Build the request.
    const producerIdOffset = builder.createString(producer.id);
    const consumerIdOffset = builder.createString(consumerId);
    const rtpParametersOffset = (0, RtpParameters_1.serializeRtpParameters)(builder, rtpParameters);
    let consumableRtpEncodingsOffset;
    if (producer.consumableRtpParameters.encodings) {
        consumableRtpEncodingsOffset = (0, RtpParameters_1.serializeRtpEncodingParameters)(builder, producer.consumableRtpParameters.encodings);
    }
    const ConsumeRequest = FbsRequest.ConsumeRequest;
    // Create Consume Request.
    ConsumeRequest.startConsumeRequest(builder);
    ConsumeRequest.addConsumerId(builder, consumerIdOffset);
    ConsumeRequest.addProducerId(builder, producerIdOffset);
    ConsumeRequest.addKind(builder, producer.kind === 'audio' ? media_kind_1.MediaKind.AUDIO : media_kind_1.MediaKind.VIDEO);
    ConsumeRequest.addRtpParameters(builder, rtpParametersOffset);
    ConsumeRequest.addType(builder, FbsTransport.Type.PIPE);
    if (consumableRtpEncodingsOffset)
        ConsumeRequest.addConsumableRtpEncodings(builder, consumableRtpEncodingsOffset);
    return ConsumeRequest.endConsumeRequest(builder);
}
function parsePipeTransportDump(binary) {
    // Retrieve BaseTransportDump.
    const fbsBaseTransportDump = new FbsTransport.BaseTransportDump();
    binary.base().data(fbsBaseTransportDump);
    const baseTransportDump = (0, Transport_1.parseBaseTransportDump)(fbsBaseTransportDump);
    // Retrieve RTP Tuple.
    const tuple = (0, Transport_1.parseTuple)(binary.tuple());
    // Retrieve RT	// Retrieve SRTP Parameters.
    let srtpParameters;
    if (binary.srtpParameters()) {
        srtpParameters = (0, SrtpParameters_1.parseSrtpParameters)(binary.srtpParameters());
    }
    return {
        ...baseTransportDump,
        tuple: tuple,
        rtx: binary.rtx(),
        srtpParameters: srtpParameters
    };
}
exports.parsePipeTransportDump = parsePipeTransportDump;
