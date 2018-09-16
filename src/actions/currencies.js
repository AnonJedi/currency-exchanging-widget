import {
  CURRENCIES_GET_RATE_LOADING,
  CURRENCIES_GET_RATE_SUCCESS,
  CURRENCIES_GET_RATE_ERROR,
  CURRENCIES_GET_ALL_SYMBOLS_LOADING,
  CURRENCIES_GET_ALL_SYMBOLS_SUCCESS,
  CURRENCIES_GET_ALL_SYMBOLS_ERROR,
} from 'constants/actionTypes';
import {
  getRate as getRateUrl,
  getAllSymbols as getAllSymbolsUrl,
} from 'apiUrls';

export const getRate = (symbols = []) => (
  (dispatch) => {
    dispatch({
      type: CURRENCIES_GET_RATE_LOADING,
    });

    const query = symbols.join(',');
    fetch(getRateUrl(query))
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error();
      })
      .then((json) => {
        dispatch({
          type: CURRENCIES_GET_RATE_SUCCESS,
          payload: json,
        });
      })
      .catch((e) => {
        console.error(e);
        dispatch({
          type: CURRENCIES_GET_RATE_ERROR,
          payload: 'An error has occurred during rate request',
        });
      });
  }
);

export const getAllSymbols = () => (
  (dispatch) => {
    dispatch({
      type: CURRENCIES_GET_ALL_SYMBOLS_LOADING,
    });

    fetch(getAllSymbolsUrl())
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error();
      })
      .then((json) => {
        dispatch({
          type: CURRENCIES_GET_ALL_SYMBOLS_SUCCESS,
          payload: json.results,
        });
      })
      .catch((e) => {
        console.error(e);
        dispatch({
          type: CURRENCIES_GET_ALL_SYMBOLS_ERROR,
          payload: 'An error has occurred during all symbols request',
        });
      });
  }
);
