/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "../utils/test-utils";
import "@testing-library/jest-dom";
import AwardBountyButton from "../components/AwardBountyButton";
jest.mock("next-auth/react");

describe("DynamicAwardBountyButton", () => {
  let expectedProps;

  test("Button is displayed", () => {
    expectedProps = {
      awardBounty: jest.fn(),
      sessionId: "6226550fc8e9d97899b85ac2",
      articleBounty: {
        user: "6226550fc8e9d97899b85ac2",
      },
      awardee: "3",
      bounty: {
        value: 100,
      },
      summaryId: "1234",
    };
    const { getByTestId } = render(<AwardBountyButton {...expectedProps} />);
    const bountyButton = getByTestId("can-award-bounty");

    expect(bountyButton).toBeVisible();
  });

  test("A Bounty Exists", () => {
    expectedProps = {
      awardBounty: jest.fn(),
      sessionId: "6226550fc8e9d97899b85ac2",
      articleBounty: {
        user: "123",
      },
      awardee: "3",
      bounty: {
        value: 100,
      },
      summaryId: "1234",
    };
    const { getByTestId } = render(<AwardBountyButton {...expectedProps} />);
    const bountyButton = getByTestId("bounty-exists");

    expect(bountyButton).toBeVisible();
  });
});
