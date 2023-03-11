/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "./google/protobuf/timestamp";

export const protobufPackage = "channel";

export enum ChannelStatus {
  Active = 0,
  Archived = 1,
  UNRECOGNIZED = -1,
}

export function channelStatusFromJSON(object: any): ChannelStatus {
  switch (object) {
    case 0:
    case "Active":
      return ChannelStatus.Active;
    case 1:
    case "Archived":
      return ChannelStatus.Archived;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ChannelStatus.UNRECOGNIZED;
  }
}

export function channelStatusToJSON(object: ChannelStatus): string {
  switch (object) {
    case ChannelStatus.Active:
      return "Active";
    case ChannelStatus.Archived:
      return "Archived";
    case ChannelStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Channel {
  identifier: string;
  createdAt?: Date;
  maxParticipants: number;
  status: ChannelStatus;
}

export interface CreateChannelReq {
  identifier: string;
  maxParticipants: number;
}

function createBaseChannel(): Channel {
  return { identifier: "", createdAt: undefined, maxParticipants: 0, status: 0 };
}

export const Channel = {
  encode(message: Channel, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.identifier !== "") {
      writer.uint32(10).string(message.identifier);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(18).fork()).ldelim();
    }
    if (message.maxParticipants !== 0) {
      writer.uint32(24).int64(message.maxParticipants);
    }
    if (message.status !== 0) {
      writer.uint32(32).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Channel {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.identifier = reader.string();
          break;
        case 2:
          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 3:
          message.maxParticipants = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Channel {
    return {
      identifier: isSet(object.identifier) ? String(object.identifier) : "",
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      maxParticipants: isSet(object.maxParticipants) ? Number(object.maxParticipants) : 0,
      status: isSet(object.status) ? channelStatusFromJSON(object.status) : 0,
    };
  },

  toJSON(message: Channel): unknown {
    const obj: any = {};
    message.identifier !== undefined && (obj.identifier = message.identifier);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.maxParticipants !== undefined && (obj.maxParticipants = Math.round(message.maxParticipants));
    message.status !== undefined && (obj.status = channelStatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Channel>, I>>(object: I): Channel {
    const message = createBaseChannel();
    message.identifier = object.identifier ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.maxParticipants = object.maxParticipants ?? 0;
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseCreateChannelReq(): CreateChannelReq {
  return { identifier: "", maxParticipants: 0 };
}

export const CreateChannelReq = {
  encode(message: CreateChannelReq, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.identifier !== "") {
      writer.uint32(10).string(message.identifier);
    }
    if (message.maxParticipants !== 0) {
      writer.uint32(24).int64(message.maxParticipants);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateChannelReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateChannelReq();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.identifier = reader.string();
          break;
        case 3:
          message.maxParticipants = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateChannelReq {
    return {
      identifier: isSet(object.identifier) ? String(object.identifier) : "",
      maxParticipants: isSet(object.maxParticipants) ? Number(object.maxParticipants) : 0,
    };
  },

  toJSON(message: CreateChannelReq): unknown {
    const obj: any = {};
    message.identifier !== undefined && (obj.identifier = message.identifier);
    message.maxParticipants !== undefined && (obj.maxParticipants = Math.round(message.maxParticipants));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateChannelReq>, I>>(object: I): CreateChannelReq {
    const message = createBaseCreateChannelReq();
    message.identifier = object.identifier ?? "";
    message.maxParticipants = object.maxParticipants ?? 0;
    return message;
  },
};

export interface ChannelService {
  CreateChannel(request: CreateChannelReq): Promise<Channel>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
