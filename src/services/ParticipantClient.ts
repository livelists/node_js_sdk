import { IAddParticipantToChannelArgs, IGetAccessTokenArgs } from '../types/participant.types';
import { IClientArgs } from '../types/common.types';

import { Rpc, TwirpRpc } from '../common/TwirpRPC';
import { RPCPackages } from '../common/const/RPCPackages';
import {
    Participant,
    AddParticipantToChannelReq,
    AddParticipantToChannelRes,
    GetParticipantAccessTokenReq,
} from '../proto/participant';
import BaseService from './BaseService';

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
    }:IAddParticipantToChannelArgs):Promise<AddParticipantToChannelRes> {
        console.log('send custom Data', customData);
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
        });

        return AddParticipantToChannelRes.fromJSON(data);
    }

    public async getAccessToken({
        identifier,
        channelId,
    }:IGetAccessTokenArgs):Promise<AddParticipantToChannelRes> {
        const req = GetParticipantAccessTokenReq.toJSON({
            identifier,
            channelId,
        });

        const data = await this.rpc.request({
            service: svc,
            method: 'GetParticipantAccessToken',
            data: req,
            headers: this.rootAuthHeader(),
        });

        return AddParticipantToChannelRes.fromJSON(data);
    }
}
