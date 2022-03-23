/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "../utils/test-utils";
import "@testing-library/jest-dom";
import Summary from "../components/Summary";
import UserTagDisplay from "../components/ArticleTagChip";
jest.mock("next-auth/react");

describe("SummaryDisplay", () => {
  let expectedProps;

  beforeEach(() => {
    expectedProps = {
      summary: {
        lastedit: Date.now(),
        upvotes: 1,
        downvotes: 2,
        _id: "5",
        //user = true,
        content: "Hello",
        bounty: {
          value: 100,
        },
      },
      tags: [{}],
      awardBounty: null,
      articleBounty: null,
      //sessionId: null,
    };
  });

  test("Content display", () => {
    const { getByText } = render(<Summary {...expectedProps} />);
    const contentDisplay = getByText("Hello");

    expect(contentDisplay).toBeVisible();
  });

  // test('summary last edit', () => {
  //     const {getByTestId} = render(<Summary {...expectedProps} />);
  //     const lastEditDisplay = getByTestId('summary-lastEdit');

  //     expect(lastEditDisplay).toBeVisible();
  // });
});
