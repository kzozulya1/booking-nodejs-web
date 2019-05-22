import { ROOMS_GET_NEXT_BATCH } from '../actions/ActionType'
const INITIAL_DATA = [];

const rooms = (state = INITIAL_DATA, action) => {
    switch (action.type){
        /* TODO: implement pagination at home page */
        case ROOMS_GET_NEXT_BATCH:
            return action.data
            
        default:
            return state
    }
}

export default rooms