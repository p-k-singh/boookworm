import * as actionTypes from '../actions/actionTypes'
const initialState = {
    messages: [],
    client: null
}
const messages = (state = initialState,action) =>{
    switch(action.type){
        case 'INSERT_MESSAGE':
            var msgs = state.messages.slice()
            msgs.push(action.newMessage)
            return {...state,messages:msgs}
        case 'SET_CLIENT':
            return {...state,client:action.client}
        case 'RESET_MESSAGE':
            return {...state,messages:[]}
            
    }
    return state
}
export default messages;