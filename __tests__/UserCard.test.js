/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "../utils/test-utils";
import "@testing-library/jest-dom";
import SummaryDisplay from "../components/SummaryDisplay";
jest.mock("next-auth/react");

describe("SummaryDisplay", () => {
  let expectedProps;

  beforeEach(() => {
    expectedProps = {
      summary: {
        title: "hello",
        date: Date.now(),
        upvotes: 1,
        downvotes: 2,
        articleId: 5,
        bounty: {
          value: 100,
        },
      },
    };
  });

  test("summary score display", () => {
    const { getByTestId } = render(<SummaryDisplay {...expectedProps} />);
    const scoreDisplay = getByTestId("summary-display-score");

    expect(scoreDisplay).toBeVisible();
  });

  test("summary bounty display", () => {
    const { getByTestId } = render(<SummaryDisplay {...expectedProps} />);
    const bountyDisplay = getByTestId("summary-display-bounty");

    expect(bountyDisplay).toBeVisible();
  });

  test("publish date", () => {
    const { getByTestId } = render(<SummaryDisplay {...expectedProps} />);
    const publishDate = getByTestId("summary-display-date");

    expect(publishDate).toBeVisible();
  });

  test("summary title", () => {
    const { getByTestId } = render(<SummaryDisplay {...expectedProps} />);
    const summaryTitle = getByTestId("summary-display-title");

    expect(summaryTitle).toBeVisible();
  });
});
