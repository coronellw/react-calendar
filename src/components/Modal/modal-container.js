import React from 'react';
import styled from 'styled-components';

const Modal = props => {
  const StyledDiv = styled.div`
    display: ${props.visible ? 'block' : 'none'};
    position: absolute;
    top: 0;
    right: 0;
    background-color: rgba(0,0,0,.7);
    width: 100vw;
    height: 100vh;
    
    span.content {
      background-color: white;
      border-radius: 15px;
      font-size: 1rem;
      position: absolute;
      padding: 4rem 2rem;
      top: 20%;
      right: 25%;
      width: 50%;

      .title {
        position: absolute;
        border-radius: 15px 15px 0 0;
        background-color: #c7c7c7;
        width: 100%;
        top: 0;
        right: 0;
        padding: 1rem 0;
        text-align: center;
      }
    }
  `;

  const StyledButton = styled.a`
    border-radius: 100rem;
    text-align: center;
    padding: 10px 20px;
    margin-right: 1rem;
    &.danger {
      background-color: red;
    }
    &.info {
      background-color: blue;
    }
  `;
  const StyledButtomSection = styled.div`
    margin-top: 2rem;
    text-align: right;
  `;
  return (
    <StyledDiv>
      <span className="content">
        <span className="title">{props.title}</span>
        <label>City: </label>
        <input type="text" />
        <br />
        <label>Reminder:</label>
        <br />
        <textarea rows="4" cols="50" />
        <br />
        <StyledButtomSection>
          <StyledButton className="danger">Cancel</StyledButton>
          <StyledButton className="info">Submit</StyledButton>
        </StyledButtomSection>
      </span>
    </StyledDiv>
  );
}

export default Modal;