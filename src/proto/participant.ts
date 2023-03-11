/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Timestamp } from "./google/protobuf/timestamp";

export const protobufPackage = "participant";

export enum ParticipantStatus {
  Active = 0,
  Banned = 1,
  UNRECOGNIZED = -1,
}

export function participantStatusFromJSON(object: any): ParticipantStatus {
  switch (object) {
    case 0:
    case "Active":
      return ParticipantStatus.Active;
    case 1:
    case "Banned":
      return ParticipantStatus.Banned;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ParticipantStatus.UNRECOGNIZED;
  }
}

export function participantStatusToJSON(object: ParticipantStatus): string {
  switch (object) {
    case ParticipantStatus.Active:
      return "Active";
    case ParticipantStatus.Banned:
      return "Banned";
    case ParticipantStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ParticipantCreateRes {
  participant?: Participant;
  accessToken: string;
  grants?: ChannelParticipantGrants;
}

export interface ChannelParticipantGrants {
  sendMessage: boolean;
  readMessages: boolean;
  admin: boolean;
}

export interface Participant {
  identifier: string;
  createdAt?: Date;
  status: ParticipantStatus;
  channelId: string;
}

export interface AddParticipantToChannelReq {
  identifier: string;
  channelId: string;
  grants?: ChannelParticipantGrants;
}

function createBaseParticipantCreateRes(): ParticipantCreateRes {
  return { participant: undefined, accessToken: "", grants: undefined };
}

export const ParticipantCreateRes = {
  encode(message: ParticipantCreateRes, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.participant !== undefined) {
      Participant.encode(message.participant, writer.uint32(10).fork()).ldelim();
    }
    if (message.accessToken !== "") {
      writer.uint32(18).string(message.accessToken);
    }
    if (message.grants !== undefined) {
      ChannelParticipantGrants.encode(message.grants, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ParticipantCreateRes {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParticipantCreateRes();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.participant = Participant.decode(reader, reader.uint32());
          break;
        case 2:
          message.accessToken = reader.string();
          break;
        case 3:
          message.grants = ChannelParticipantGrants.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ParticipantCreateRes {
    return {
      participant: isSet(object.participant) ? Participant.fromJSON(object.participant) : undefined,
      accessToken: isSet(object.accessToken) ? String(object.accessToken) : "",
      grants: isSet(object.grants) ? ChannelParticipantGrants.fromJSON(object.grants) : undefined,
    };
  },

  toJSON(message: ParticipantCreateRes): unknown {
    const obj: any = {};
    message.participant !== undefined &&
      (obj.participant = message.participant ? Participant.toJSON(message.participant) : undefined);
    message.accessToken !== undefined && (obj.accessToken = message.accessToken);
    message.grants !== undefined &&
      (obj.grants = message.grants ? ChannelParticipantGrants.toJSON(message.grants) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ParticipantCreateRes>, I>>(object: I): ParticipantCreateRes {
    const message = createBaseParticipantCreateRes();
    message.participant = (object.participant !== undefined && object.participant !== null)
      ? Participant.fromPartial(object.participant)
      : undefined;
    message.accessToken = object.accessToken ?? "";
    message.grants = (object.grants !== undefined && object.grants !== null)
      ? ChannelParticipantGrants.fromPartial(object.grants)
      : undefined;
    return message;
  },
};

function createBaseChannelParticipantGrants(): ChannelParticipantGrants {
  return { sendMessage: false, readMessages: false, admin: false };
}

export const ChannelParticipantGrants = {
  encode(message: ChannelParticipantGrants, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sendMessage === true) {
      writer.uint32(8).bool(message.sendMessage);
    }
    if (message.readMessages === true) {
      writer.uint32(16).bool(message.readMessages);
    }
    if (message.admin === true) {
      writer.uint32(24).bool(message.admin);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelParticipantGrants {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelParticipantGrants();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sendMessage = reader.bool();
          break;
        case 2:
          message.readMessages = reader.bool();
          break;
        case 3:
          message.admin = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChannelParticipantGrants {
    return {
      sendMessage: isSet(object.sendMessage) ? Boolean(object.sendMessage) : false,
      readMessages: isSet(object.readMessages) ? Boolean(object.readMessages) : false,
      admin: isSet(object.admin) ? Boolean(object.admin) : false,
    };
  },

  toJSON(message: ChannelParticipantGrants): unknown {
    const obj: any = {};
    message.sendMessage !== undefined && (obj.sendMessage = message.sendMessage);
    message.readMessages !== undefined && (obj.readMessages = message.readMessages);
    message.admin !== undefined && (obj.admin = message.admin);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ChannelParticipantGrants>, I>>(object: I): ChannelParticipantGrants {
    const message = createBaseChannelParticipantGrants();
    message.sendMessage = object.sendMessage ?? false;
    message.readMessages = object.readMessages ?? false;
    message.admin = object.admin ?? false;
    return message;
  },
};

function createBaseParticipant(): Participant {
  return { identifier: "", createdAt: undefined, status: 0, channelId: "" };
}

export const Participant = {
  encode(message: Participant, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.identifier !== "") {
      writer.uint32(10).string(message.identifier);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(18).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(24).int32(message.status);
    }
    if (message.channelId !== "") {
      writer.uint32(34).string(message.channelId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Participant {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParticipant();
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
          message.status = reader.int32() as any;
          break;
        case 4:
          message.channelId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Participant {
    return {
      identifier: isSet(object.identifier) ? String(object.identifier) : "",
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      status: isSet(object.status) ? participantStatusFromJSON(object.status) : 0,
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
    };
  },

  toJSON(message: Participant): unknown {
    const obj: any = {};
    message.identifier !== undefined && (obj.identifier = message.identifier);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.status !== undefined && (obj.status = participantStatusToJSON(message.status));
    message.channelId !== undefined && (obj.channelId = message.channelId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Participant>, I>>(object: I): Participant {
    const message = createBaseParticipant();
    message.identifier = object.identifier ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.status = object.status ?? 0;
    message.channelId = object.channelId ?? "";
    return message;
  },
};

function createBaseAddParticipantToChannelReq(): AddParticipantToChannelReq {
  return { identifier: "", channelId: "", grants: undefined };
}

export const AddParticipantToChannelReq = {
  encode(message: AddParticipantToChannelReq, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.identifier !== "") {
      writer.uint32(10).string(message.identifier);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    if (message.grants !== undefined) {
      ChannelParticipantGrants.encode(message.grants, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddParticipantToChannelReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddParticipantToChannelReq();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.identifier = reader.string();
          break;
        case 2:
          message.channelId = reader.string();
          break;
        case 5:
          message.grants = ChannelParticipantGrants.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddParticipantToChannelReq {
    return {
      identifier: isSet(object.identifier) ? String(object.identifier) : "",
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
      grants: isSet(object.grants) ? ChannelParticipantGrants.fromJSON(object.grants) : undefined,
    };
  },

  toJSON(message: AddParticipantToChannelReq): unknown {
    const obj: any = {};
    message.identifier !== undefined && (obj.identifier = message.identifier);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    message.grants !== undefined &&
      (obj.grants = message.grants ? ChannelParticipantGrants.toJSON(message.grants) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AddParticipantToChannelReq>, I>>(object: I): AddParticipantToChannelReq {
    const message = createBaseAddParticipantToChannelReq();
    message.identifier = object.identifier ?? "";
    message.channelId = object.channelId ?? "";
    message.grants = (object.grants !== undefined && object.grants !== null)
      ? ChannelParticipantGrants.fromPartial(object.grants)
      : undefined;
    return message;
  },
};

export interface ParticipantService {
  AddParticipantToChannel(request: AddParticipantToChannelReq): Promise<Participant>;
}

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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
