import React from 'react';
import styled from 'styled-components';

const Reminder = styled.li`
  background-color: ${props => props.bgColor};
  list-style-type: none;
  padding: .3rem;
  z-index: 0;
  position: relative;
  .deleteOne {
    position: abolute;
    right: 5px;
    z-index: 5;
  }
`;
Reminder.displayName='Reminder';

const Day = props => {
  const { reminders, editReminder } = props;
  let remindersElement = Array.isArray(reminders) ?
    reminders.map((r, i) => {
      return <Reminder
        key={r.title + '_' + i}
        title={r.weather}
        bgColor={r.color}
        onClick={() => {
          editReminder(r.id, r.date);
        }}
      >{r.title}</Reminder>
    })
    : [];
  const StyledDay = styled.span`
    border: 1px solid black;
    padding: 0.5rem;
    height: 10vh;
    position: relative;
    .delete {
      opacity: ${props => props.isEmpty ? '0' : '1'}
      position: absolute;
      top: 6px;
      right: 4px;
      transition: all 1s;
    }
  `;
  StyledDay.displayName = "Day";

  return (
    <StyledDay className="day" onClick={props.onClick} isEmpty={remindersElement.length === 0}>
      <span title="delte this day reminders" className="delete" onClick={() => props.deleteReminders(props.fullDate)}>X</span>
      {props.date}
      <ul>
        {remindersElement}
      </ul>
    </StyledDay>
  )
}

export default Day;