import React from 'react';
import styles from './OrderOption.scss';
import PropTypes, { string } from 'prop-types';
import { formatPrice } from '../../../utils/formatPrice';
import Icon from '../../common/Icon/Icon';


const OrderOptionIcons = ({ values, setOptionValue, required, currentValue }) => {
  return(
    <div className={styles.icon}>
      {required ? '' : (
        <div key='null' onClick={()=> setOptionValue('')} >
          <Icon name='times-circle'/>
          none
        </div>
      )}
      {values.map(value=> {
        return (
          <div
            key={value.id}
            className={currentValue === value.id ? styles.icon && styles.iconActive : styles.icon}
            onClick={()=> setOptionValue(value.id)}
          >
            <Icon name={value.icon} />
            {value.name} ({formatPrice(value.price)})
          </div>
        );
      })}
    </div>
  );
};

OrderOptionIcons.propTypes = {
  values: PropTypes.array,
  setOptionValue: PropTypes.func,
  required: PropTypes.bool,
  currentValue: string,
};

export default OrderOptionIcons;
