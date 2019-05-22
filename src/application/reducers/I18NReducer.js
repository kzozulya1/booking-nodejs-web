//const { lang } = require("../etc/config/"+process.env.NODE_ENV+".json")
import {lang} from "../etc/config.json";

import { CHANGE_LOCALE } from '../actions/ActionType'
import i18next from 'i18next';
var localeLang = lang;

i18next.init({
      lng: lang,
      resources: require("../i18n/"+localeLang+".json")
    });
const INITIAL_DATA =  i18next;
    

const i18nLocale = (state = INITIAL_DATA, action) => {
    switch (action.type){
        case CHANGE_LOCALE:
            return [
                ...action.i18n
            ]
        default:
            return state
    }
}

export default i18nLocale
