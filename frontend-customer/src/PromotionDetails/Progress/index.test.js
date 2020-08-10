/**
 * This test suite tests Progress component.
 * The following aspects are tested:
 * 1. Renders Progress component without crash
 */

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Progress from "./index";

configure({ adapter: new Adapter() });

const jwt_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk2MDg3NDg2LCJleHAiOjE1OTg2Nzk0ODZ9.bH-txoYGWnFdv4JWqvv_NQKWsNvcIOjBjJmKltk3mr8";

/**
 * Renders Progress component without crash
 */
it("renders Progress component without crash", async () => {
  let subtasks = [
    "Buy 1 Nice-Cream.",
    "Buy 1 Nice-Cream.",
    "Buy 1 Nice-Cream.",
  ];
  const wrapper = shallow(<Progress content={subtasks} id={5} />);
  expect(wrapper.find(".progress").exists());
});
