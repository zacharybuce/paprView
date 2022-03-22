/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "../utils/test-utils";
import { renderNoSesh } from "../utils/test-utils-nosesh";
import "@testing-library/jest-dom";
import Navbar from "../components/Navbar";
jest.mock("next-auth/react");

describe("SearchResultsHeader", () => {
  test("display login if no session", () => {
    const { getByTestId } = renderNoSesh(<Navbar />);
    const navComponent = getByTestId("nav-login");

    expect(navComponent).toBeVisible();
  });

  test("display profile if session", () => {
    const { getByTestId } = render(<Navbar />);
    const navComponent = getByTestId("nav-profile");

    expect(navComponent).toBeVisible();
  });
});
