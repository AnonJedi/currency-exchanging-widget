import React from 'react';
import classnames from 'classnames';

import Rates from 'components/Widget/Rates';
import styles from './widget.scss';

export default class Widget extends React.Component {
  static tabContent = {
    rates: <Rates />,
  }

  static tabs = {
    rates: 'rates',
    converter: 'converter',
  }

  constructor(props) {
    super(props);
    this.state = {
      activeTab: Widget.tabs.rates,
    };

    this.tabs = Object.keys(Widget.tabs);
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
    return (
      <div className={styles.container}>
        <h3 className={styles.header}>Exchange</h3>

        <div className={styles.tabs}>
          {this.tabs.map(this.renderTabs)}
        </div>

        {Widget.tabContent[this.state.activeTab]}
      </div>
    );
  }
}
