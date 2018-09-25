import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CurrencySection from 'components/Widget/AccountsManager/CurrencySection';
import Button from 'shared/controls/Button';
import { getRate } from 'actions/currencies';
import { CURRENCY_SYMBOLS, GET_EXCHANGE_PERIOD } from 'constants';
import { parseCurrencyValue, preventDefault } from 'utils';
import styles from './accounts-manager.scss';

const symbolList = Object.keys(CURRENCY_SYMBOLS);

class AccountsManager extends React.Component {
  static propTypes = {
    accountValues: propTypes.shape({}).isRequired,
    rates: propTypes.shape({
      data: propTypes.shape({}).isRequired,
      error: propTypes.string,
    }).isRequired,
    getRate: propTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      fromSymbol: symbolList[0],
      toSymbol: symbolList[0],
      accountValues: props.accountValues,
      transaction: {},
      rates: props.rates.data, // eslint-disable-line
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    const {
      fromSymbol,
      toSymbol,
      transaction: { from, to },
      rates,
    } = state;
    const rate = rates[`${fromSymbol}_${toSymbol}`];
    const newRate = nextProps.rates.data[`${fromSymbol}_${toSymbol}`];

    if (!rate && newRate) {
      return {
        rates: nextProps.rates.data,
        transaction: {
          from: from || to / newRate,
          to: to || from * newRate,
        },
      };
    }
    return null;
  }

  onInputChange(value, fromType, toType, converter) {
    const parsedValue = parseCurrencyValue(value);

    if (!value) {
      this.setState({
        transaction: {
          [fromType]: undefined,
          [toType]: undefined,
        },
      });
    } else if (parsedValue) {
      this.setState({
        transaction: {
          [fromType]: parsedValue,
          [toType]: converter(value),
        },
      });
    }
  }

  downloadRate = () => {
    clearTimeout(this.timeoutId);
    const { fromSymbol, toSymbol } = this.state;
    if (fromSymbol === toSymbol) { return; }

    this.timeoutId = setTimeout(this.downloadRate, GET_EXCHANGE_PERIOD);
    this.props.getRate([`${fromSymbol}_${toSymbol}`]);
  }

  onChangeFromCurrency = (index) => {
    const newFromSymbol = symbolList[index];
    const { transaction: currentTransaction, toSymbol } = this.state;
    const transaction = {
      from: undefined,
      to: currentTransaction.to,
    };
    const rate = this.props.rates.data[`${newFromSymbol}_${toSymbol}`];


    if (this.state.toSymbol !== newFromSymbol && currentTransaction.to && rate) {
      transaction.from = currentTransaction.to / rate;
    }
    this.setState({ fromSymbol: newFromSymbol, transaction }, this.downloadRate);
  }

  onChangeToCurrency = (index) => {
    const newToSymbol = symbolList[index];
    const { transaction: currentTransaction, fromSymbol } = this.state;
    const transaction = {
      from: currentTransaction.from,
      to: undefined,
    };
    const rate = this.props.rates.data[`${fromSymbol}_${newToSymbol}`];

    if (this.state.fromSymbol !== newToSymbol && currentTransaction.from && rate) {
      transaction.to = currentTransaction.from * rate;
    }
    this.setState({ toSymbol: newToSymbol, transaction }, this.downloadRate);
  }

  onFromInputChange = (e) => {
    const { value } = e.target;
    this.onInputChange(value, 'from', 'to', this.toConverter);
  }

  onToInputChange = (e) => {
    const { value } = e.target;
    this.onInputChange(value, 'to', 'from', this.fromConverter);
  }

  onValueSubmit = (e) => {
    preventDefault(e);

    const {
      accountValues,
      fromSymbol,
      transaction,
      toSymbol,
    } = this.state;

    if (!this.props.rates.data[`${fromSymbol}_${toSymbol}`]) {
      return;
    }

    if (fromSymbol === toSymbol) {
      this.setState({
        transaction: {
          to: undefined,
          from: undefined,
        },
      });
      return;
    }

    const fromVal = Number.parseFloat(accountValues[fromSymbol] || 0);
    const fromTransaction = Number.parseFloat(transaction.from || 0);
    const newFromVal = Math.max(0, fromVal - fromTransaction);
    const newToValue = fromVal > fromTransaction ? fromTransaction : fromVal;

    this.setState(state => ({
      accountValues: {
        ...state.accountValues,
        [fromSymbol]: newFromVal,
        [toSymbol]: newToValue * this.props.rates.data[`${fromSymbol}_${toSymbol}`],
      },
      transaction: {
        to: undefined,
        from: undefined,
      },
    }));
  }

  toConverter = (value) => {
    const { fromSymbol, toSymbol } = this.state;
    const rate = this.props.rates.data[`${fromSymbol}_${toSymbol}`];
    if (!rate) {
      return undefined;
    }
    return value * rate;
  }

  fromConverter = (value) => {
    const { fromSymbol, toSymbol } = this.state;
    const rate = this.props.rates.data[`${fromSymbol}_${toSymbol}`];
    if (!rate) {
      return undefined;
    }
    return value / rate;
  }

  render() {
    const {
      accountValues,
      transaction,
      fromSymbol,
    } = this.state;

    return (
      <main>
        <div className={styles.from_section}>
          <CurrencySection
            accountValues={accountValues}
            availableSymbols={symbolList}
            onCurrencyChange={this.onChangeFromCurrency}
            rates={this.props.rates.data}
            onInputChange={this.onFromInputChange}
            value={transaction.from || ''}
            onValueSubmit={this.onValueSubmit}
          />
        </div>

        <div className={styles.to_section}>
          <CurrencySection
            accountValues={accountValues}
            availableSymbols={symbolList}
            onCurrencyChange={this.onChangeToCurrency}
            rates={this.props.rates.data}
            fromSymbol={fromSymbol}
            value={transaction.to || ''}
            onInputChange={this.onToInputChange}
          />
        </div>

        <div className={styles.submit}>
          <Button onClick={this.onValueSubmit}>
            {() => 'Exchange'}
          </Button>
        </div>

        {this.props.rates.error && (
          <p className={styles.error}>
            {this.props.rates.error}
          </p>
        )}
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
