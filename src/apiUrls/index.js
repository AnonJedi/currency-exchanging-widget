export const getRate = query => (
  `https://free.currencyconverterapi.com/api/v6/convert?q=${query}&compact=ultra`
);
export const getAllSymbols = () => ('https://free.currencyconverterapi.com/api/v6/currencies');
