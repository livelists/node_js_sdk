export interface ICreateChannelArgs {
    identifier: string,
    maxParticipants: number,
    customData?: Record<string, string>,
}
