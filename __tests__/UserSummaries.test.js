/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "../utils/test-utils";
import "@testing-library/jest-dom";
import UserSummaries from "../components/UserSummaries";
jest.mock("next-auth/react");

describe("UserSummaries", () => {
  test("display no user summaries", () => {
    const { getByTestId } = render(<UserSummaries />);
    const resultsHeader = getByTestId("user-summaries");

    expect(resultsHeader).toBeVisible();
  });
});
