import { ICreateChannelArgs } from '../types/channel.types';
import { IClientArgs } from '../types/common.types';

import { Rpc, TwirpRpc } from '../common/TwirpRPC';
import { RPCPackages } from '../common/const/RPCPackages';
import { Channel, CreateChannelReq, CreateChannelResponse } from '../proto/channel';
import BaseService from './BaseService';
import { CreateChannelError } from './errors/ChannelErrors';

const svc = 'ChannelService';

export class ChannelClient extends BaseService {
    private readonly rpc: Rpc;

    constructor ({
        apiHost,
        apiKey,
        secretKey,
    }:IClientArgs) {
        super(apiKey, secretKey);

        this.rpc = new TwirpRpc({
            host: apiHost,
            pkg: RPCPackages.Channel,
        });
    }

    public async createChannel({
        identifier,
        maxParticipants,
        customData,
    }:ICreateChannelArgs):Promise<Channel> {
        const req = CreateChannelReq.toJSON({
            maxParticipants,
            identifier,
            customData: customData ? { data: customData }  : undefined,
        });

        const response = await this.rpc.request({
            service: svc,
            method: 'CreateChannel',
            data: req,
            headers: this.rootAuthHeader(),
        }) as CreateChannelResponse;

        if (response.errors.length > 0 || !response.channel) {
            throw new CreateChannelError(response);
        }

        return response.channel;
    }
}
