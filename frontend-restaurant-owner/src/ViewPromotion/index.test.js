/**
 * This test suite tests view promotion.
 * The following aspects are tested:
 * 1. Get empty promotion list from backend
 * 2. Shows a no promotion message for empty promotion list
 */

import React from 'react';
// import axios from 'axios';
// import ReactDOM from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor } from '@testing-library/react';
import PromotionListDetail from '.';
import { getPromotions } from '.';
import { getRestaurant } from '.';

const jwt_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk2MDg3NDg2LCJleHAiOjE1OTg2Nzk0ODZ9.bH-txoYGWnFdv4JWqvv_NQKWsNvcIOjBjJmKltk3mr8';

/**
 * Get empty promotion list from backend
 * (temporary)
 */
it('get empty promotion list from backend', async () => {
  let restaurant = await getRestaurant(jwt_token);
  let actualPromotions = await getPromotions(jwt_token, restaurant.data);

  await waitFor(() => expect(actualPromotions === []));
});

/**
 * Shows a message "You have not created any promotion yet! :("
 * for giving an empty promotion list.
 */
it('shows a no promotion message', () => {
  const { getByTestId } = render(<PromotionListDetail promotions={[]} />);
  expect(getByTestId('no-promo-list')).toBeInTheDocument();
});
