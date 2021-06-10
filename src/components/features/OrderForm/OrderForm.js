import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderForm.scss';

import {Row, Col} from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';
import OrderOption from '../OrderOption/OrderOption';
import pricing from '../../../data/pricing.json';

const OrderForm = ({ tripCost, options, setOrderOption }) => {
  console.log('options', options);
  return (
    <div className={styles.component}>
      <Row>
        {pricing.map(option =>(
          <Col md={4} key={option.id}>
            <OrderOption setOrderOption={setOrderOption} tripCost={tripCost} currentValue={options[option.id]} {...option} />
          </Col>))
        }
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
  pricing: PropTypes.array,
  setOrderOption: PropTypes.func,
};

export default OrderForm;
