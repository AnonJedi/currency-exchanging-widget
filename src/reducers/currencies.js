import {
  CURRENCIES_GET_RATE_LOADING,
  CURRENCIES_GET_RATE_SUCCESS,
  CURRENCIES_GET_RATE_ERROR,
  CURRENCIES_GET_ALL_SYMBOLS_LOADING,
  CURRENCIES_GET_ALL_SYMBOLS_SUCCESS,
  CURRENCIES_GET_ALL_SYMBOLS_ERROR,
} from 'constants/actionTypes';

const initialState = {
  rates: {
    data: {},
    loading: false,
    error: null,
  },
  symbols: {
    data: {},
    loading: false,
    error: null,
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CURRENCIES_GET_RATE_LOADING:
      return {
        ...state,
        rates: {
          ...state.rates,
          loading: true,
          error: null,
        },
      };
    case CURRENCIES_GET_RATE_SUCCESS:
      return {
        ...state,
        rates: {
          ...state.rates,
          data: payload,
          loading: false,
        },
      };
    case CURRENCIES_GET_RATE_ERROR:
      return {
        ...state,
        rates: {
          ...state.rates,
          loading: false,
          error: payload,
        },
      };

    case CURRENCIES_GET_ALL_SYMBOLS_LOADING:
      return {
        ...state,
        symbols: {
          ...state.symbols,
          loading: true,
          error: null,
        },
      };
    case CURRENCIES_GET_ALL_SYMBOLS_SUCCESS:
      return {
        ...state,
        symbols: {
          ...state.symbols,
          data: payload,
          loading: false,
        },
      };
    case CURRENCIES_GET_ALL_SYMBOLS_ERROR:
      return {
        ...state,
        symbols: {
          ...state.symbols,
          loading: false,
          error: payload,
        },
      };

    default:
      return state;
  }
};
