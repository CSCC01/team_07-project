/**
 * This test suite tests CouponList component.
 * The following aspects are tested:
 * 1. 
 */

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import CouponList from ".";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import axios from "axios";

configure({ adapter: new Adapter() });

beforeAll(
  () =>
    (axios.defaults.baseURL = process.env.BASE_URL || "http://localhost:1337")
);
