import React from 'react';
import { shallow } from 'enzyme';

import Search from './Search';

describe('Search', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Search onChange={() => {}} />);
    expect(wrapper.render()).toMatchSnapshot();
  });
});
