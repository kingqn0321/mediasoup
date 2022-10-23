import * as flatbuffers from 'flatbuffers';
export declare class IceSelectedTuple {
    bb: flatbuffers.ByteBuffer | null;
    bb_pos: number;
    __init(i: number, bb: flatbuffers.ByteBuffer): IceSelectedTuple;
    static getRootAsIceSelectedTuple(bb: flatbuffers.ByteBuffer, obj?: IceSelectedTuple): IceSelectedTuple;
    static getSizePrefixedRootAsIceSelectedTuple(bb: flatbuffers.ByteBuffer, obj?: IceSelectedTuple): IceSelectedTuple;
    localIp(): string | null;
    localIp(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
    localPort(): number;
    remoteIp(): string | null;
    remoteIp(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
    remotePort(): number;
    protocol(): string | null;
    protocol(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
    static startIceSelectedTuple(builder: flatbuffers.Builder): void;
    static addLocalIp(builder: flatbuffers.Builder, localIpOffset: flatbuffers.Offset): void;
    static addLocalPort(builder: flatbuffers.Builder, localPort: number): void;
    static addRemoteIp(builder: flatbuffers.Builder, remoteIpOffset: flatbuffers.Offset): void;
    static addRemotePort(builder: flatbuffers.Builder, remotePort: number): void;
    static addProtocol(builder: flatbuffers.Builder, protocolOffset: flatbuffers.Offset): void;
    static endIceSelectedTuple(builder: flatbuffers.Builder): flatbuffers.Offset;
    static createIceSelectedTuple(builder: flatbuffers.Builder, localIpOffset: flatbuffers.Offset, localPort: number, remoteIpOffset: flatbuffers.Offset, remotePort: number, protocolOffset: flatbuffers.Offset): flatbuffers.Offset;
    unpack(): IceSelectedTupleT;
    unpackTo(_o: IceSelectedTupleT): void;
}
export declare class IceSelectedTupleT {
    localIp: string | Uint8Array | null;
    localPort: number;
    remoteIp: string | Uint8Array | null;
    remotePort: number;
    protocol: string | Uint8Array | null;
    constructor(localIp?: string | Uint8Array | null, localPort?: number, remoteIp?: string | Uint8Array | null, remotePort?: number, protocol?: string | Uint8Array | null);
    pack(builder: flatbuffers.Builder): flatbuffers.Offset;
}
//# sourceMappingURL=ice-selected-tuple.d.ts.map