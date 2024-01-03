import {ApiError, IErrorMessage} from '../../common/BaseError';
import {
    CreateChannelErrors,
    createChannelErrorsFromJSON,
    createChannelErrorsToJSON,
    CreateChannelResponse
} from '../../proto/channel';

enum ErrorCodes {
    ChannelAlreadyExits = 'channelAlreadyExist',
    CommonError = 'commonError',
    UnAuthorized = 'unauthorized'
}

export class CreateChannelError extends ApiError {
    constructor(response:CreateChannelResponse) {
        const errorMessages:IErrorMessage[] = [];

        if (response.errors.some((e) => createChannelErrorsFromJSON(e) === CreateChannelErrors.IsAlreadyExist)) {
            errorMessages.push({
                code: ErrorCodes.ChannelAlreadyExits,
                message: 'Channel with given identifier already exist. Identifier should be unique',
            });
        }

        if (!response.channel && response.errors.length == 0) {
            errorMessages.push({
                code: ErrorCodes.CommonError,
                message: 'Unexpected error. The channel did not come in the response body',
            });
        }

        if (response.errors.some((e) => createChannelErrorsFromJSON(e) === CreateChannelErrors.Unauthorized)) {
            errorMessages.push({
                code: ErrorCodes.UnAuthorized,
                message: 'Unexpected error. The channel did not come in the response body',
            });
        }

        super(errorMessages);
    }
}