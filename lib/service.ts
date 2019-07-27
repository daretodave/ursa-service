import {validate} from "class-validator";
import {ModelValidationError} from "./http/error/model-validation";

const verify = async (model) => {
    const errors: any = await validate(model);
    if (errors && errors.length) {
        throw new ModelValidationError(
            model.constructor.name,
            errors
        );
    }
};

const reply = (value, status = 200, error = null) => {
    return {
        response: value,
        status,
        error
    }
};

const error = (message, status = 400) => {
    return {
        response: null,
        status,
        error: message
    }
};

export const Service = {
    verify,
    reply
};

export const toLowerCase = text => {
    if (typeof text !== 'string') {
        return text;
    }
    return `${text}`.toLowerCase();
};