import { ACCOUNT_DATA_VALUE_CHANGE, ACCOUNT_DATA_CURRENCY_CHANGE } from 'constants/actionTypes';

export const changeAccountValue = newValue => ({
  type: ACCOUNT_DATA_VALUE_CHANGE,
  payload: newValue,
});

export const changeCurrency = currency => ({
  type: ACCOUNT_DATA_CURRENCY_CHANGE,
  payload: currency,
});
