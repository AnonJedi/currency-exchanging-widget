import { parseCurrencyValue } from 'utils';

describe('Utils tests', () => {
  describe('Test parseCurrencyValue', () => {
    test('parse "." value', () => {
      const value = '.';
      const parsedValue = parseCurrencyValue(value);
      expect(parsedValue).toEqual('0.');
    });

    test('parse value started with 0', () => {
      let value = '0';
      let parsedValue = parseCurrencyValue(value);
      expect(parsedValue).toEqual('0');

      value = '05';
      parsedValue = parseCurrencyValue(value);
      expect(parsedValue).toEqual('5');
    });

    test('parse noramal value', () => {
      let value = '1';
      let parsedValue = parseCurrencyValue(value);
      expect(parsedValue).toEqual('1');

      value = '12';
      parsedValue = parseCurrencyValue(value);
      expect(parsedValue).toEqual('12');

      value = '12.';
      parsedValue = parseCurrencyValue(value);
      expect(parsedValue).toEqual('12.');

      value = '12.3';
      parsedValue = parseCurrencyValue(value);
      expect(parsedValue).toEqual('12.3');

      value = '12.34';
      parsedValue = parseCurrencyValue(value);
      expect(parsedValue).toEqual('12.34');

      value = '12.34567';
      parsedValue = parseCurrencyValue(value);
      expect(parsedValue).toEqual(undefined);
    });

    test('parse empty value', () => {
      const value = '';
      const parsedValue = parseCurrencyValue(value);
      expect(parsedValue).toBe(undefined);
    });
  });
});
