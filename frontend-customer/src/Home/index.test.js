import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '.';
import PromotionBox from './PromotionList/PromotionBox';
import mockAxios from 'axios';

// beforeAll(() => (mockAxios.defaults.baseURL = process.env.BASE_URL || 'http://localhost:1337'));

it('loads and shows current promotion list', async () => {
  const { getByTestId } = render(<Home />);
  mockAxios.get.mockImplementationOnce(() => Promise.resolve({
    data: [{
        "id": 1,
        "title": "promotion1",
        "description": "promotion1 description",
        "image": "some imaege",
        "starting_date": "2020-01-09T00:00",
        "expired_date": "2020-03-05T00:00",
        "created_at": "2020-07-18T16:45:57.605Z",
        "updated_at": "2020-07-18T21:13:19.392Z"
    },
    {
        "id": 2,
        "title": "promotion2",
        "description": "promotion 2 description. Nice discount",
        "image": "some image",
        "starting_date": "2020-01-01T00:00",
        "expired_date": "2020-03-06T00:00",
        "created_at": "2020-07-18T17:17:47.500Z",
        "updated_at": "2020-07-18T21:13:24.028Z"
    },
    {
        "id": 3,
        "title": "promotion3",
        "description": "promo3 de's",
        "image": "some imaege",
        "starting_date": "2020-01-09T00:00",
        "expired_date": "2021-09-09T00:00",
        "created_at": "2020-07-18T21:13:13.106Z",
        "updated_at": "2020-07-18T21:13:13.106Z"
    },
    {
        "id": 4,
        "title": "promotion4",
        "description": "dewdewcv",
        "image": "12",
        "starting_date": "1919-02-04T12:21",
        "expired_date": "2022-09-09T00:00",
        "created_at": "2020-07-20T03:25:25.930Z",
        "updated_at": "2020-07-20T03:25:25.930Z"
    }]
  }));
  const expectedData = await Home();
  expect(getByTestId('promotion-list')).toBeInTheDocument()
  expect(mockAxios.get).toHaveBeenCalledTimes(1)

});

it('goes to promotion detail page when according promotion is clicked', async () => {

});
