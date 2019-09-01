import { GET_ERROR, CLEAR_ERROR } from './types';

export const returnError = (message, status, id = null) => {
    return {
        type: GET_ERROR,
        payload: { message, status, id }
    };
};

export const clearError = () => {
    return {
        type: CLEAR_ERROR
    };
};
