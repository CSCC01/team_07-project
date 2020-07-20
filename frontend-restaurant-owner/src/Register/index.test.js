import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Register from '.';

import axios from 'axios';
beforeAll(() => (axios.defaults.baseURL = process.env.BASE_URL || 'http://localhost:1337'));

it('shows register input boxes and buttons', () => {
  const { getByRole, getByLabelText } = render(<Register />);
  expect(getByRole('button', { name: /register/i })).toBeInTheDocument();
  expect(getByRole('textbox', { name: /username/i })).toBeInTheDocument();
  expect(getByRole('textbox', { name: /email/i })).toBeInTheDocument();
  expect(getByLabelText(/^password/i)).toBeInTheDocument();
  expect(getByLabelText(/confirm password/i)).toBeInTheDocument();
});

it('alerts when user gives incomplete inputs', async () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  jest.spyOn(window.console, 'warn').mockImplementation(() => {});
  const { getByRole } = render(<Register />);
  fireEvent.click(getByRole('button', { name: /register/i }));
  await waitFor(() => expect(window.alert).toBeCalled());
});
