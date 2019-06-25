import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import App from './App';

describe('App', () => {
  const mockData = [
    {
      title: 'Title',
      images: {
        fixed_width_still: {
          width: '200',
          url: 'http://url.com',
        },
      },
    },
  ];

  let wrapper: ReactWrapper<any, any, App>;

  beforeEach(() => {
    wrapper = mount(<App />);
  });

  it('renders correctly', () => {
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('renders loading indicator', () => {
    wrapper.setState({
      loadingQuery: true,
    });

    expect(wrapper.find('Spinner')).toHaveLength(1);
  });

  it('renders images feed', () => {
    wrapper.setState({
      data: mockData,
    });

    expect(wrapper.find('Spinner')).toHaveLength(0);
  });
});
