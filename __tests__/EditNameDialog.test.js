/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "../utils/test-utils";
import "@testing-library/jest-dom";
import EditNameDialog from "../components/EditNameDialog";
jest.mock("next-auth/react");

describe("EditNameDialog", () => {
  let expectedProps;

  beforeEach(() => {
    expectedProps = {
      editing: true,
    };
  });

  test("Render Dialog", () => {
    const { getByTestId } = render(<EditNameDialog {...expectedProps} />);
    const contentDisplay = getByTestId("dialog");

    expect(contentDisplay).toBeVisible();
  });

  test("Render text", () => {
    const { getByText } = render(<EditNameDialog {...expectedProps} />);
    const contentDisplay = getByText("Edit your Name");

    expect(contentDisplay).toBeVisible();
  });
});
