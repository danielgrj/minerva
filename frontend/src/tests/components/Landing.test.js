import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Landing from './../../components/Landing';

test('should render landing page correctly', () => {
  const wrapper = shallow(<Landing />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
