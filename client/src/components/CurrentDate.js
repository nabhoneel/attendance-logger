import React from 'react';
import './CurrentDate.scss';
import Date from '../date';

const CurrentDate = () => {
  return (
    <div className="CurrentDate">
      Today it's:<br />
      { Date.date }
    </div>
  );
};

export default CurrentDate;