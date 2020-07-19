import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Logout from './Logout';

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      clear: jest.fn(() => null),
    },
    writable: true,
  });
});

it('renders logout button without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Logout />, div);
});

it('shows a logout button', () => {
  const { getByTestId } = render(<Logout />);
  expect(getByTestId('logout')).toBeInTheDocument();
});

it('calls localStorage clear on click', () => {
  const { getByTestId } = render(<Logout />);
  fireEvent.click(getByTestId('logout'));
  expect(window.localStorage.clear).toBeCalled();
});
