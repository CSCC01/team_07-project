/**
 * This test suite tests Register component.
 * The following aspects are tested:
 * 1. The register page has input boxes and register button on the page.
 * 2. When user gives incomplete inputs, an alert shows up.
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Register from '.';

/**
 * Ensure that the register page has input boxes and register button on the page.
 */
it('shows register input boxes and buttons', () => {
  const { getByRole, getByLabelText } = render(<Register />);
  expect(getByRole('button', { name: /register/i })).toBeInTheDocument();
  expect(getByRole('textbox', { name: /username/i })).toBeInTheDocument();
  expect(getByRole('textbox', { name: /email/i })).toBeInTheDocument();
  expect(getByLabelText(/^password/i)).toBeInTheDocument();
  expect(getByLabelText(/confirm password/i)).toBeInTheDocument();
});

/**
 * Ensure that when user gives incomplete inputs, an alert shows up.
 */
it('alerts when user gives incomplete inputs', async () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  jest.spyOn(window.console, 'warn').mockImplementation(() => {});
  const { getByRole } = render(<Register />);
  fireEvent.click(getByRole('button', { name: /register/i }));
  await waitFor(() => expect(window.alert).toBeCalled());
});
