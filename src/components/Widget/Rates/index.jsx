import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AddSymbols from 'components/Widget/Rates/AddSymbols';
import { getRate } from 'actions/currencies';
import { GET_EXCHANGE_PERIOD } from 'constants';
import styles from './rates.scss';

class Rates extends React.Component {
  static propTypes = {
    getRate: propTypes.func.isRequired,
    symbols: propTypes.shape({
      data: propTypes.shape({}).isRequired,
      loading: propTypes.bool.isRequired,
      error: propTypes.oneOfType([
        propTypes.string,
        propTypes.object,
      ]),
    }).isRequired,
    rates: propTypes.shape({
      data: propTypes.shape({}).isRequired,
      loading: propTypes.bool.isRequired,
      error: propTypes.oneOfType([
        propTypes.string,
        propTypes.object,
      ]),
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
    };
  }

  componentDidMount() {
    this.downloadRate();
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  addPair = (fromSym, toSym) => {
    const pair = {
      symPair: `${fromSym}_${toSym}`,
      fromSym,
      toSym,
    };
    this.setState(
      state => ({
        currencies: state.currencies.concat(pair),
      }),
      this.downloadRate,
    );
  }

  downloadRate = () => {
    clearTimeout(this.timeoutId);
    if (!this.state.currencies.length) {
      return;
    }

    this.timeoutId = setTimeout(this.downloadRate, GET_EXCHANGE_PERIOD);
    const symPairs = this.state.currencies.map(pair => pair.symPair);
    this.props.getRate(symPairs);
  }

  removePair(index) {
    this.setState((state) => {
      state.currencies.splice(index, 1);
      return {
        currencies: [...state.currencies],
      };
    });
  }

  renderList = (currencyPair, i) => (
    <li key={`${i}_${currencyPair.symPair}`} className={styles.item}>
      <button
        onClick={this.removePair.bind(this, i)}
        type="button"
      >
        <div className={styles.item_content}>
          <div>
            1&nbsp;
            {currencyPair.fromSym}
          </div>

          <div className={styles.item_to}>
            {this.props.rates.data[currencyPair.symPair]}

            <div>
              <small>
                {this.props.symbols.data[currencyPair.toSym].currencyName}
              </small>
            </div>
          </div>
        </div>
      </button>
    </li>
  )

  render() {
    console.log(this.props.rates);
    return (
      <main>
        <AddSymbols
          onSymbolsSubmit={this.addPair}
          symbols={this.props.symbols.data}
        />

        <ul className={styles.list}>
          {this.state.currencies.map(this.renderList)}
        </ul>

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
  symbols: state.currencies.symbols,
});

const mapDispatchToProps = dispatch => ({
  getRate: bindActionCreators(getRate, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Rates);
