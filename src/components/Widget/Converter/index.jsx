import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CurrencySection from 'components/Widget/Converter/CurrencySection';
import { getRate } from 'actions/currencies';
import { CURRENCY_SYMBOLS, GET_EXCHANGE_PERIOD } from 'constants';
import styles from './converter.scss';

const symbolList = Object.keys(CURRENCY_SYMBOLS);

class Converter extends React.Component {
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

  render() {
    return (
      <main>
        <div className={styles.from_section}>
          <CurrencySection
            accountValues={this.state.accountValues}
            availableSymbols={symbolList}
            onCurrencyChange={this.onChangeFromCurrency}
            rates={this.props.rates.data}
          />
        </div>

        <div className={styles.to_section}>
          <CurrencySection
            accountValues={this.state.accountValues}
            availableSymbols={symbolList}
            onCurrencyChange={this.onChangeToCurrency}
            rates={this.props.rates.data}
            fromSymbol={this.state.fromSymbol}
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

export default connect(mapStateToProps, mapDispatchToProps)(Converter);
