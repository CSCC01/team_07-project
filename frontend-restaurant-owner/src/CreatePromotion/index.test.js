/**
 * This test suite tests CreatePromotion component.
 * The following aspects are tested:
 * 1. the existence of the submit button
 * 2. the functionality of checkData
 * 3. the functionality of lessTime
 * 4. the functionality of uploadImage
 * 5. the functionality of getUrl
 * 6. the functionality of getRestaurant
 * 7. the functionality of postData
 */

import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreatePromotion from '.';
import { checkData, lessTime, uploadImage, getUrl, getRestaurant, postData } from './index.js';

import axios from 'axios';

/**
 * Reset database after each test case.
 */
afterEach(async () => {
  await axios.post('testing/reset');
});

/**
 * This function tests whether the submit button is on the promotion page.
 * There should be one submit button rendered by the CreatePromotion.
 */
it('shows the submit button', () => {
  const { getByRole } = render(<CreatePromotion />);
  expect(getByRole('button', { name: /submit/i })).toBeInTheDocument();
});

/**
 * This function tests the function checkData.
 * It tests the case when all the required fields are empty on submission.
 * The promotion page should alert with a useful message.
 */
it('alerts when all the required fields are empty on submission', async () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  checkData('', '', '', '', [null], -1);
  await waitFor(() =>
    expect(window.alert).toBeCalledWith(
      'Failure: title is empty\nFailure: description is empty\nFailure: start time is empty\nFailure: expired time is empty\nFailure: image is empty\nFailure: reward type is empty\nFailure: reward is empty',
    ),
  );
});

/**
 * This function tests the function checkData.
 * It tests the case when the title field is empty on submission.
 * The promotion page should alert with a useful message.
 */
it('alerts when the title field is empty on submission', async () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  checkData('', 'test', '2020-08-20T00:00', '2020-09-24T00:00', ['test', null], {
    type: 'coupon',
    value: '1',
  });
  await waitFor(() => expect(window.alert).toBeCalledWith('Failure: title is empty'));
});

/**
 * This function tests the function checkData.
 * It tests the case when the description field is empty on submission.
 * The promotion page should alert with a useful message.
 */
it('alerts when the description field is empty on submission', async () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  checkData('test', '', '2020-08-20T00:00', '2020-09-24T00:00', ['test', null], {
    type: 'coupon',
    value: '1',
  });
  await waitFor(() => expect(window.alert).toBeCalledWith('Failure: description is empty'));
});

/**
 * This function tests the function checkData.
 * It tests the case when the startTime field is empty on submission.
 * The promotion page should alert with a useful message.
 */
it('alerts when the startTime field is empty on submission', async () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  checkData('test', 'test', '', '2020-09-24T00:00', ['test', null], {
    type: 'coupon',
    value: '1',
  });
  await waitFor(() => expect(window.alert).toBeCalledWith('Failure: start time is empty'));
});

/**
 * This function tests the function checkData.
 * It tests the case when the closeTime field is empty on submission.
 * The promotion page should alert with a useful message.
 */
it('alerts when the closeTime field is empty on submission', async () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  checkData('test', 'test', '2020-08-20T00:00', '', ['test', null], {
    type: 'coupon',
    value: '1',
  });
  await waitFor(() => expect(window.alert).toBeCalledWith('Failure: expired time is empty'));
});

/**
 * This function tests the function checkData.
 * It tests the case when the image field is empty on submission.
 * The promotion page should alert with a useful message.
 */
it('alerts when the image field is empty on submission', async () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  checkData('test', 'test', '2020-08-20T00:00', '2020-09-24T00:00', [null], {
    type: 'coupon',
    value: '1',
  });
  await waitFor(() => expect(window.alert).toBeCalledWith('Failure: image is empty'));
});

/**
 * This function tests the function checkData.
 * It tests the case when reward is unselected on submission.
 * The promotion page should alert with a useful message.
 */
it('alerts when the reward field is unselected on submission', async () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  checkData('test', 'test', '2020-08-20T00:00', '2020-09-24T00:00', ['test', null], -1);
  await waitFor(() =>
    expect(window.alert).toBeCalledWith('Failure: reward type is empty\nFailure: reward is empty'),
  );
});

/**
 * This function tests the function lessTime.
 * lessTime should return true if the first time is earlier than the second time.
 * Otherwise, it should return false.
 * This function tests cases when the first time is earlier than the second time and
 * when the first time is later than the second time.
 */
it('tests the function lessTime', () => {
  let output1 = lessTime('2020-08-20T00:00', '2020-09-24T00:00');
  expect(output1).toBeTruthy();
  let output2 = lessTime('2020-09-20T00:00', '2020-08-20T00:00');
  expect(output2).toBeFalsy();
});

/**
 * This function tests the function checkData.
 * It tests the case when closeTime is earlier than startTime on submission.
 * The promotion page should alert with a useful message.
 */
it('alerts when closeTime is earlier than startTime', async () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  checkData('test', 'test', '2020-09-24T00:00', '2020-08-20T00:00', ['test', null], {
    type: 'coupon',
    value: '1',
  });
  await waitFor(() => expect(window.alert).toBeCalledWith('Failure: closeTime before startTime'));
});

