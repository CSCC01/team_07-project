import React from 'react';
import { render, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '.';

it('displays promotion list', () => {
  const { getByTestId } = render(<Home />);
  expect(getByTestId("promotion-list")).toBeInTheDocument()
});

it('displays title bar', () => {
  const { getByTestId } = render(<Home />);
  expect(getByTestId("title")).toBeInTheDocument()
})