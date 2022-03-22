/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "../utils/test-utils";
import "@testing-library/jest-dom";
import UserTagDisplay from "../components/UserTagDisplay";
jest.mock("next-auth/react");

describe("UserTagDisplay", () => {
  let expectedProps;

  beforeEach(() => {
    expectedProps = {
      tagId: 1,
      score: 10,
    };
  });

  test("Correct points and tag are displayed", () => {
    const { getByText } = render(<UserTagDisplay {...expectedProps} />);
    const contentDisplay = getByText("10");

    expect(contentDisplay).toBeVisible();
  });
});
