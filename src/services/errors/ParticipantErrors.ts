import {ApiError, IErrorMessage} from '../../common/BaseError';
import {
    AddParticipantToChannelErrors,
    addParticipantToChannelErrorsFromJSON,
    AddParticipantToChannelRes,
    GetParticipantAccessTokenErrors,
    getParticipantAccessTokenErrorsFromJSON,
    GetParticipantAccessTokenRes
} from "../../proto/participant";

enum ErrorCodes {
    UnAuthorized = 'unauthorized',
    AlreadyExist = 'alreadyExist',
    ChannelNotFound = 'channelNotFound',
    IdentifierNotValid = 'identifierNotValid',
    ParticipantNotFound = 'participantNotFound'
}

export class AddParticipantToChannelError extends ApiError {
    constructor(response:AddParticipantToChannelRes) {
        const errorMessages:IErrorMessage[] = [];

        if (response.errors.some((e) => addParticipantToChannelErrorsFromJSON(e) === AddParticipantToChannelErrors.IsAlreadyExist)) {
            errorMessages.push({
                code: ErrorCodes.AlreadyExist,
                message: 'Participant with given identifier already exist in this channel. Identifier should be unique',
            });
        }

        if (response.errors.some((e) => addParticipantToChannelErrorsFromJSON(e) === AddParticipantToChannelErrors.IdentifierNotValid)) {
            errorMessages.push({
                code: ErrorCodes.IdentifierNotValid,
                message: 'Participant identifier should be greater then 0 length',
            });
        }

        if (response.errors.some((e) => addParticipantToChannelErrorsFromJSON(e) === AddParticipantToChannelErrors.Unauthorized)) {
            errorMessages.push({
                code: ErrorCodes.UnAuthorized,
                message: 'Token sent from Server SDK incorrect',
            });
        }

        if (response.errors.some((e) => addParticipantToChannelErrorsFromJSON(e) === AddParticipantToChannelErrors.ChannelNotFound)) {
            errorMessages.push({
                code: ErrorCodes.ChannelNotFound,
                message: 'Can not join to channel. Channel with given identifier not exist',
            });
        }

        super(errorMessages);
    }
}

export class GetAccessTokenError extends ApiError {
    constructor(response:GetParticipantAccessTokenRes) {
        const errorMessages:IErrorMessage[] = [];

        if (response.errors.some((e) => getParticipantAccessTokenErrorsFromJSON(e) === GetParticipantAccessTokenErrors.NotFound)) {
            errorMessages.push({
                code: ErrorCodes.ParticipantNotFound,
                message: 'Participant with given identifier not found',
            });
        }

        if (response.errors.some((e) => addParticipantToChannelErrorsFromJSON(e) === AddParticipantToChannelErrors.Unauthorized)) {
            errorMessages.push({
                code: ErrorCodes.UnAuthorized,
                message: 'Token sent from Server SDK incorrect',
            });
        }

        super(errorMessages);
    }
}