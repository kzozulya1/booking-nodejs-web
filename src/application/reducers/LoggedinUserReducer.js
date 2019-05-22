import { USERDATA_UPDATE, USERDATA_CLEAR } from '../actions/ActionType'
const INITIAL_DATA = {
    name: '',
    email: ''
};
    
const loggedinUser = (state = INITIAL_DATA, action) => {
    switch (action.type){
        case USERDATA_UPDATE:
            return action.user
            
        case USERDATA_CLEAR:
            return INITIAL_DATA;
            
        default:
            return state
    }
}

export default loggedinUser