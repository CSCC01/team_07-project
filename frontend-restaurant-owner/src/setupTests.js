// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';

(async () => {
  axios.defaults.baseURL =
    process.env.TESTING_BASE_URL || process.env.BASE_URL || 'http://localhost:1337';
  await axios.post('testing/reset');
})();
