/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "../utils/test-utils";
import "@testing-library/jest-dom";
import TagHeader from "../components/TagHeader";
jest.mock("next-auth/react");

describe("TagHeader", () => {
  test("Header Display", () => {
    const { getByTestId } = render(<TagHeader />);
    const contentDisplay = getByTestId("Tags Header");

    expect(contentDisplay).toBeVisible();
  });

  test("Tag discription", () => {
    const { getByTestId } = render(<TagHeader />);
    const contentDisplay = getByTestId("Tags Descriptor");

    expect(contentDisplay).toBeVisible();
  });
});
