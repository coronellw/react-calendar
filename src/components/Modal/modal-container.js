import React, { useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { geolocation, weatherFetcher } from '../../config';
import { CirclePicker } from 'react-color';


const StyledButton = styled.a`
  border-radius: 100rem;
  color: white;
  font-weight: 400;
  text-align: center;
  padding: 10px 20px;
  margin-right: 1rem;
  cursor: pointer;
  &.danger {
    background-color: red;
  }
  &.info {
    background-color: blue;
  }
`;

const StyledTextArea = styled.textarea`
  border-radius: 15px;
  padding: 5px 10px;
  margin: 3px;
`;
const StyledInput = styled.input`
  border-radius: 15px;
  padding: 5px 10px;
  margin: 3px;
`;
const StyledError = styled.span`
  color: red;
  font-size: .75rem;
`;

const StyledDiv = styled.div`
    display: ${props => props.visible ? 'block' : 'none'};
    position: absolute;
    top: 0;
    right: 0;
    background-color: rgba(0,0,0,.7);
    width: 100%;
    height: 100%;
    
    span.content {
      background-color: white;
      display: grid;
      border-radius: 15px;
      font-size: 1rem;
      position: absolute;
      padding: 4rem 2rem;
      top: 20%;
      left: 25%;
      width: 60%;
      transform: translateX(-15%);

      @media screen and (min-width: 480px) {
        grid-template-columns: repeat(2, 1fr);
      }

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

const StyledColor = styled.span`
    background-color: ${props => props.bgColor};
    border-radius: 100px;
    border: 1px solid black;
    padding: 5px;
    cursor: pointer;
    margin: 1rem 0;
  `;

const Modal = props => {
  const [color, setColor] = useState('#ffffff');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [note, setNote] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  return (
    <StyledDiv visible={props.visible}>
      <span className="content">
        <span className="title">New Reminder</span>
        <label>Title: </label>
        <div>
          <StyledInput type="text" value={title} onChange={e => setTitle(e.target.value)} />
          {title.length > 30 ? <StyledError>Title must be 30 characters max</StyledError> : null}
        </div>

        <label>Date: </label>
        <StyledInput type="date" value={date} onChange={e => setDate(e.target.value)} />

        <label>Time: </label>
        <StyledInput type="time" value={time} onChange={e => setTime(e.target.value)} />

        <label>City: </label>
        <StyledInput type="text" value={city} onChange={e => setCity(e.target.value)} />

        <label>Reminder:</label>
        <StyledTextArea value={note} rows="3" onChange={e => setNote(e.target.value)} />

        <label>Color: </label>
        {
          showColorPicker ?
            <CirclePicker
              color={color}
              width="80%"
              onChange={selectedColor => {
                if (color === selectedColor.hex) {
                  setColor('#ffffff')
                } else {
                  setColor(selectedColor.hex)
                }
                setShowColorPicker(false);
              }}
            />
            : <StyledColor
              onClick={() => setShowColorPicker(true)}
              bgColor={color}>&nbsp;</StyledColor>
        }
        <StyledButton onClick={props.onCancel} className="danger">Cancel</StyledButton>
        <StyledButton
          onClick={async () => {
            if (title.length < 30) {
              try {
                const locationCoordinates = await geolocation.get(`/${city}.json`);
                const [latitude, longitude] = locationCoordinates.data.features[0].center;
                const wtime = moment(date).format('YYYY-MM-DDTHH:MM:SS');
                const weather = await weatherFetcher.get(`/${longitude},${latitude},${wtime}`);
                props.onSave({ title, city, note, color, reminderDate: date, reminderTime: time, weather: weather.data.currently.summary + '@' + city });
              }
              catch (e) {
                console.log('There was an error fetching data');
              }
            } else {
              alert('Please correct the errors first');
            }
          }
          }
          className="info">Save</StyledButton>
      </span>
    </StyledDiv>
  );
}

export default Modal;