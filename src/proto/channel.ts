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

export enum CreateChannelErrors {
  Unauthorized = 0,
  IsAlreadyExist = 1,
  UNRECOGNIZED = -1,
}

export function createChannelErrorsFromJSON(object: any): CreateChannelErrors {
  switch (object) {
    case 0:
    case "Unauthorized":
      return CreateChannelErrors.Unauthorized;
    case 1:
    case "IsAlreadyExist":
      return CreateChannelErrors.IsAlreadyExist;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CreateChannelErrors.UNRECOGNIZED;
  }
}

export function createChannelErrorsToJSON(object: CreateChannelErrors): string {
  switch (object) {
    case CreateChannelErrors.Unauthorized:
      return "Unauthorized";
    case CreateChannelErrors.IsAlreadyExist:
      return "IsAlreadyExist";
    case CreateChannelErrors.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Channel {
  identifier: string;
  createdAt?: Date;
  maxParticipants: number;
  status: ChannelStatus;
  customData?: CustomData | undefined;
}

export interface CreateChannelResponse {
  errors: CreateChannelErrors[];
  channel?: Channel | undefined;
}

export interface CreateChannelReq {
  identifier: string;
  maxParticipants: number;
  customData?: CustomData | undefined;
}

export interface CustomData {
  data: { [key: string]: string };
}

export interface CustomData_DataEntry {
  key: string;
  value: string;
}

function createBaseChannel(): Channel {
  return { identifier: "", createdAt: undefined, maxParticipants: 0, status: 0, customData: undefined };
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
    if (message.customData !== undefined) {
      CustomData.encode(message.customData, writer.uint32(42).fork()).ldelim();
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
        case 5:
          message.customData = CustomData.decode(reader, reader.uint32());
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
      customData: isSet(object.customData) ? CustomData.fromJSON(object.customData) : undefined,
    };
  },

  toJSON(message: Channel): unknown {
    const obj: any = {};
    message.identifier !== undefined && (obj.identifier = message.identifier);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.maxParticipants !== undefined && (obj.maxParticipants = Math.round(message.maxParticipants));
    message.status !== undefined && (obj.status = channelStatusToJSON(message.status));
    message.customData !== undefined &&
      (obj.customData = message.customData ? CustomData.toJSON(message.customData) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Channel>, I>>(object: I): Channel {
    const message = createBaseChannel();
    message.identifier = object.identifier ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.maxParticipants = object.maxParticipants ?? 0;
    message.status = object.status ?? 0;
    message.customData = (object.customData !== undefined && object.customData !== null)
      ? CustomData.fromPartial(object.customData)
      : undefined;
    return message;
  },
};

function createBaseCreateChannelResponse(): CreateChannelResponse {
  return { errors: [], channel: undefined };
}

export const CreateChannelResponse = {
  encode(message: CreateChannelResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.errors) {
      writer.int32(v);
    }
    writer.ldelim();
    if (message.channel !== undefined) {
      Channel.encode(message.channel, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateChannelResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateChannelResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.errors.push(reader.int32() as any);
            }
          } else {
            message.errors.push(reader.int32() as any);
          }
          break;
        case 2:
          message.channel = Channel.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateChannelResponse {
    return {
      errors: Array.isArray(object?.errors) ? object.errors.map((e: any) => createChannelErrorsFromJSON(e)) : [],
      channel: isSet(object.channel) ? Channel.fromJSON(object.channel) : undefined,
    };
  },

  toJSON(message: CreateChannelResponse): unknown {
    const obj: any = {};
    if (message.errors) {
      obj.errors = message.errors.map((e) => createChannelErrorsToJSON(e));
    } else {
      obj.errors = [];
    }
    message.channel !== undefined && (obj.channel = message.channel ? Channel.toJSON(message.channel) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateChannelResponse>, I>>(object: I): CreateChannelResponse {
    const message = createBaseCreateChannelResponse();
    message.errors = object.errors?.map((e) => e) || [];
    message.channel = (object.channel !== undefined && object.channel !== null)
      ? Channel.fromPartial(object.channel)
      : undefined;
    return message;
  },
};

function createBaseCreateChannelReq(): CreateChannelReq {
  return { identifier: "", maxParticipants: 0, customData: undefined };
}

export const CreateChannelReq = {
  encode(message: CreateChannelReq, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.identifier !== "") {
      writer.uint32(10).string(message.identifier);
    }
    if (message.maxParticipants !== 0) {
      writer.uint32(16).int64(message.maxParticipants);
    }
    if (message.customData !== undefined) {
      CustomData.encode(message.customData, writer.uint32(26).fork()).ldelim();
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
        case 2:
          message.maxParticipants = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.customData = CustomData.decode(reader, reader.uint32());
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
      customData: isSet(object.customData) ? CustomData.fromJSON(object.customData) : undefined,
    };
  },

  toJSON(message: CreateChannelReq): unknown {
    const obj: any = {};
    message.identifier !== undefined && (obj.identifier = message.identifier);
    message.maxParticipants !== undefined && (obj.maxParticipants = Math.round(message.maxParticipants));
    message.customData !== undefined &&
      (obj.customData = message.customData ? CustomData.toJSON(message.customData) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateChannelReq>, I>>(object: I): CreateChannelReq {
    const message = createBaseCreateChannelReq();
    message.identifier = object.identifier ?? "";
    message.maxParticipants = object.maxParticipants ?? 0;
    message.customData = (object.customData !== undefined && object.customData !== null)
      ? CustomData.fromPartial(object.customData)
      : undefined;
    return message;
  },
};

function createBaseCustomData(): CustomData {
  return { data: {} };
}

export const CustomData = {
  encode(message: CustomData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.data).forEach(([key, value]) => {
      CustomData_DataEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CustomData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCustomData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = CustomData_DataEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.data[entry1.key] = entry1.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CustomData {
    return {
      data: isObject(object.data)
        ? Object.entries(object.data).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: CustomData): unknown {
    const obj: any = {};
    obj.data = {};
    if (message.data) {
      Object.entries(message.data).forEach(([k, v]) => {
        obj.data[k] = v;
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CustomData>, I>>(object: I): CustomData {
    const message = createBaseCustomData();
    message.data = Object.entries(object.data ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseCustomData_DataEntry(): CustomData_DataEntry {
  return { key: "", value: "" };
}

export const CustomData_DataEntry = {
  encode(message: CustomData_DataEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CustomData_DataEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCustomData_DataEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CustomData_DataEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: CustomData_DataEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CustomData_DataEntry>, I>>(object: I): CustomData_DataEntry {
    const message = createBaseCustomData_DataEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

export interface ChannelService {
  CreateChannel(request: CreateChannelReq): Promise<CreateChannelResponse>;
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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
