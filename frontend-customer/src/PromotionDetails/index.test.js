/**
 * This test suite tests PromotionDetails component.
 * The following aspects are tested:
 * 1. promotion descriptions are rendered
 * 2. the functionality of getPromotionList
 */

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import PromotionDetails from ".";
import { getPromotionDetails } from "./index.js";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import axios from "axios";

configure({ adapter: new Adapter() });

beforeAll(
  () =>
    (axios.defaults.baseURL = process.env.BASE_URL || "http://localhost:1337")
);

/**
 * This function tests whether the promotion description is displayed on the
 * promotion detail page
 *
 * NEED DB
 */
it("displays promotion description", () => {
  const wrapper = shallow(<PromotionDetails match={{ params: { id: 5 } }} />);
  expect(wrapper.find(".description").exists());
});

/**
 * This function tests whether getPromotionDetails provides the correct data
 *
 * NEED DB
 */
it("gets promotion details from the backend", async () => {
  let output = await getPromotionDetails(5);
  const expected = {
    id: 5,
    title: "promotion 1",
    description:
      "Buy three Nice-Creams from our store during the November, you will get one punch card for free!",
    starting_date: "2020-10-31T00:00",
    expired_date: "2020-12-01T00:00",
    subtask: ["Buy 1 Nice-Cream.", "Buy 1 Nice-Cream.", "Buy 1 Nice-Cream."],
    image: ["/uploads/demo_15744283fe.png", "/uploads/demo2_f32b8cc16b.png"],
    restaurant: {
      id: 1,
      name: "Restaurant 1",
      location: { lat: 43.7866, lng: -79.2755 },
      created_at: "2020-07-20T01:59:07.506Z",
      updated_at: "2020-08-08T11:02:54.192Z",
    },
    coupon: null,
    created_at: "2020-08-03T15:15:14.698Z",
    updated_at: "2020-08-08T11:03:09.651Z",
    progresses: [],
  };
  expect(output).toEqual(expected);
});
