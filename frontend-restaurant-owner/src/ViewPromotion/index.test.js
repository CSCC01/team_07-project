/**
 * This test suite tests view promotion.
 * The following aspects are tested:
 * 1. Logout button is able to render without crashing
 */

import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor } from '@testing-library/react';
import PromotionListDetail from '.';
import ViewPromotion from '.';
import { getPromotions } from './index.js';

const jwt_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk2MzE4MzQ4LCJleHAiOjE1OTg5MTAzNDh9.yU3UWqpmbCzX2a8ZbYD-9cxfRuKLeO3H-7uUI8JjUBA';

beforeAll(() => (axios.defaults.baseURL = process.env.BASE_URL || 'http://localhost:1337'));

/**
 * Shows "You have not created any promotion yet! :("
 * for a restaurant with no promotions created.
 */
it('renders promotion list without crashing', async () => {
  const jwt_token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk2MzE4MzQ4LCJleHAiOjE1OTg5MTAzNDh9.yU3UWqpmbCzX2a8ZbYD-9cxfRuKLeO3H-7uUI8JjUBA';
  const { getByTestId } = render(<ViewPromotion />);
  // let restaurant = await getRestaurant('/users/me/', jwt_token).data;
  // await waitFor(() => expect(getByTestId('no-promo-list')).toBeInTheDocument());
});
