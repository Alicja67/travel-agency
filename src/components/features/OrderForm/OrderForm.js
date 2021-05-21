import React from 'react';
// import PropTypes from 'prop-types';
import styles from './OrderForm.scss';

import {Row, Col} from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';

const OrderForm = () => {
  return (
    <div className={styles.component}>
      <Row>
        <Col xs={12}>
          <OrderSummary />
        </Col>
      </Row>
    </div>
  );
};

// OrderForm.propTypes = {
// };

export default OrderForm;
