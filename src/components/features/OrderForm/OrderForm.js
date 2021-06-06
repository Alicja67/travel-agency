import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderForm.scss';

import {Row, Col} from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';

const OrderForm = ({ tripCost, options }) => {
  console.log('options', options);
  return (
    <div className={styles.component}>
      <Row>
        <Col xs={12}>
          <OrderSummary tripCost={tripCost} options={options}/>
        </Col>
      </Row>
    </div>
  );
};

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
};

export default OrderForm;
