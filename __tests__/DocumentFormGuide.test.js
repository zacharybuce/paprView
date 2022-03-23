/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "../utils/test-utils";
import "@testing-library/jest-dom";
import DocumentFormGuide from "../components/DocumentFormGuide";
jest.mock("next-auth/react");

describe("DocumentFormGuide", () => {
  test("Display correct icon", () => {
    const { getByText } = render(<DocumentFormGuide />);
    const publishDate = getByText("Guide for Article Form");

    expect(publishDate).toBeVisible();
  });
});