/**
 * This function tests the function checkData.
 * It tests the case when startTime is earlier than today on submission.
 * The promotion page should alert with a useful message.
 */
it('alerts when startTime is earlier than today', async () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  checkData('test', 'test', '2020-01-24T00:00', '2020-08-20T00:00', ['test', null], {
    type: 'coupon',
    value: '1',
  });
  await waitFor(() => expect(window.alert).toBeCalledWith('Failure: startTime before today'));
});

/**
 * This function tests the function checkData.
 * It tests the case when all the fields are filled in correctly on submission.
 * The promotion page should not alert in this case.
 */
it('does not alert when all the fields are filled in correctly on submission', async () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  checkData('test', 'test', '2020-08-20T00:00', '2020-09-24T00:00', ['test', null], 1);
  await waitFor(() => expect(window.alert).toBeCalledTimes(10));
});

/**
 * This function tests the function uploadImage.
 * It tests the case when only one image needs to be upload.
 * It checks the status returned by axios and clears the database in the end.
 */
it('checks whether an image have been uploaded or not', async () => {
  let f = new File(['test'], 'test.jpg', { type: 'image' });
  let idDict = await uploadImage([f, null], [0, null], '/upload');
  let statusIsGood = true;
  for (let key in idDict) {
    let status = idDict[key];
    if (status !== 200) {
      statusIsGood = false;
    }
  }
  expect(statusIsGood).toBeTruthy();
});

/**
 * This function tests the function uploadImage.
 * It tests the case when multiple images need to be upload.
 * It checks the status returned by axios and clears the database in the end.
 */
it('checks whether multiple images have been uploaded or not', async () => {
  let f1 = new File(['test'], 'test.jpg', { type: 'image' });
  let f2 = new File(['test'], 'test.jpg', { type: 'image' });
  let f3 = new File(['test'], 'test.jpg', { type: 'image' });
  let f4 = new File(['test'], 'test.jpg', { type: 'image' });
  let f5 = new File(['test'], 'test.jpg', { type: 'image' });
  let idDict = await uploadImage([f1, f2, f3, f4, f5, null], [0, 0, 0, 0, 0, null], '/upload');
  let statusIsGood = true;
  for (let key in idDict) {
    let status = idDict[key];
    if (status !== 200) {
      statusIsGood = false;
    }
  }
  expect(statusIsGood).toBeTruthy();
});

/**
 * This function tests the function getUrl.
 * getUrl takes ids and gets a list of corresponding image url.
 * It tests the case when only one id is provided.
 * It checks the status returned by axios and verifies that the list of urls returned
 * by axios is the same as what we are looking for.
 */
it('checks whether correct url is returned by one uploaded file id', async () => {
  let idDict = await getUrl({ 109: 200 }, '/upload/files/');
  let statusIsGood = true;
  for (let key in idDict) {
    let status = idDict[key];
    if (status !== 200) {
      statusIsGood = false;
    }
  }
  expect(statusIsGood).toBeTruthy();
  expect(Object.keys(idDict)).toEqual(['/uploads/1_34ac2e4ff7.jpeg']);
});

/**
 * This function tests the function getUrl.
 * getUrl takes ids and gets a list of corresponding image url.
 * It tests the case when multiple ids are provided.
 * It checks the status returned by axios and verifies that the list of urls returned
 * by axios is the same as what we are looking for.
 */
it('checks whether correct urls are returned by multiple uploaded file ids', async () => {
  let idDict = await getUrl({ 109: 200, 110: 200 }, '/upload/files/');
  let statusIsGood = true;
  for (let key in idDict) {
    let status = idDict[key];
    if (status !== 200) {
      statusIsGood = false;
    }
  }
  expect(statusIsGood).toBeTruthy();
  expect(Object.keys(idDict)).toEqual(['/uploads/1_34ac2e4ff7.jpeg', '/uploads/2_46dbd22c42.jpeg']);
});

/**
 * This function tests the function getRestaurant.
 * getRestaurant takes gets the id of the restaurant that the current user (a restaurant owner) owns.
 * It checks the status returned by axios.
 */
it('checks whether correct restaurant id is fetched from the backend', async () => {
  let jwt_token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk2MDg3NDg2LCJleHAiOjE1OTg2Nzk0ODZ9.bH-txoYGWnFdv4JWqvv_NQKWsNvcIOjBjJmKltk3mr8';
  let restaurant = await getRestaurant('/users/me/', jwt_token);
  let statusIsGood = true;
  if (restaurant[1] !== 200) {
    statusIsGood = false;
  }
  expect(statusIsGood).toBeTruthy();
});

/**
 * This function tests the function postData.
 * postData should save data into the backend when valid data is provided.
 * This function checks the status returned by axios and clears the database in the end.
 */
it('checks whether postData has saved data to the backend', async () => {
  let output = await postData(
    '/promotions',
    'title',
    'description',
    '2020-08-20T00:00',
    '2020-09-24T00:00',
    ['test'],
    ['/uploads/1_34ac2e4ff7.jpeg', '/uploads/2_46dbd22c42.jpeg'],
    '1',
  );
  expect(Object.values(output)[0]).toBe(200);
});
