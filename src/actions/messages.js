import * as actionTypes from './actionTypes'

export const insertMessages = (msg) => {
    return{
        type: actionTypes.INSERT_MESSAGE,
        newMessage: msg
    };
};
export const setClient = (client) => {
    return{
        type: actionTypes.SET_CLIENT,
        client:client
    }
};
export const resetMessage = () => {
    return {
        type: actionTypes.RESET_MESSAGE
    };
};