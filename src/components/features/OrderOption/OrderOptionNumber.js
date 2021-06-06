import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';

const OrderOptionNumber = ({ currentValue, limits, setOptionValue, price}) => {
  return (
    <div className={styles.number}>
      <input
        type='number'
        className={styles.inputSmall}
        value={Number(currentValue)}
        min={limits.min}
        max={limits.max}
        onChange={event => setOptionValue(event.currentTarget.value)}
      />
      {' ' + price}
    </div>
  );
};

OrderOptionNumber.propTypes = {
  currentValue: PropTypes.any,
  limits: PropTypes.object,
  setOptionValue: PropTypes.func,
  price: PropTypes.string,
};

export default OrderOptionNumber;
