import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import propTypes from 'prop-types';

import Rates from 'components/Widget/Rates';
import Converter from 'components/Widget/Converter';
import { getAllSymbols } from 'actions/currencies';
import styles from './widget.scss';

class Widget extends React.Component {
  static tabContent = {
    rates: () => <Rates />,
    converter: props => <Converter accountValues={props.accountValues} />,
  }

  static tabs = {
    converter: 'converter',
    rates: 'rates',
  }

  static propTypes = {
    getAllSymbols: propTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      activeTab: Widget.tabs.converter,
    };

    this.tabs = Object.keys(Widget.tabs);
  }

  componentDidMount() {
    this.props.getAllSymbols();
  }

  onTabClick = (e) => {
    const nextTab = e.currentTarget.dataset.value;
    if (this.state.activeTab === nextTab || !Widget.tabs[nextTab]) { return; }

    this.setState({ activeTab: nextTab });
  }

  renderTabs = tabKey => (
    <button
      key={tabKey}
      className={classnames(styles.tab, {
        [styles.active]: this.state.activeTab === tabKey,
      })}
      onClick={this.onTabClick}
      data-value={tabKey}
      type="button"
    >
      {Widget.tabs[tabKey]}
    </button>
  )

  render() {
    let tabContent = null;

    if (Widget.tabContent[this.state.activeTab]) {
      tabContent = Widget.tabContent[this.state.activeTab](this.props);
    }

    return (
      <div className={styles.container}>
        <h3 className={styles.header}>Exchange</h3>

        <div className={styles.tabs}>
          {this.tabs.map(this.renderTabs)}
        </div>

        {tabContent}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getAllSymbols: bindActionCreators(getAllSymbols, dispatch),
});

export default connect(null, mapDispatchToProps)(Widget);
