import React from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';

import styles from './button.scss';

export default function Button({
  onClick,
  children,
  className,
  ...restProps
}) {
  return (
    <button
      onClick={onClick}
      className={classnames(styles.container, className)}
      type="button"
      {...restProps}
    >
      {children()}
    </button>
  );
}

Button.propTypes = {
  onClick: propTypes.func.isRequired,
  children: propTypes.func.isRequired,
  className: propTypes.string,
};

Button.defaultProps = {
  className: '',
};
