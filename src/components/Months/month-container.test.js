import App from '../../index';
import { mount } from 'enzyme';

describe('Tests', () => {
  expect('Components renders', () => {
    // eslint-disable-next-line react/react-in-jsx-scope
    const wrapper = mount(<App />);
    console.log(wrapper.debug());
    expect(wrapper);
  });
});