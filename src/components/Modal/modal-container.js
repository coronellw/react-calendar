import React, { Component, Fragment } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
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
StyledButton.displayName = 'StyledButton';

const StyledTextArea = styled.textarea`
  border-radius: 15px;
  padding: 5px 10px;
  margin: 3px;
`;
StyledTextArea.displayName = 'StyledTextArea';
const StyledInput = styled.input`
  border-radius: 15px;
  padding: 5px 10px;
  margin: 3px;
`;
StyledInput.displayName = 'StyledInput';

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
StyledDiv.displayName = 'ModalSection'

const StyledColor = styled.span`
    background-color: ${props => props.bgColor};
    border-radius: 100px;
    border: 1px solid black;
    padding: 5px;
    cursor: pointer;
    margin: 1rem 0;
  `;

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showColorPicker: false,
      color: '#fff',
      title: '',
      city: '',
      note: '',
      time: '',
      date: ''
    }
  }

  componentDidUpdate() {
    const { editMode, reminder } = this.props;
    if (editMode && reminder && (this.state.previousId === undefined)) {
      this.setState({
        ...reminder,
        previousId: {
          date: reminder.date,
          id: reminder.id,
          time: reminder.time,
        },
      })
    }
  }

  render() {
    const { title, color, date, time, city, note, showColorPicker, previousId } = this.state;
    const { onCancel, onSave, visible, editMode, deleteOne } = this.props;
    const initialState = { showColorPicker: false, color: '#fff', title: '', city: '', note: '', time: '', date: '', id: null, weather: '', previousId: undefined, };

    return (
      <StyledDiv visible={visible}>
        <span className="content">
          <span className="title">{editMode ? <Fragment>Edit Reminder {'   '}<FontAwesomeIcon onClick={() => deleteOne(previousId)} icon={faTrash} color="#f00" /></Fragment> : 'New Reminder'}</span>
          <label>Title: </label>
          <div>
            <StyledInput displayName="Title" type="text" name="title" value={title} onChange={e => this.setState({ title: e.target.value })} />
            {title.length > 30 ? <StyledError>Title must be 30 characters max</StyledError> : null}
          </div>

          <label>Date: </label>
          <StyledInput type="date" name="date" value={date} onChange={e => this.setState({ date: e.target.value })} />

          <label>Time: </label>
          <StyledInput type="time" name="time" value={time} onChange={e => this.setState({ time: e.target.value })} />

          <label>City: </label>
          <StyledInput type="text" name="city" value={city} onChange={e => this.setState({ city: e.target.value })} />

          <label>Reminder:</label>
          <StyledTextArea value={note} name="note" rows="3" onChange={e => this.setState({ note: e.target.value })} />

          <label>Color: </label>
          {
            showColorPicker ?
              <CirclePicker
                color={color}
                width="80%"
                onChange={selectedColor => {
                  if (color === selectedColor.hex) {
                    this.setState({ color: '#ffffff' })
                  } else {
                    this.setState({ color: selectedColor.hex })
                  }
                  this.setState({ showColorPicker: false });
                }}
              />
              : <StyledColor
                onClick={() => this.setState({ showColorPicker: true })}
                bgColor={color}>&nbsp;</StyledColor>
          }
          <StyledButton
            onClick={() => {
              onCancel();
              this.setState(initialState);
            }}
            className="danger">Cancel</StyledButton>
          <StyledButton
            onClick={async () => {
              if (title.length < 30) {
                try {
                  const locationCoordinates = await geolocation.get(`/${city}.json`);
                  const [latitude, longitude] = locationCoordinates.data.features[0].center;
                  const wtime = moment(date).format('YYYY-MM-DDTHH:MM:SS');
                  const weather = await weatherFetcher.get(`/${longitude},${latitude},${wtime}`);
                  this.setState(initialState, () => {
                    onSave({
                      id: new Date(`${date} ${time}`).getTime(),
                      title,
                      city,
                      note,
                      color,
                      reminderDate: date,
                      reminderTime: time,
                      weather: weather.data.currently.summary + '@' + city,
                      previousId,
                    })
                  });
                }
                catch (e) {
                  console.log('There was an error fetching data', e);
                }
              } else {
                alert('Please correct the errors first');
              }
            }
            }
            className="info">Save</StyledButton>
        </span>
      </StyledDiv>
    )
  };
}

export default Modal;