import { ACCOUNT_DATA_VALUE_CHANGE, ACCOUNT_DATA_CURRENCY_CHANGE } from 'constants/actionTypes';
import { CURRENCY_SYMBOLS } from 'constants';

const initialState = {
  accountVal: '0',
  defaultCurrency: CURRENCY_SYMBOLS.GBP,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ACCOUNT_DATA_VALUE_CHANGE:
      return {
        ...state,
        accountVal: payload,
      };
    case ACCOUNT_DATA_CURRENCY_CHANGE:
      return {
        ...state,
        defaultCurrency: payload,
      };
    default:
      return state;
  }
};
