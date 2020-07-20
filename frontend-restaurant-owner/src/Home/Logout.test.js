import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Logout from './Logout';

/**
 * This test suite tests Logout component.
 * The following aspects are tested:
 * 1. Logout is able to render without crashing
 * 2. Logout is present in a document
 * 3. Calls localStorage clear and location assign on click
 */

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      clear: jest.fn(() => null),
    },
  });
  Object.defineProperty(window, 'location', {
    value: {
      assign: jest.fn(() => null),
    },
  });
});

/**
 * Renders logout button without crashing
 */
it('renders logout button without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Logout />, div);
});

/**
 * Shows a logout button
 */
it('shows a logout button', () => {
  const { getByTestId } = render(<Logout />);
  expect(getByTestId('logout')).toBeInTheDocument();
});

/**
 * Calls localStorage clear and location assign on click
 */
it('calls localStorage clear and location assign on click', () => {
  const { getByTestId } = render(<Logout />);
  fireEvent.click(getByTestId('logout'));
  expect(window.localStorage.clear).toBeCalled();
  expect(window.location.assign).toBeCalledWith('/login');
});
