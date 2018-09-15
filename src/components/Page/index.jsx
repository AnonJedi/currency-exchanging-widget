import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import ValueForm from 'components/ValueForm';
import Widget from 'components/Widget';
import { CURRENCY_SYMBOLS } from 'constants';

import styles from './page.scss';

const currencySymbolKeys = Object.keys(CURRENCY_SYMBOLS);

function Page(props) {
  const { accountData: { accountVal, defaultCarrency } } = props;
  return (
    <div className={styles.container}>
      <ValueForm />
      <Widget
        value={accountVal}
        defaultCurrency={defaultCarrency}
      />
    </div>
  );
}

Page.propTypes = {
  accountData: propTypes.shape({
    accountVal: propTypes.string.isRequired,
    defaultCarrency: propTypes.oneOf(currencySymbolKeys).isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  accountData: state.accountData,
});

export default connect(mapStateToProps)(Page);
