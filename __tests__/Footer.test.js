/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "../utils/test-utils";
import "@testing-library/jest-dom";
import Footer from "../components/Footer";
jest.mock("next-auth/react");

describe("Footer", () => {
  test("Test home display", () => {
    const { getByText } = render(<Footer />);
    const contentDisplay = getByText("Home");

    expect(contentDisplay).toBeVisible();
  });

  test("Test help display", () => {
    const { getByText } = render(<Footer />);
    const contentDisplay = getByText("Help");

    expect(contentDisplay).toBeVisible();
  });

  test("Test help display", () => {
    const { getByText } = render(<Footer />);
    const contentDisplay = getByText("Privacy Policy");

    expect(contentDisplay).toBeVisible();
  });
});
