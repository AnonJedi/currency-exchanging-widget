import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import { changeAccountValue, changeCurrency } from 'actions/accountData';
import { CURRENCY_SYMBOLS } from 'constants';

const VALUE_REG_EXP = /^-?[0-9]+(\.)?([0-9]{1,2})?$/gm;
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
    if (newValue === accountVal || !newValue.match(VALUE_REG_EXP)) { return; }

    this.props.changeAccountValue(newValue);
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
      <form>
        <label htmlFor="valet-val">
          Account value
          <input id="valet-val" value={accountVal} onChange={this.onValueChange} />
        </label>

        <span>Account currency</span>
        <select value={defaultCurrency} onChange={this.onCurrencyChange}>
          {currencySymbolKeys.map(this.renderCurrency)}
        </select>
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
