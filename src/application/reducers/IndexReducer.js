import { combineReducers } from 'redux'
import i18nLocale from './I18NReducer' 
import userToken from './UserTokenReducer'
import lastAlert from './LastAlert'
import loggedinUser from './LoggedinUserReducer'
import rooms from './RoomsReducer'

export default combineReducers({
  userToken,
  i18nLocale,
  lastAlert,
  loggedinUser,
  rooms
}) 