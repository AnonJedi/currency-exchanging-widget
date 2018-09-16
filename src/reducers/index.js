import { combineReducers } from 'redux';
import accountData from './accountData';
import currencies from './currencies';

export default combineReducers({
  accountData,
  currencies,
});
