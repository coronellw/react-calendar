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
  const [reminders, setReminders] = useState({});
  let days = [];

  const addReminder = day => {
    setDialogVisible(!isDialogVisible);
    setDate(day);
  }

  const saveReminder = ({ title, city, note, color }) => {
    if (Array.isArray(reminders[selectedDate])) { 
      reminders[selectedDate].push({ title, city, note, color }); 
    } else { 
      reminders[selectedDate] = [{ title, city, note, color }];
    };
    setReminders(reminders);
    setDialogVisible(false);
  };

  let today = new Date();
  for (let day = 0; day <= 34; day++) {
    console.log(today);
    console.log(`First day: ${new Date(today.getFullYear(), today.getMonth(), 1)}`)
    console.log(`Lastn day: ${new Date(today.getFullYear(), today.getMonth(), -1)}`)
    console.log(`Month: ${today.getMonth() + 1}`);
    console.log(`WeekDay ${today.getDay()}`);
    days.push(<Day key={today + day} date={day % 31 + 1} onClick={() => addReminder((day % 31) + 1)} reminders={reminders[day+1]} />);
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
      <Modal
        title={`Set reminder for ${selectedDate}`}
        visible={isDialogVisible}
        onSave={saveReminder}
        onCancel={() => setDialogVisible(false)}
      />
    </React.Fragment>
  );
}

export default Month;