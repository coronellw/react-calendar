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
  opacity: ${props => props.visible ? '1' : '0'}
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
AddReminder.displayName = 'AddReminder';
const StyledTitle = styled.h2`
  font-size: 2rem;
  margin: 1rem;
  text-align: center;
`;

const momentFormat = date => moment(date).format('DDMMYYYY');

const Month = props => {
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [date, setDate] = useState(`2019-08`);
  const [reminders, setReminders] = useState({});
  const [reminder, setReminder] = useState({
    title: '',
    city: '',
    note: '',
    color: '#fff',
    date: '',
    reminderTime: '',
    weather: '',
  });

  let days = [];

  const saveReminder = ({ id, title, city, note, color, reminderDate, reminderTime, weather, previousId, }) => {
    // Delete previous occurrence if updating
    let temp = reminders;
    if (previousId && previousId.id) {
      let timestamp = momentFormat(previousId.date);
      temp[timestamp] = temp[timestamp].filter(r => r.id !== previousId.id);
    }

    if (Array.isArray(temp[momentFormat(reminderDate)])) {
      temp[momentFormat(reminderDate)].push({ id, title, city, note, color, date: reminderDate, time: reminderTime, weather, });
    } else {
      temp[momentFormat(reminderDate)] = [{ id, title, city, note, color, date: reminderDate, time: reminderTime, weather, }];
    };
    setReminders(temp);
    setReminder(null);
    setDialogVisible(false);
  };

  const newReminder = () => {
    setEditing(false);
    setDialogVisible(true);
  }

  const editReminder = (id, date) => {
    let r = reminders[momentFormat(date)].find(reminder => reminder.id === id);
    setReminder(r);
    setEditing(true);
    setDialogVisible(true);
  }

  const deleteReminders = (fullDate) => {
    let dayToDelete = new Date(fullDate);
    let temp = reminders;
    let answer = window.confirm(`Do you want to delete ALL the reminders of ${moment(dayToDelete).format('MMMM-DD-YYYY')}?`)
    if (answer) {
      debugger;
      temp[momentFormat(dayToDelete)] = [];
      setReminders(temp);
      setReminder({});
    }
  }

  const deleteOne = (previousId) => {
    let answer = window.confirm('Do you want to delete this reminder?');
    if (answer) {
      let temp = reminders;
      if (previousId && previousId.id) {
        let timestamp = momentFormat(previousId.date);
        temp[timestamp] = temp[timestamp].filter(r => r.id !== previousId.id);
      }
      setReminders(temp);
      setReminder(null);
      setDialogVisible(false);
    }
  }

  let [selectedYear, selectedMonth] = date.toString().split('-');
  let today = new Date(selectedYear, selectedMonth - 1, 1);
  let offSet = new Date(today.getFullYear(), today.getMonth(), 1).getDay();

  for (let day = 1; day <= 35; day++) {
    let currentDay = new Date(today.getFullYear(), today.getMonth(), day - offSet);
    days.push(<Day
      key={currentDay.getTime()}
      date={currentDay.getDate()}
      fullDate={currentDay.getTime()}
      deleteReminders={deleteReminders}
      editReminder={editReminder}
      reminders={reminders[momentFormat(currentDay)]}
    />);
  }
  return (
    <React.Fragment>
      <input value={date} type="month" onChange={e => setDate(e.target.value)} />
      <StyledTitle>{moment(date + '-01').format('MMMM - YYYY')}</StyledTitle>
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
        deleteOne={deleteOne}
        onCancel={() => { setDialogVisible(false); setEditing(false) }}
        reminder={isEditing ? reminder : null}
        editMode={isEditing}
      />
      <AddReminder
        id="addButton"
        visible={!isDialogVisible}
        onClick={newReminder}
        reminder={null}
      >+</AddReminder>
    </React.Fragment>
  );
}

export default Month;