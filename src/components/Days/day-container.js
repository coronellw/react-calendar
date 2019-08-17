import React from 'react';
import styled from 'styled-components';

const StyledDay = styled.span`
  border: 1px solid black;
  padding: 0.5rem;
  height: 10vh;
`;

const Day = props => {

  return (
    <StyledDay className="day" onClick={() => { alert(props.date) }}>
      {props.date}
    </StyledDay>
  )
}

export default Day;