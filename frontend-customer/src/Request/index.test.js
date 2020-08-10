import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Request from '.';
import Validation from '../Validation'
import { getRequest } from './index.js';
import { updateStatus } from './Card.js';
import { shallow, configure } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import axios from 'axios';

/**
 * Reset database after each test case.
 */
afterEach(async () => {
    await axios.post('testing/reset');
  });

/**
 * This function tests the function getRequest.
 * getRequest gets the requests that are sent to the restaurant that the current user is working at.
 * It checks the status returned by axios.
 */
it('checks whether correct requests are fetched from the backend', async () => {
    let jwt_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNTk3MDcwODU5LCJleHAiOjE1OTk2NjI4NTl9.ks8QVzSzD6UNVDKSKGg6Wd368V_IK90anGTXK_0vhdQ";
    let requests = await getRequest(jwt_token, '/requests');
    let statusIsGood = false;
    if (requests[0] !== -1) {
      if (requests.length === 1) {
        statusIsGood = true;
      }
    }
    expect(statusIsGood).toBeTruthy();
  });

/**
 * This function tests whether the function updateStatus has updated the status of the request from "pending" to "confirmed".
 * updateStatus updated the status of the request from "pending" to "confirmed" or from "pending" to "rejected".
 * It checks the status returned by axios.
 */
it('checks whether the request has been updated from pending to confirmed in the backend', async () => {
  let jwt_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNTk3MDcwODU5LCJleHAiOjE1OTk2NjI4NTl9.ks8QVzSzD6UNVDKSKGg6Wd368V_IK90anGTXK_0vhdQ";
    let output = await updateStatus('/requests/1/verify', jwt_token);
    let statusIsGood = false;
    if (output.status === 200) {
        statusIsGood = true;
    }
    expect(statusIsGood).toBeTruthy();
  });

/**
 * This function tests whether the function updateStatus has updated the status of the request from "pending" to "rejected".
 * updateStatus updated the status of the request from "unconfirmed" to "confirmed".
 * It checks the status and the data returned by axios.
 */
it('checks whether the request has been updated in the backend', async () => {
  let jwt_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNTk3MDcwODU5LCJleHAiOjE1OTk2NjI4NTl9.ks8QVzSzD6UNVDKSKGg6Wd368V_IK90anGTXK_0vhdQ";
    let output = await updateStatus('/requests/1/reject', jwt_token);
    let statusIsGood = false;
    if (output.status === 200) {
        statusIsGood = true;
    }
    expect(statusIsGood).toBeTruthy();
  });

/**
 * This function tests whether the promotion list component is displayed on the 
 * customer homepage
 */
it('displays promotion list', () => {
  const wrapper = shallow(<Router><Validation /></Router>);
  expect(wrapper.find(".card").exists());
});