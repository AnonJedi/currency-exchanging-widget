import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CurrencySection from 'components/Widget/AccountsManager/CurrencySection';
import { getRate } from 'actions/currencies';
import { CURRENCY_SYMBOLS, GET_EXCHANGE_PERIOD } from 'constants';
import { parseCurrencyValue } from 'utils';
import styles from './accounts-manager.scss';

const symbolList = Object.keys(CURRENCY_SYMBOLS);

class AccountsManager extends React.Component {
  static propTypes = {
    accountValues: propTypes.shape({}).isRequired,
    rates: propTypes.shape({
      data: propTypes.shape({}).isRequired,
    }).isRequired,
    getRate: propTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      fromSymbol: symbolList[0],
      toSymbol: symbolList[0],
      accountValues: props.accountValues,
      transactions: {},
    };
  }

  downloadRate = () => {
    clearTimeout(this.timeoutId);
    const { fromSymbol, toSymbol } = this.state;
    if (fromSymbol === toSymbol) { return; }

    this.props.getRate([`${fromSymbol}_${toSymbol}`]);
    this.timeoutId = setTimeout(this.downloadRate, GET_EXCHANGE_PERIOD);
  }

  onChangeFromCurrency = (index) => {
    this.setState({ fromSymbol: symbolList[index] }, this.downloadRate);
  }

  onChangeToCurrency = (index) => {
    this.setState({ toSymbol: symbolList[index] }, this.downloadRate);
  }

  onInputChange = (e) => {
    const { value } = e.target;

    const parsedValue = parseCurrencyValue(value);
    this.setState(state => ({
      transactions: {
        ...state.transactions,
        [state.fromSymbol]: parsedValue,
      },
    }));
  }

  onValueSubmit = (e) => {
    e.nativeEvent.preventDefault();
    e.preventDefault();

    const {
      accountValues,
      transactions,
      fromSymbol,
      toSymbol,
    } = this.state;

    if (fromSymbol === toSymbol) {
      this.setState(state => ({
        transactions: {
          ...state.transactions,
          [fromSymbol]: '0',
        },
      }));
      return;
    }

    const fromVal = accountValues[fromSymbol] || 0;
    const fromTransaction = transactions[fromSymbol] || 0;
    const newFromVal = Math.max(0, fromVal - fromTransaction);
    const newToValue = fromVal > fromTransaction ? fromTransaction : fromVal;

    this.setState(state => ({
      accountValues: {
        ...state.accountValues,
        [fromSymbol]: newFromVal,
        [toSymbol]: newToValue * this.props.rates.data[`${fromSymbol}_${toSymbol}`],
      },
      transactions: {
        ...state.transactions,
        [fromSymbol]: 0,
      },
    }));
  }

  render() {
    const fromValue = Number.parseFloat(this.state.transactions[this.state.fromSymbol] || 0);
    const toValue = fromValue * (this.props.rates.data[`${this.state.fromSymbol}_${this.state.toSymbol}`] || 0);
    return (
      <main>
        <div className={styles.from_section}>
          <CurrencySection
            accountValues={this.state.accountValues}
            availableSymbols={symbolList}
            onCurrencyChange={this.onChangeFromCurrency}
            rates={this.props.rates.data}
            onInputChange={this.onInputChange}
            value={this.state.transactions[this.state.fromSymbol] || ''}
            onValueSubmit={this.onValueSubmit}
          />
        </div>

        <div className={styles.to_section}>
          <CurrencySection
            accountValues={this.state.accountValues}
            availableSymbols={symbolList}
            onCurrencyChange={this.onChangeToCurrency}
            rates={this.props.rates.data}
            fromSymbol={this.state.fromSymbol}
            value={toValue ? toValue.toString() : ''}
          />
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  rates: state.currencies.rates,
});

const mapDispatchToProps = dispatch => ({
  getRate: bindActionCreators(getRate, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountsManager);
