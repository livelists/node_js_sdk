import { RPCPackages } from '../common/const/RPCPackages';

export interface ITwirpArgs {
    host: string,
    pkg: RPCPackages,
    prefix?: string,
}

export interface IReqArgs {
    service: string,
    method: string,
    data: any,
    headers?: any
}
