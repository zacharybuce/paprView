/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "../utils/test-utils";
import "@testing-library/jest-dom";
import ArticleTagChip from "../components/ArticleTagChip";
jest.mock("next-auth/react");

describe("ArticleTagChip", () => {
  test("Tag Chip is for a Paper", () => {
    let props = {
      rankValue: "1",
    };

    const { getByTestId } = render(<ArticleTagChip {...props} />);
    const contentDisplay = getByTestId("render-paper-chip");

    expect(contentDisplay).toBeVisible();
  });

  test("Tag Chip is for a User", () => {
    let props = {
      rank: { rankValue: "1" },
    };
    const { getByTestId } = render(<ArticleTagChip {...props} />);
    const contentDisplay = getByTestId("render-user-chip");

    expect(contentDisplay).toBeVisible();
  });
});
