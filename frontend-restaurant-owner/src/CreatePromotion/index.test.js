import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreatePromotion from '.';
import { checkData, lessTime, uploadImage, getUrl } from './index.js';

import axios from 'axios';
beforeAll(() => (axios.defaults.baseURL = process.env.BASE_URL || 'http://localhost:1337'));

configure({ adapter: new Adapter() });

// test the existence of the submit button
it('shows the submit button', () => {
  const { getByRole } = render(<CreatePromotion />);
  expect(getByRole('button', { name: /submit/i })).toBeInTheDocument();
});

// test function checkDate all initial data
it('alerts when all required fields are empty on submission', async () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  checkData('', '', '', '', [null], -1);
  await waitFor(() =>
    expect(window.alert).toBeCalledWith(
      'Failure: title is empty\nFailure: description is empty\nFailure: start time is empty\nFailure: expired time is empty\nFailure: image is empty\nFailure: reward is empty',
    ),
  );
});

// test function checkDate empty title
it('alerts when title field is empty on submission', async () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  checkData('', 'test', '2020-08-20T00:00', '2020-09-24T00:00', ['test', null], 1);
  await waitFor(() => expect(window.alert).toBeCalledWith('Failure: title is empty'));
});

// test function checkDate empty description
it('alerts when description field is empty on submission', async () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  checkData('test', '', '2020-08-20T00:00', '2020-09-24T00:00', ['test', null], 1);
  await waitFor(() => expect(window.alert).toBeCalledWith('Failure: description is empty'));
});

// test function checkDate empty startTIme
it('alerts when startTime field is empty on submission', async () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  checkData('test', 'test', '', '2020-09-24T00:00', ['test', null], 1);
  await waitFor(() => expect(window.alert).toBeCalledWith('Failure: start time is empty'));
});

// test function checkDate empty closeTIme
it('alerts when closeTime field is empty on submission', async () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  checkData('test', 'test', '2020-08-20T00:00', '', ['test', null], 1);
  await waitFor(() => expect(window.alert).toBeCalledWith('Failure: expired time is empty'));
});

// test function checkDate empty image
it('alerts when image field is empty on submission', async () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  checkData('test', 'test', '2020-08-20T00:00', '2020-09-24T00:00', [null], 1);
  await waitFor(() => expect(window.alert).toBeCalledWith('Failure: image is empty'));
});

// test function checkDate unselect reward
it('alerts when reward field is unselected on submission', async () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  checkData('test', 'test', '2020-08-20T00:00', '2020-09-24T00:00', ['test', null], -1);
  await waitFor(() => expect(window.alert).toBeCalledWith('Failure: reward is empty'));
});

// test lessTime
it('tests the function lessTime', () => {
  let output1 = lessTime('2020-08-20T00:00', '2020-09-24T00:00');
  expect(output1).toBeTruthy();
  let output2 = lessTime('2020-09-20T00:00', '2020-08-20T00:00');
  expect(output2).toBeFalsy();
});

// test function checkDate with closeTime before startTime
it('alerts when closeTime is before startTime', async () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  checkData('test', 'test', '2020-09-24T00:00', '2020-08-20T00:00', ['test', null], 1);
  await waitFor(() => expect(window.alert).toBeCalledWith('Failure: closeTime before startTime'));
});

// test function checkDate with startTime before today
it('alerts when closeTime is before startTime', async () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  checkData('test', 'test', '2020-01-24T00:00', '2020-08-20T00:00', ['test', null], 1);
  await waitFor(() => expect(window.alert).toBeCalledWith('Failure: startTime before today'));
});

// test function checkDate with valid data
it('alerts when all the fields are filled in on submission', async () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  checkData('test', 'test', '2020-08-20T00:00', '2020-09-24T00:00', ['test', null], 1);
  await waitFor(() => expect(window.alert).toBeCalledTimes(9));
});

// test function uploadImage - single unmodified file
it('checks whether a non-cropped image have been uploaded or not', async () => {
  let f = new File(['abc'], 'test.jpg', { type: 'image' });
  let idDict = uploadImage([f, null], [0, null], 'http://localhost:1338/upload');
  let statusIsGood = true;
  for (let key in idDict) {
    let status = dict[key];
    if (status !== 200) {
      statusIsGood = false;
    }
  }
  expect(statusIsGood).toBeTruthy();

  // clean up the database
  let indicator = 1;
  for (let key in idDict) {
    let status = dict[key];
    if (status === 200) {
      await axios({
        method: 'DELETE',
        url: url + '/files/' + key,
      }).catch(() => {
        indicator = 0;
      });
    }
  }
  expect(indicator).toBe(1);
});

// test function uploadImage - single modified file
it('checks whether a cropped image have been uploaded or not', async () => {
  let f = new File(['abc'], 'test.jpg', { type: 'image' });
  let canvas = document.createElement('canvas', { height: 200, width: 200 });
  let idDict = uploadImage([f, null], [canvas, null], 'http://localhost:1338/upload');
  let statusIsGood = true;
  for (let key in idDict) {
    let status = idDict[key];
    if (status !== 200) {
      statusIsGood = false;
    }
  }
  expect(statusIsGood).toBeTruthy();

  // clean up the database
  let indicator = 1;
  for (let key in idDict) {
    let status = dict[key];
    if (status === 200) {
      await axios({
        method: 'DELETE',
        url: url + '/files/' + key,
      }).catch(() => {
        indicator = 0;
      });
    }
  }
  expect(indicator).toBe(1);
});

// test function uploadImage - mixed

// test function getUrl - single id
it('checks whether correct urls are returned by uploaded file id', async () => {
  let idDict = await getUrl({ 48: 200 }, 'http://localhost:1338/upload/files/');
  let statusIsGood = true;
  for (let key in idDict) {
    let status = idDict[key];
    if (status !== 200) {
      statusIsGood = false;
    }
  }
  expect(statusIsGood).toBeTruthy();
  expect(Object.keys(idDict)).toEqual([
    '/uploads/Screen_Shot_2020_07_20_at_6_36_17_AM_1c2b5078dd.png',
  ]);
});

// test function getUrl - multiple ids

// test function postData: check status
