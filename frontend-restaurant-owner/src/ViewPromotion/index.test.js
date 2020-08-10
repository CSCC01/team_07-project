/**
 * This test suite tests view promotion.
 * The following aspects are tested:
 * 1. Get promotion list from backend
 * 2. Shows a no promotion message for an empty promotion list
 * 3. Shows a promotion list for a non-empty promotion list
 */

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect';
import { waitFor } from '@testing-library/react';
import PromotionListDetail from '.';
import { getPromotions } from '.';
import { getRestaurant } from '.';

configure({ adapter: new Adapter() });

const jwt_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk2MDg3NDg2LCJleHAiOjE1OTg2Nzk0ODZ9.bH-txoYGWnFdv4JWqvv_NQKWsNvcIOjBjJmKltk3mr8';

/**
 * Get promotion list from backend
 */
it('get promotion list from backend', async () => {
  let restaurant = await getRestaurant(jwt_token);
  let actualPromotions = await getPromotions(jwt_token, restaurant);
  const expected = [
    {
      id: 5,
      title: 'promotion 1',
      description:
        'Buy three Nice-Creams from our store during the November, you will get one punch card for free!',
      starting_date: '2020-10-31T00:00',
      expired_date: '2020-12-01T00:00',
      subtask: ['Buy 1 Nice-Cream.', 'Buy 1 Nice-Cream.', 'Buy 1 Nice-Cream.'],
      image: ['/uploads/demo_15744283fe.png', '/uploads/demo2_f32b8cc16b.png'],
      restaurant: {
        id: 1,
        name: 'Restaurant 1',
        location: { lat: 43.7866, lng: -79.2755 },
        created_at: '2020-07-20T01:59:07.506Z',
        updated_at: '2020-08-08T11:02:54.192Z',
      },
      coupon: null,
      created_at: '2020-08-03T15:15:14.698Z',
      updated_at: '2020-08-10T06:38:39.326Z',
      progresses: [
        {
          id: 1,
          user: 6,
          promotion: 5,
          status: 'ongoing',
          created_at: '2020-08-10T06:39:44.501Z',
          updated_at: '2020-08-10T06:40:29.901Z',
        },
      ],
    },
    {
      id: 7,
      title: 'promotion3: hotcat',
      description: 'But one three hotdags and get a coupon for a "hotcat"!',
      starting_date: '2020-11-01T00:00',
      expired_date: '2021-01-01T00:00',
      subtask: ['Buy 1 hotdog', 'Buy 1 hotdog', 'Buy 1 hotdog'],
      image: [],
      restaurant: {
        id: 1,
        name: 'Restaurant 1',
        location: { lat: 43.7866, lng: -79.2755 },
        created_at: '2020-07-20T01:59:07.506Z',
        updated_at: '2020-08-08T11:02:54.192Z',
      },
      coupon: 'Get one hotcat!!!',
      created_at: '2020-08-10T06:38:10.524Z',
      updated_at: '2020-08-10T06:39:00.210Z',
      progresses: [],
    },
  ];
  await waitFor(() => expect(actualPromotions).toEqual(expected));
});

/**
 * Shows a message "You have not created any promotion yet! :("
 * for giving an empty promotion list.
 */
it('shows a no promotion message', () => {
  const wrapper = shallow(<PromotionListDetail promotions={[]} />);
  expect(wrapper.find('.no-promo-list').exists());
});

/**
 * Shows a list of promotions for giving a non-empty
 * promotion list.
 */
it('shows a promotion list', async () => {
  const input = [
    {
      id: 5,
      title: 'promotion 1',
      description:
        'Buy three Nice-Creams from our store during the November, you will get one punch card for free!',
      starting_date: '2020-10-31T00:00',
      expired_date: '2020-12-01T00:00',
      subtask: ['Buy 1 Nice-Cream.', 'Buy 1 Nice-Cream.', 'Buy 1 Nice-Cream.'],
      image: ['/uploads/demo_15744283fe.png', '/uploads/demo2_f32b8cc16b.png'],
      restaurant: {
        id: 1,
        name: 'Restaurant 1',
        created_at: '2020-07-20T01:59:07.506Z',
        updated_at: '2020-07-23T18:11:42.475Z',
      },
      created_at: '2020-08-03T15:15:14.698Z',
      updated_at: '2020-08-03T15:15:14.706Z',
    },
  ];
  const wrapper = shallow(<PromotionListDetail promotions={input} />);
  expect(wrapper.find('.has-promo-list').exists());
});
