import React from 'react';
// import PropTypes from 'prop-types';
import styles from './OrderSummary.scss';

const OrderSummary = (props) => {
  return (
    <div>
      <h2 className={styles.component}>Total</h2>
      <strong>{props}</strong>
    </div>
  );
};

// OrderSummary.propTypes = {
// };

export default OrderSummary;
