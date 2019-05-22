import { USER_REGISTER,USER_LOGOUT,USER_LOGIN,ALERT_UPDATE, USERDATA_UPDATE, USERDATA_CLEAR,ROOMS_GET_NEXT_BATCH } from '../actions/ActionType'
import api from '../api';
import {applyDateFormatting} from '../helper/date_convert';
import {JWT_LOCAL_STORAGE_KEY} from '../etc/const';

/**
 * Get Me information
 */
function _getMeDataAction(dispatch, token){
    //Get user data based on jw token
    api.me(token).then(
        ({data})=> {
            //Convert date 2019-01-22T00:00:00 to 22.01.2019
            applyDateFormatting(data)

            dispatch({
                type: USERDATA_UPDATE,
                user: data
            });
        }
    ).catch( ( {response} ) => {
            if (response){
                dispatch({
                    type: ALERT_UPDATE,
                    alert: {
                        type: "error",
                        msg: response.data.error
                    }
                });
                _doLogout(dispatch)
            }
        }
    );
    //end me subroutine
}

/**
 * Get me data about current user
 */
export const getMeDataAction = (dispatch, token) => {
    //Get user data based on jw token
    _getMeDataAction(dispatch, token)
    //end me subroutine
}

/**
 * Get jwt from local browser storage and pushes it into redux store userToken var
 * Done in main App component in  componentDidMount() function
 */
export const pushUserTokenAction = (userToken) => {
    return function (dispatch) {
        dispatch({
            type: USER_LOGIN,
            jwtoken: userToken
        });
    }
}

/**
 * User register action
 */
export const registerAction = (userData) => {
    return function (dispatch) {
        return api.createUser(userData).then(
            ({data})=> {
                //Store token at session
                localStorage.setItem(JWT_LOCAL_STORAGE_KEY, data.jwt_token);
                //Set store value userToken to gotten token
                dispatch({
                    type: USER_REGISTER,
                    jwtoken: data.jwt_token
                });
                //Auto close popup
                clearAlertAfterTimeout(dispatch);
            }
        ).catch( ({response}) => {
                response && dispatch({
                                        type: ALERT_UPDATE,
                                        alert: {
                                            type: "error",
                                            msg: response.data.error
                                        }
                            });
                    
                reject(new Error(response.data.error));
            }
        );
    }
};
/**
 * User login action
 */
export const loginAction = (userData) => {
    return function (dispatch) {
        return api.loginUser(userData).then(
            ({data})=> {
                //Store token at session
                localStorage.setItem(JWT_LOCAL_STORAGE_KEY, data.jwt_token);
                //Set store value userToken to gotten token
                dispatch({
                    type: USER_LOGIN,
                    jwtoken: data.jwt_token
                });
                //Auto close popup
                clearAlertAfterTimeout(dispatch);
            }
        ).catch( ({response}) => {
                response && dispatch({
                    type: ALERT_UPDATE,
                    alert: {
                        type: "error",
                        msg: response.data.error
                    }
                });
                reject(new Error(response.data.error));
            }
        );
    }
};

/**
 * User logout action
 */
export const logoutAction = () => {
    return function (dispatch) {
        _doLogout(dispatch)
    }
};

/**
 * Private function for logout
 */
function _doLogout(dispatch){
    //Clear storage data
    localStorage.removeItem(JWT_LOCAL_STORAGE_KEY);
    //Clear JW Token
    dispatch({
        type: USER_LOGOUT
    });
    //Unset user object
    dispatch({
        type: USERDATA_CLEAR
    });
}

/**
 * Update user action
 */
export const updateUserAction = (userData, userToken) => {
    return function (dispatch) {
        return api.updateUser(userData,userToken).then(
            ({data})=> {
                //Update store user data with new data
                dispatch({
                    type: USERDATA_UPDATE,
                    user: data
                });
                //...and update lastAlert object in redux store
                dispatch({
                    type: ALERT_UPDATE,
                    alert: {
                        type: "success",
                        msg: "You've successfully update user information."
                    }
                });
                clearAlertAfterTimeout(dispatch);
            }
        ).catch( ({response}) => {
                response && dispatch({
                    type: ALERT_UPDATE,
                    alert: {
                        type: "error",
                        msg: response.data.error
                    }
                });
                reject(new Error(response.data.error));
            }
        );
    }
};

