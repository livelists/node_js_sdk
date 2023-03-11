import { IAddParticipantToChannel } from '../types/participant.types';
import { IClientArgs } from '../types/common.types';

import { Rpc, TwirpRpc } from '../common/TwirpRPC';
import { RPCPackages } from '../common/const/RPCPackages';
import { Participant, AddParticipantToChannelReq } from '../proto/participant';
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
            pkg: RPCPackages.LiveLists,
        });
    }

    public async addParticipantToChannel({
        identifier,
        channelId,
        grants,
    }:IAddParticipantToChannel):Promise<Participant> {
        const req = AddParticipantToChannelReq.toJSON({
            channelId,
            identifier,
            grants,
        });

        const data = await this.rpc.request({
            service: svc,
            method: 'AddParticipantToChannel',
            data: req,
            headers: this.rootAuthHeader(),
        });

        return Participant.fromJSON(data);
    }
}
