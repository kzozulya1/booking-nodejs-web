import { ALERT_UPDATE } from '../actions/ActionType'
const INITIAL_DATA = {
    type: '',//success||error
    msg: ''
};
    
const lastAlert = (state = INITIAL_DATA, action) => {
    switch (action.type){
        case ALERT_UPDATE:
            return action.alert
            
        default:
            return state 
    }
}

export default lastAlert