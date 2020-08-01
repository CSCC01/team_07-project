/**
 * This test suite tests view promotion.
 * The following aspects are tested:
 * 1. Logout button is able to render without crashing
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PromotionListDetail from '.';

/**
 * Renders promotion list without crashing
 */
it('renders promotion list without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PromotionListDetail />, div);
});
