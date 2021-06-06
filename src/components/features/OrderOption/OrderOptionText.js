import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';

const OrderOptionText = ({ setOptionValue }) => {
  return (
    <div className={styles.text}>
      <input
        type='text'
        onChange={event => setOptionValue(event.currentTarget.value)}
      />
    </div>
  );
};

OrderOptionText.propTypes = {
  setOptionValue: PropTypes.func,
};

export default OrderOptionText;
