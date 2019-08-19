import React from 'react';
import styled from 'styled-components';

const Reminder = styled.li`
  background-color: ${props => props.bgColor};
  list-style-type: none;
  padding: .3rem;
`;

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
  `;

  return (
    <StyledDay className="day" onClick={props.onClick}>
      {props.date}
      <ul>
        {remindersElement}
      </ul>
    </StyledDay>
  )
}

export default Day;