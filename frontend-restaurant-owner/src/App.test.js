/**
 * This test suite tests App component.
 * The following aspects are tested:
 * 1. The login page is rendered on the page
 */

import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from './App';
import { Router } from 'react-router-dom';

/**
 * Ensure that the login page is rendered on the page.
 */
it('renders login page', () => {
  // https://testing-library.com/docs/example-react-router
  const history = createMemoryHistory();
  const { getByRole } = render(
    <Router history={history}>
      <App />
    </Router>,
  );
  expect(getByRole('heading', { name: /Login/i })).toBeInTheDocument();
});
