import {ICreateChannel, IDeleteMessage, IPublishMessage, IRemoveChannel} from '../types/channel.types';

export class ChannelClient {
    public async createChannel (args:ICreateChannel) {}
    public async removeChannel (args:IRemoveChannel) {}
    public async publishMessage (args:IPublishMessage) {}
    public async removeMessage (args:IDeleteMessage) {}
}
