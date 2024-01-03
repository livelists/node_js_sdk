import axios, { AxiosInstance } from 'axios';
import camelcaseKeys from 'camelcase-keys';

// twirp RPC adapter for client implementation

const defaultPrefix = '/twirp';
import {
    ITwirpArgs,
    IReqArgs,
} from '../types/twirp.types';
import { RPCPackages } from './const/RPCPackages';
import {CreateChannelResponse} from "../proto/channel";
import {AddParticipantToChannelRes, GetParticipantAccessTokenRes} from "../proto/participant";

type ServicesResponses = CreateChannelResponse | AddParticipantToChannelRes | GetParticipantAccessTokenRes

export interface Rpc {
    request(data:IReqArgs): Promise<ServicesResponses>;
}

/**
 * JSON based Twirp V7 RPC
 */
export class TwirpRpc {
    host: string;

    pkg: RPCPackages;

    prefix: string;

    instance: AxiosInstance;

    constructor({ host, pkg, prefix }:ITwirpArgs) {
        this.host = host;
        this.pkg = pkg;
        this.prefix = prefix || defaultPrefix;
        this.instance = axios.create({
            baseURL: host,
        });
    }

    request({
        service, method, data, headers,
    }:IReqArgs): Promise<ServicesResponses> {
        return new Promise<any>((resolve, reject) => {
            const path = `${this.prefix}/${this.pkg}.${service}/${method}`;
            this.instance
                .post(path, data, { headers })
                .then((res) => {
                    resolve(camelcaseKeys(res.data, { deep: true }));
                })
                .catch(reject);
        });
    }
}
