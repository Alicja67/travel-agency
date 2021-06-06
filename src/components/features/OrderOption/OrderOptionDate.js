import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';


const OrderOptionDate = ( { setOptionValue }) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className={styles.component}>
      <DatePicker
        selected={startDate}
        onChange={date => setOptionValue(date)}
        onSelect={date => setStartDate(date)}
      />
    </div>
  );
};

OrderOptionDate.propTypes = {
  setOptionValue: PropTypes.func,
};

export default OrderOptionDate;
