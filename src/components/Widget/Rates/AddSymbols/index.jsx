import React from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';

import styles from './add-symbols.scss';

export default class AddSymbols extends React.PureComponent {
  static propTypes = {
    symbols: propTypes.shape({}).isRequired,
    onSymbolsSubmit: propTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      firstOfPair: null,
    };
    this.symbolsData = [];
  }

  onDropDownToggle = () => {
    this.setState(state => ({
      isOpened: !state.isOpened,
      firstOfPair: null,
    }));
  }

  onItemClick = (e) => {
    const { value } = e.currentTarget.dataset;
    if (!this.props.symbols[value]) { return; }

    const { firstOfPair } = this.state;
    if (firstOfPair === null) {
      this.setState({ firstOfPair: value });
    } else if (this.state.firstOfPair === value) {
      this.setState({ firstOfPair: null });
    } else {
      this.setState({
        firstOfPair: null,
        isOpened: false,
      });
      this.props.onSymbolsSubmit(firstOfPair, value);
    }
  }

  renderList = item => (
    <li
      key={item.id}
      className={classnames(styles.dropdown_item, {
        [styles.selected]: this.state.firstOfPair === item.id,
      })}
    >
      <button onClick={this.onItemClick} type="button" data-value={item.id}>
        {item.id}
        &nbsp;-&nbsp;
        {item.currencyName}
      </button>
    </li>
  )

  render() {
    return (
      <div className={styles.dropdown}>
        <button className={styles.dropdown_label} onClick={this.onDropDownToggle} type="button">
          ADD NEW CURRENCY
        </button>

        {this.state.isOpened && (
          <ul className={styles.dropdown_list}>
            {Object.values(this.props.symbols).map(this.renderList)}
          </ul>
        )}
      </div>
    );
  }
}
