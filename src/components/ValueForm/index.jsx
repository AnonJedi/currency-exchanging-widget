import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import { changeAccountValue, changeCurrency } from 'actions/accountData';
import { CURRENCY_SYMBOLS } from 'constants';
import { parseCurrencyValue } from 'utils';

import styles from './value-form.scss';

const currencySymbolKeys = Object.keys(CURRENCY_SYMBOLS);

class ValueForm extends React.Component {
  static propTypes = {
    accountData: propTypes.shape({
      accountVal: propTypes.string.isRequired,
      defaultCurrency: propTypes.oneOf(currencySymbolKeys).isRequired,
    }).isRequired,
    changeAccountValue: propTypes.func.isRequired,
    changeCurrency: propTypes.func.isRequired,
  }

  onValueChange = (e) => {
    const newValue = e.target.value;
    const { accountData: { accountVal } } = this.props;
    const parsedValue = parseCurrencyValue(newValue);
    if (parsedValue === accountVal) { return; }

    this.props.changeAccountValue(parsedValue || '0');
  }

  onCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    const { accountData: { defaultCurrency } } = this.props;
    if (newCurrency === defaultCurrency || !CURRENCY_SYMBOLS[newCurrency]) { return; }

    this.props.changeCurrency(newCurrency);
  }

  renderCurrency = currency => (
    <option key={currency} value={currency}>
      {CURRENCY_SYMBOLS[currency]}
    </option>
  )

  render() {
    const { accountData: { accountVal, defaultCurrency } } = this.props;
    return (
      <form className={styles.container}>
        <fieldset>
          <label htmlFor="valet-val">
            Account value
            <input id="valet-val" value={accountVal} onChange={this.onValueChange} />
          </label>

          <div>
            <span>Account currency</span>
            <select value={defaultCurrency} onChange={this.onCurrencyChange}>
              {currencySymbolKeys.map(this.renderCurrency)}
            </select>
          </div>
        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  accountData: state.accountData,
});

const mapDispatchToProps = {
  changeAccountValue,
  changeCurrency,
};

export default connect(mapStateToProps, mapDispatchToProps)(ValueForm);
