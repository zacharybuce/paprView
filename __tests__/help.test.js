/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Help from "../pages/help.js";
jest.mock("next-auth/react");

describe("help page", () => {
  test("text appears", async () => {
    render(<Help />);
    // // Act
    // // Assert
    expect(
      screen.getByText(/Look for papers and get concise summaries/)
    ).toBeInTheDocument();
  });
});