/**
 * Update user action
 */
export const createReservationAction = (roomId,userToken,data) => {
    return function (dispatch) {
        return api.createReservation(roomId,userToken,data).then(
            ({data})=> {

                //Refresh user data - fetch new reservations
                _getMeDataAction(dispatch,userToken)

                dispatch({
                    type: ALERT_UPDATE,
                    alert: {
                        type: "success",
                        msg: "You've successfully added reservation"
                    }
                });
                clearAlertAfterTimeout(dispatch);
            }
        ).catch( ({response}) => {
                response && dispatch({
                    type: ALERT_UPDATE,
                    alert: {
                        type: "error",
                        msg: response.data.error
                    }
                });
                reject(new Error(response.data.error));
            }
        );
    }
};

/**
 * Get first batch of rooms
 */
export const getRoomsFirstBatchAction = () => {
    return function (dispatch){
        return api.listAllRooms().then(
            ({data})=> {
                dispatch({
                    type: ROOMS_GET_NEXT_BATCH,
                    data: data
                });
            },
            error => console.log("Error in XHR api: list all rooms: " + error)
        );
    }
}


/**
 * Update room (object)
 */
export const updateRoomAction = (roomId,userToken,data) => {
    return function (dispatch) {
        return api.updateRoom(roomId,userToken,data).then(
            ({data})=> {

                //Refresh user data - fetch new reservations
                _getMeDataAction(dispatch,userToken)

                dispatch({
                    type: ALERT_UPDATE,
                    alert: {
                        type: "success",
                        msg: "You've successfully updated your object"
                    }
                });
                clearAlertAfterTimeout(dispatch);
            }
        ).catch( ({response}) => {
                response && dispatch({
                    type: ALERT_UPDATE,
                    alert: {
                        type: "error",
                        msg: response.data.error
                    }
                });
                reject(new Error(response.data.error));
            }
        );
    }
};

/**
 * Create room (object)
 */
export const createRoomAction = (userToken,data) => {
    return function (dispatch) {

        //Skip null values
        Object.keys(data).forEach(key => {
            if (data[key] == null) delete data[key]
        })

        return api.createRoom(userToken,data).then(
            ({data})=> {
                //Refresh user data - fetch new reservations
                _getMeDataAction(dispatch,userToken)

                dispatch({
                    type: ALERT_UPDATE,
                    alert: {
                        type: "success",
                        msg: "You've successfully registered new object"
                    }
                });
                clearAlertAfterTimeout(dispatch);
            }
        ).catch( ({response}) => {
                response && dispatch({
                    type: ALERT_UPDATE,
                    alert: {
                        type: "error",
                        msg: response.data.error
                    }
                });
                reject(new Error(response.data.error));
            }
        );
    }
};

/**
 * Create room (object)
 */
export const deleteRoomAction = (roomId, userToken) => {
    return function (dispatch) {
        return api.deleteRoom(roomId,userToken).then(
            ({data})=> {
                //Refresh user data - fetch new reservations
                _getMeDataAction(dispatch,userToken)
            }
        ).catch( ({response}) => {
                response && dispatch({
                    type: ALERT_UPDATE,
                    alert: {
                        type: "error",
                        msg: response.data.error
                    }
                });
                reject(new Error(response.data.error));
            }
        );
    }
};



/**
 * Clear data from last alert - auto close popup dlg
 */
function clearAlertAfterTimeout(dispatch, interval = 860){
    setTimeout(function(){
        dispatch({type: ALERT_UPDATE , alert:{type: "",msg: ""}})
    },interval);
}

export const lastAlertUpdateAction = (alertData) => {
    return function (dispatch) {
        dispatch({
            type: ALERT_UPDATE,
            alert: alertData
        });
    }
};