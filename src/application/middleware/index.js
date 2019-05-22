import { getMeDataAction } from "../actions/ActionCreator";
import {USERDATA_CLEAR} from "../actions/ActionType";

/**
 * If user token has been changed while action call (login / register / logout):
 * 1)unset - the call unset user data action
 * 2)set - then dispatch action that updates data
 */
export const userInfoUpdater = store => next => action => {

    let userTokenBeforeNext = store.getState().userToken;
    let result = next(action) //call next chain
    let userTokenAfterNext = store.getState().userToken;

    if (userTokenBeforeNext != userTokenAfterNext){
        if (!userTokenAfterNext){
            store.dispatch({
                type: USERDATA_CLEAR
            });
        }else{
            getMeDataAction(store.dispatch,userTokenAfterNext)
        }
    }
    return result
}