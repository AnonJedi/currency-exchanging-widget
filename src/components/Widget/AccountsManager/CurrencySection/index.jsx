import React from 'react';
import Slider from 'react-slick';
import propTypes from 'prop-types';

import { CURRENCY_SYMBOLS, CURRENCY_SIGNS } from 'constants';
import styles from './currency-section.scss';

export default function CurrencySection(props) {
  return (
    <section className={styles.container}>
      <Slider
        arrows={false}
        className={styles.slider}
        afterChange={props.onCurrencyChange}
        dots
      >
        {props.availableSymbols.map(item => (
          <div key={item} className={styles.item}>
            <div className={styles.spread_line}>
              <p>{CURRENCY_SYMBOLS[item]}</p>
              {props.onInputChange
                ? (
                  <form onSubmit={props.onValueSubmit}>
                    {!!props.value && '-'}
                    &nbsp;
                    <input
                      className={styles.input}
                      value={props.value || ''}
                      onChange={props.onInputChange}
                    />
                  </form>
                )
                : (
                  <p>
                    {!!props.value && `+ ${props.value}`}
                  </p>
                )
              }
            </div>

            <div className={styles.spread_line}>
              <small>
                You have&nbsp;
                {CURRENCY_SIGNS[item]}
                &nbsp;
                {props.accountValues[item] || 0}
              </small>

              {(props.fromSymbol && props.fromSymbol !== item) && (
                <small>
                  {CURRENCY_SIGNS[item]}
                  1
                  &nbsp;=&nbsp;
                  {CURRENCY_SIGNS[props.fromSymbol]}
                  {props.rates[`${props.fromSymbol}_${item}`]}
                </small>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}

CurrencySection.propTypes = {
  accountValues: propTypes.shape({}).isRequired,
  availableSymbols: propTypes.arrayOf(
    propTypes.string,
  ).isRequired,
  onCurrencyChange: propTypes.func.isRequired,
  rates: propTypes.shape({}).isRequired,
  value: propTypes.string.isRequired,
  fromSymbol: propTypes.string,
  onInputChange: propTypes.func,
  onValueSubmit: propTypes.func,
};

CurrencySection.defaultProps = {
  fromSymbol: null,
  onInputChange: null,
  onValueSubmit: null,
};
