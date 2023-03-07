import { IChannelArgs, ICreateChannelArgs } from '../types/channel.types';

import { Rpc, TwirpRpc } from '../common/TwirpRPC';
import { RPCPackages } from '../common/const/RPCPackages';
import { Channel, CreateChannelReq } from '../proto/channel';
import BaseService from './BaseService';

const svc = 'ChannelService';

export class ChannelClient extends BaseService {
    private readonly rpc: Rpc;

    constructor ({
        apiHost,
        apiKey,
        secretKey,
    }:IChannelArgs) {
        super(apiKey, secretKey);

        this.rpc = new TwirpRpc({
            host: apiHost,
            pkg: RPCPackages.LiveLists,
        });
    }

    public async createChannel({
        identification,
        maxParticipants,
    }:ICreateChannelArgs):Promise<Channel> {
        const req = CreateChannelReq.toJSON({
            maxParticipants,
            identification,
        });

        const data = await this.rpc.request({
            service: svc,
            method: 'CreateChannel',
            data: req,
            headers: this.rootAuthHeader(),
        });

        return Channel.fromJSON(data);
    }
}
