import * as flatbuffers from 'flatbuffers';
import { ChannelMessageHandlers } from '../../f-b-s/worker/channel-message-handlers';
export declare class DumpResponse {
    bb: flatbuffers.ByteBuffer | null;
    bb_pos: number;
    __init(i: number, bb: flatbuffers.ByteBuffer): DumpResponse;
    static getRootAsDumpResponse(bb: flatbuffers.ByteBuffer, obj?: DumpResponse): DumpResponse;
    static getSizePrefixedRootAsDumpResponse(bb: flatbuffers.ByteBuffer, obj?: DumpResponse): DumpResponse;
    pid(): bigint;
    webrtcServerIds(index: number): string;
    webrtcServerIds(index: number, optionalEncoding: flatbuffers.Encoding): string | Uint8Array;
    webrtcServerIdsLength(): number;
    routerIds(index: number): string;
    routerIds(index: number, optionalEncoding: flatbuffers.Encoding): string | Uint8Array;
    routerIdsLength(): number;
    channelMessageHandlers(obj?: ChannelMessageHandlers): ChannelMessageHandlers | null;
    static startDumpResponse(builder: flatbuffers.Builder): void;
    static addPid(builder: flatbuffers.Builder, pid: bigint): void;
    static addWebrtcServerIds(builder: flatbuffers.Builder, webrtcServerIdsOffset: flatbuffers.Offset): void;
    static createWebrtcServerIdsVector(builder: flatbuffers.Builder, data: flatbuffers.Offset[]): flatbuffers.Offset;
    static startWebrtcServerIdsVector(builder: flatbuffers.Builder, numElems: number): void;
    static addRouterIds(builder: flatbuffers.Builder, routerIdsOffset: flatbuffers.Offset): void;
    static createRouterIdsVector(builder: flatbuffers.Builder, data: flatbuffers.Offset[]): flatbuffers.Offset;
    static startRouterIdsVector(builder: flatbuffers.Builder, numElems: number): void;
    static addChannelMessageHandlers(builder: flatbuffers.Builder, channelMessageHandlersOffset: flatbuffers.Offset): void;
    static endDumpResponse(builder: flatbuffers.Builder): flatbuffers.Offset;
    static finishDumpResponseBuffer(builder: flatbuffers.Builder, offset: flatbuffers.Offset): void;
    static finishSizePrefixedDumpResponseBuffer(builder: flatbuffers.Builder, offset: flatbuffers.Offset): void;
}
//# sourceMappingURL=dump-response.d.ts.map