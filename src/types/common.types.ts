export interface IClientArgs {
    apiHost: string,
    apiKey: string,
    secretKey: string,
}


export type ServiceResponse<T> = Omit<T, 'errors'>