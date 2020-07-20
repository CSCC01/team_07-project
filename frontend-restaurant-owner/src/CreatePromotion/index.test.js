import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreatePromotion from '.';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';

import axios from 'axios';
beforeAll(() => (axios.defaults.baseURL = process.env.BASE_URL || 'http://localhost:1337'));

configure({ adapter: new Adapter() });

// test the existence of the submit button
it('shows the submit button', () => {
  const { getByRole } = render(<CreatePromotion />);
  expect(getByRole('button', { name: /submit/i })).toBeInTheDocument();
});

// test invalid data

// test empty task
it('alerts when task field is empty on submission', async () => {
  jest.spyOn(window, 'alert');
  const wrapper = mount(<CreatePromotion />);
  wrapper.setState({
    image: [0, null],
    sourceImage: ['test.jpeg', null],
    currentIndex: 1,
    title: 'test',
    description: 'test',
    startTime: '2020-08-20T00:00',
    closeTime: '2020-09-24T00:00',
    tasks: [],
    reward: 1,
    disable: 1,
  });

  wrapper.find('#submit').at(0).simulate('click');
  await waitFor(() => expect(window.alert).toBeCalled());
});

// test data function

// test with valid data
