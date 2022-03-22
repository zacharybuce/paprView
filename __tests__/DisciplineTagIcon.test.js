/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "../utils/test-utils";
import "@testing-library/jest-dom";
import DisciplineTagIcon from "../components/DisciplineTagIcon";
jest.mock("next-auth/react");

describe("DisciplineTagIcon", () => {
  let expectedProps;

  test("Display icon with text", () => {
    expectedProps = {
      withText: true,
      disciplineName: "Engineering and Technology",
    };

    const { getByTestId } = render(<DisciplineTagIcon {...expectedProps} />);
    const tagIcon = getByTestId("tag-icon-text");

    expect(tagIcon).toBeVisible();
  });

  test("Display icon with NO text", () => {
    expectedProps = {
      withText: false,
      disciplineName: "Engineering and Technology",
    };

    const { getByTestId } = render(<DisciplineTagIcon {...expectedProps} />);
    const tagIcon = getByTestId("tag-icon-no-text");

    expect(tagIcon).toBeVisible();
  });
});
