export interface IErrorMessage {
    code: string,
    message: string
}

export class ApiError extends Error {
    errors: IErrorMessage[];

    constructor(errors: IErrorMessage[]) {
        super();

        console.log("LiveLists apiErrors:");
        this.errors = errors;
    }
}