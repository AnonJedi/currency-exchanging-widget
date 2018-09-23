import { CURRENCY_VALUE_REG_EXP } from 'constants';

export const parseCurrencyValue = (value = '') => {
  if (value === '.') {
    return '0.';
  }

  if (value.length > 1 && value.startsWith('0') && value[1].match(/[1-9]/)) {
    return value.substring(1);
  }

  if (value.match(CURRENCY_VALUE_REG_EXP)) {
    return value;
  }

  return undefined;
};
