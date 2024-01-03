import {
    IAddParticipantToChannelArgs,
    IGetChannelAccessTokenArgs,
} from '../types/participant.types';
import {IClientArgs, ServiceResponse} from '../types/common.types';

import { Rpc, TwirpRpc } from '../common/TwirpRPC';
import { RPCPackages } from '../common/const/RPCPackages';
import {
    AddParticipantToChannelReq,
    AddParticipantToChannelRes,
    GetParticipantAccessTokenReq, GetParticipantAccessTokenRes,
} from '../proto/participant';
import BaseService from './BaseService';
import {AddParticipantToChannelError, GetAccessTokenError} from "./errors/ParticipantErrors";

const svc = 'ParticipantService';

export class ParticipantClient extends BaseService {
    private readonly rpc: Rpc;

    constructor ({
        apiHost,
        apiKey,
        secretKey,
    }:IClientArgs) {
        super(apiKey, secretKey);

        this.rpc = new TwirpRpc({
            host: apiHost,
            pkg: RPCPackages.Participant,
        });
    }

    public async addParticipantToChannel({
        identifier,
        channelId,
        grants,
        customData,
    }:IAddParticipantToChannelArgs):Promise<ServiceResponse<AddParticipantToChannelRes>> {
        const req = AddParticipantToChannelReq.toJSON({
            channelId,
            identifier,
            grants,
            customData: customData ? { data: { ...customData } }  : undefined,
        });

        const data = await this.rpc.request({
            service: svc,
            method: 'AddParticipantToChannel',
            data: req,
            headers: this.rootAuthHeader(),
        }) as AddParticipantToChannelRes;

        if (data.errors.length > 0) {
            throw new AddParticipantToChannelError(data)
        }

        return data;
    }

    public async getAccessToken({
        identifier,
        channelId,
    }:IGetChannelAccessTokenArgs):Promise<ServiceResponse<GetParticipantAccessTokenRes>> {
        const req = GetParticipantAccessTokenReq.toJSON({
            identifier,
            channelId,
        });

        const data = await this.rpc.request({
            service: svc,
            method: 'GetParticipantAccessToken',
            data: req,
            headers: this.rootAuthHeader(),
        }) as GetParticipantAccessTokenRes;

        if (data.errors.length > 0) {
            throw new GetAccessTokenError(data);
        }
        return data;
    }
}
