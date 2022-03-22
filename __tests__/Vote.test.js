/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "../utils/test-utils";
import "@testing-library/jest-dom";
import Vote from "../components/Vote";
jest.mock("next-auth/react");

describe("Vote", () => {
  let expectedProps;

  beforeEach(() => {
    expectedProps = {
      upvote: 10,
      downvote: 1,
      votes: 3,
    };
  });

  test("Upvote button render", () => {
    const { getByTestId } = render(<Vote {...expectedProps} />);
    const contentDisplay = getByTestId("u-button-render");

    expect(contentDisplay).toBeVisible();
  });

  test("Downvote button render", () => {
    const { getByTestId } = render(<Vote {...expectedProps} />);
    const contentDisplay = getByTestId("d-button-render");

    expect(contentDisplay).toBeVisible();
  });

  test("Total amount render", () => {
    const { getByTestId } = render(<Vote {...expectedProps} />);
    const contentDisplay = getByTestId("total-amount");

    expect(contentDisplay).toBeVisible();
  });
});
