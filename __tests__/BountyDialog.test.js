/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "../utils/test-utils";
import "@testing-library/jest-dom";
import BountyDialog from "../components/BountyDialog";
jest.mock("next-auth/react");

describe("BountyDialog", () => {
  let expectedProps;

  beforeEach(() => {
    expectedProps = {
      open: true,
      openBountyDialog: true,
      credibility: 100,
    };
  });

  test("Test dialog apears", () => {
    const { getByText } = render(<BountyDialog {...expectedProps} />);
    const contentDisplay = getByText("A minimum of 40 points is required");

    expect(contentDisplay).toBeVisible();
  });
});
