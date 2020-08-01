/**
 * This test suite tests PromotionDetails component.
 * The following aspects are tested:
 * 1. promotion details are rendered
 * 2. the functionality of getPromotionList
 */

import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PromotionDetails from '.';
import { getPromotionDetails } from './index.js';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';

configure({ adapter: new Adapter() });

const jwt_token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk2MDg3NDg2LCJleHAiOjE1OTg2Nzk0ODZ9.bH-txoYGWnFdv4JWqvv_NQKWsNvcIOjBjJmKltk3mr8';
beforeAll(() => (axios.defaults.baseURL = process.env.BASE_URL || 'http://localhost:1337'));

/**
 * This function tests whether the promotion description is displayed on the
 * promotion detail page
 * 
 * NEED DB
 */
it('displays promotion description', () => {
    const wrapper = shallow(<PromotionDetails match={{params: {id: 1}}} />);
    expect(wrapper.find(".description").exists());
  });

/**
 * This function tests whether getPromotionDetails provides the correct data
 * 
 * NEED DB
 */
it('gets promotion details from the backend', async() => {
    let output = await getPromotionDetails(1, jwt_token);
    let statusIsGood = true;
    expect(statusIsGood).toBeTruthy();
    const expected = {
        "id": 1,
        "title": "promotion1",
        "description": "promotion1 des",
        "starting_date": "2020-11-09T00:00",
        "expired_date": "2022-09-09T00:00",
        "subtask": [
            "buy 1 pizza",
            "buy 1 pizza"
        ],
        "image": [],
        "restaurant": {
            "id": 1,
            "name": "Restaurant 1",
            "created_at": "2020-07-20T01:59:07.506Z",
            "updated_at": "2020-07-23T18:11:42.475Z"
        },
        "created_at": "2020-08-01T03:39:04.938Z",
        "updated_at": "2020-08-01T03:39:04.958Z"
    };
    expect(output).toEqual(expected);
})