import {IChannelArgs, ICreateChannelArgs,} from '../types/channel.types';

import {Rpc, TwirpRpc} from '../common/TwirpRPC';
import {RPCPackages} from "../common/const/RPCPackages";

export class ChannelClient {
    private readonly rpc: Rpc;

    constructor ({
        apiHost,
        apiKey,
        secretKey
    }:IChannelArgs) {
        this.rpc = new TwirpRpc({
            host: apiHost,
            pkg: RPCPackages.LiveLists,
        });
    }

    public async createChannel({
        identification,
        maxParticipants
    }:ICreateChannelArgs) {

    }
}
