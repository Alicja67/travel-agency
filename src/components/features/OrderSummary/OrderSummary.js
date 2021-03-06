import React from 'react';
import PropTypes from 'prop-types';

import styles from './OrderSummary.scss';
import { calculateTotal } from '../../../utils/calculateTotal';
import { formatPrice } from '../../../utils/formatPrice';

const OrderSummary = ({ tripCost, options }) => {
  if(options.id === 'start-date') console.log('Brawo!');

  return (
    <div>
      <h2 className={styles.component}>
        Total: <strong>{formatPrice(calculateTotal(tripCost, options))}</strong>
      </h2>
    </div>
  );
};

OrderSummary.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
};

export default OrderSummary;
