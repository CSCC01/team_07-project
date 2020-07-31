import React from 'react';
import { render, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '.';

/**
 * This function tests whether the promotion list component is displayed on the 
 * customer homepage
 */
it('displays promotion list', () => {
  const { getByTestId } = render(<Home />);
  expect(getByTestId("promotion-list")).toBeInTheDocument()
});

/**
 * This function tests whether the title bar is displayed successfully on the 
 * customer homepage
 */
it('displays title bar', () => {
  const { getByTestId } = render(<Home />);
  expect(getByTestId("title")).toBeInTheDocument()
})