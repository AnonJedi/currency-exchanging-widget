import React, { Component } from 'react';

import Widget from 'components/Widget';
import { CURRENCY_SYMBOLS } from 'constants';

import styles from './page.scss';

export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valetVal: 0,
      defaultCarrency: CURRENCY_SYMBOLS.GBP,
    };

    this.currencySymbolKyes = Object.keys(CURRENCY_SYMBOLS);
    this.valueCheckRegExp = /^-?[0-9]+(\.)?([0-9]{1,2})?$/gm;
  }

  onValueChange = (e) => {
    const newValue = e.target.value;
    const { valetVal } = this.state;
    if (newValue === valetVal || !newValue.match(this.valueCheckRegExp)) { return false; }

    this.setState({ valetVal: newValue });
    return false;
  }

  onCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    const { defaultCarrency } = this.state;
    if (newCurrency === defaultCarrency || !CURRENCY_SYMBOLS[newCurrency]) { return; }

    this.setState({ defaultCarrency: newCurrency });
  }

  renderCurrency = currency => (
    <option key={currency} value={currency}>
      {CURRENCY_SYMBOLS[currency]}
    </option>
  )

  render() {
    const { defaultCarrency, valetVal } = this.state;
    return (
      <div className={styles.container}>
        <form>
          <label htmlFor="valet-val">
            Valet value
            <input id="valet-val" value={valetVal} onChange={this.onValueChange} />
          </label>

          <span>Valet currency</span>
          <select value={defaultCarrency} onChange={this.onCurrencyChange}>
            {this.currencySymbolKyes.map(this.renderCurrency)}
          </select>
        </form>

        <Widget
          value={valetVal}
          defaultCurrency={defaultCarrency}
        />
      </div>
    );
  }
}
