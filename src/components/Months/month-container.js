import React, { useState } from 'react';
import styled from 'styled-components';

import Day from '../Days/day-container';
import Modal from '../Modal/modal-container';

const StyledMonth = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(14%,max-content));
  grid-template-rows: auto;
  align-items: start;
  width: 80%;
  margin: 2rem auto;
  justify-content: center;

  & > span {
    overflow-x: hidden;
  } 
  
  & > span.header {
    background-color: #557bd4;
    color: white;
    text-align: center;
    font-weight: 600;
    font-size: .6rem;
    line-height: 1.6;
    text-transform: Capitalize;
    padding: 5px 0;
  }

  & > span.day:nth-child(7n+1), & > span.day:nth-child(7n) {
    color: blue;
    font-weight: 400;
    background-color: #f7f7f7;
  }
`;

const Month = props => {
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [selectedDate, setDate] = useState(0);
  let days = [];

  const addReminder = day => {
    setDialogVisible(!isDialogVisible);
    setDate(day);
  }

  let currentMonth = 'Jan'
  for (let day = 0; day <= 34; day++) {
    days.push(<Day key={currentMonth + day} date={day % 31 + 1} onClick={() => addReminder((day % 31) + 1)} />);
  }
  return (
    <React.Fragment>
      <StyledMonth>
        <span className="header">Sunday</span>
        <span className="header">Monday</span>
        <span className="header">Tuesday</span>
        <span className="header">Wednesday</span>
        <span className="header">Thursday</span>
        <span className="header">Friday</span>
        <span className="header">Saturday</span>
        {days}
      </StyledMonth>
      <Modal title={`Set reminder for ${selectedDate}`} visible={isDialogVisible}/>
    </React.Fragment>
  );
}

export default Month;