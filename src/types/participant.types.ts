import { ChannelParticipantGrants } from '../proto/participant';

export interface IChannelParticipantArgs {
    apiHost: string,
    apiKey: string,
    secretKey: string,
}


export interface IAddParticipantToChannel {
    channelId: string,
    identifier: string,
    grants: ChannelParticipantGrants,
}
