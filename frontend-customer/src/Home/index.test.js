/**
 * This test suite tests PromotionDetails component.
 * The following aspects are tested:
 * 1. the existence of title bar
 * 2. the existence of promotion list
 */


import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from '.';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

/**
 * This function tests whether the promotion list component is displayed on the 
 * customer homepage
 */
it('displays promotion list', () => {
  const wrapper = shallow(<Router><Home /></Router>);
  expect(wrapper.find(".promotion-list").exists());
});

/**
 * This function tests whether the title bar is displayed successfully on the 
 * customer homepage
 */
it('displays title bar', () => {
  const wrapper = shallow(<Router><Home /></Router>);
  expect(wrapper.find(".title-bar").exists());
})