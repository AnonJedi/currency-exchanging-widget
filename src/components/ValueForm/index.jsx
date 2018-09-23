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
        <h4 className={styles.title}>Mock account data</h4>
        <label htmlFor="account-val" className={styles.input_set}>
          <span className={styles.label}>Account value</span>
          <input id="account-val" className={styles.input} value={accountVal} onChange={this.onValueChange} />
        </label>

        <div className={styles.input_set}>
          <span className={styles.label}>Account currency</span>
          <select className={styles.input} value={defaultCurrency} onChange={this.onCurrencyChange}>
            {currencySymbolKeys.map(this.renderCurrency)}
          </select>
        </div>
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
