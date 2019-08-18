import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';

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

const AddReminder = styled.span`
  opacity: ${props => props.visible ? '1':'0'}
  border-radius: 100rem;
  background-color: #557bd4;
  color: white;
  font-weight: bold;
  font-size: 2rem;
  padding: .5rem 1rem;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  transition: all 1s;
`;

const Month = props => {
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [date, setDate] = useState(`2019-08`);
  const [reminders, setReminders] = useState({});
  let days = [];

  const saveReminder = ({ title, city, note, color, reminderDate, reminderTime, weather, }) => {
    if (Array.isArray(reminders[moment(reminderDate).format('DDMMYYYY')])) {
      reminders[moment(reminderDate).format('DDMMYYYY')].push({ title, city, note, color, reminderTime, weather, });
    } else {
      reminders[moment(reminderDate).format('DDMMYYYY')] = [{ title, city, note, color, weather, }];
    };
    setReminders(reminders);
    setDialogVisible(false);
  };

  let [selectedYear, selectedMonth] = date.toString().split('-');
  let today = new Date(selectedYear, selectedMonth - 1, 1);
  let offSet = new Date(today.getFullYear(), today.getMonth(), 1).getDay();

  for (let day = 1; day <= 35; day++) {
    let currentDay = new Date(today.getFullYear(), today.getMonth(), day - offSet);
    days.push(<Day key={currentDay.getTime()} date={currentDay.getDate()} reminders={reminders[moment(currentDay).format('DDMMYYYY')]} />);
  }
  return (
    <React.Fragment>
      <input value={date} type="month" onChange={e => setDate(e.target.value)} />
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
      <Modal
        visible={isDialogVisible}
        onSave={saveReminder}
        onCancel={() => setDialogVisible(false)}
      />
      <AddReminder visible={!isDialogVisible} onClick={() => setDialogVisible(true)}>+</AddReminder>
    </React.Fragment>
  );
}

export default Month;