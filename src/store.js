import { createStore, applyMiddleware, compose  } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './application/reducers/IndexReducer';
import { userInfoUpdater } from './application/middleware';

export default ( initialState, isClient = true) => {
    /*
    var composeEnhancers = compose;
    if (isClient){
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
    return createStore(rootReducer, initialState , composeEnhancers(applyMiddleware(thunk, userInfoUpdater)))
    */
    return createStore(rootReducer, initialState , compose(applyMiddleware(thunk, userInfoUpdater)))
}
