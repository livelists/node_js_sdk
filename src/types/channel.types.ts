export interface IChannelArgs {
    apiHost: string,
    apiKey: string,
    secretKey: string,
}

export interface ICreateChannelArgs {
    identification: string,
    maxParticipants: number,
}


export interface ICreateChannel {
    url: string,
}

export interface IRemoveChannel {
    url: string,
}

export interface IPublishMessage {
    url: string,
}

export interface IDeleteMessage {
    url: string,
}
