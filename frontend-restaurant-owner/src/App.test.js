import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from './App';
import { Router } from 'react-router-dom';

import axios from 'axios';
beforeAll(() => (axios.defaults.baseURL = process.env.BASE_URL || 'http://localhost:1337'));

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

it('has a connection to backend', async () => {
  await expect(axios.get('/')).resolves.toBeTruthy();
});
