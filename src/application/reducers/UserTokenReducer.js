import { USER_REGISTER , USER_LOGOUT,USER_LOGIN } from '../actions/ActionType'
const INITIAL_DATA = '';

const userToken = (state = INITIAL_DATA, action) => {
    switch (action.type){
        case USER_REGISTER:
        case USER_LOGIN:
            return action.jwtoken
        
        case USER_LOGOUT:
            return INITIAL_DATA;
            
        default:
            return state
    }
}

export default userToken