import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Request from '.';
import { getMessage } from './index.js';
import { updateStatus } from './Card.js';

import axios from 'axios';

/**
 * Reset database after each test case.
 */
afterEach(async () => {
    await axios.post('testing/reset');
  });

/**
 * This function tests the function getMessage.
 * getMessage gets the messages that are sent to the restaurant with the restaurant_id.
 * It checks the status returned by axios, the number of the fetched messages and whether each message is valid.
 */
it('checks whether correct messages are fetched from the backend', async () => {
    let restaurant_id = 1;
    let messages = await getMessage('/processes', restaurant_id);
    let statusIsGood = false;
    if (messages[0] !== -1) {
      if (messages.length === 1) {
        messages.forEach((message) => {
            if (message.restaurant.id === 1 && message.status === "unconfirmed") {
                statusIsGood = true;
            }
        })
      }
    }
    expect(statusIsGood).toBeTruthy();
  });

/**
 * This function tests the function updateStatus.
 * updateStatus updated the status of the message from "unconfirmed" to "confirmed".
 * It checks the status and the data returned by axios.
 */
it('checks whether the message has been updated in the backend', async () => {
    let data = {
        id: 1,
        time: '111',
        promotion_title: '111',
        subtask_content: '111',
        code: 111,
        status: 'confirmed',
        restaurant: {
          id: 1,
          name: 'Restaurant 1',
          created_at: '2020-07-20T01:59:07.506Z',
          updated_at: '2020-07-23T18:11:42.475Z'
        },
        user: {
          id: 6,
          username: 'TestCus',
          email: 'cus@1.com',
          provider: 'local',
          confirmed: true,
          blocked: null,
          role: 3,
          restaurant: null,
          created_at: '2020-07-31T10:04:07.206Z',
          updated_at: '2020-07-31T10:04:07.323Z'
        },
        created_at: '2020-08-03T16:42:08.989Z',
        updated_at: '2020-08-03T16:42:08.999Z'
      };
    let output = await updateStatus('/processes/1', data);
    let statusIsGood = false;
    if (output.status === 200 && output.data.status === 'confirmed') {
        statusIsGood = true;
    }
    expect(statusIsGood).toBeTruthy();
  });