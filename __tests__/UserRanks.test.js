/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "../utils/test-utils";
import "@testing-library/jest-dom";
import UserRanks from "../components/UserRanks";
jest.mock("next-auth/react");

describe("UserRanks", () => {
  let expectedProps;

  test("display no tags", () => {
    expectedProps = {
      ranks: [],
    };

    const { getByTestId } = render(<UserRanks {...expectedProps} />);
    const resultsHeader = getByTestId("no-tags");

    expect(resultsHeader).toBeVisible();
  });
});
