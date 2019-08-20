/* eslint-disable */
import React from 'react';
import App from './month-container';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

jest.mock('../../config');
import { geolocation, weatherFetcher } from '../../config';
Enzyme.configure({ adapter: new Adapter() });

const wrapper = mount(<App />);

// Finders
const Month = () => wrapper.find('Month');
const addReminder = () => wrapper.find('AddReminder');
const Modal = () => wrapper.find('Modal');
const InputTitle = () => wrapper.find('StyledInput').at(0);
const InputDate = () => wrapper.find('StyledInput').at(1);
const InputTime = () => wrapper.find('StyledInput').at(2);
const InputCity = () => wrapper.find('StyledInput').at(3);
const InputNote = () => wrapper.find('StyledTextArea');
const CalendarDay = () => wrapper.find('Day[date=19]');
const OkButton = () => wrapper.find('StyledButton.info');

describe('Month Container', () => {
  it('Click "add reminder" shows modal windows', async () => {
    expect(Modal().props().visible).toEqual(false);
    addReminder().simulate('click');
    expect(Modal().props().visible).toEqual(true);

    InputTitle().simulate('change', { target: { value: 'Test 1' } });
    InputDate().simulate('change', { target: { value: '08/19/2019' } });
    InputTime().simulate('change', { target: { value: '10:30 PM' } });
    InputCity().simulate('change', { target: { value: 'New York' } });
    InputNote().simulate('change', { target: { value: 'Nothing' } });

    OkButton().simulate('click');
    expect(addReminder().props().visible).toEqual(false);
  });
});