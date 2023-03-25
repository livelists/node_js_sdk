import { ChannelParticipantGrants } from '../proto/participant';

export interface IChannelParticipantArgs {
    apiHost: string,
    apiKey: string,
    secretKey: string,
}


export interface IAddParticipantToChannelArgs {
    channelId: string,
    identifier: string,
    grants: ChannelParticipantGrants,
}

export interface IGetAccessTokenArgs {
    identifier: string,
    channelId: string,
}
