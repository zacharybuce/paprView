/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "../utils/test-utils";
import "@testing-library/jest-dom";
import BountyChip from "../components/BountyChip";
jest.mock("next-auth/react");

describe("BountyChip", () => {
  let expectedProps;

  test("bounty banner display", () => {
    expectedProps = {
      bountyAmount: 100,
    };

    const { getByTestId } = render(<BountyChip {...expectedProps} />);
    const bountyDisplay = getByTestId("bounty-banner-amount");

    expect(bountyDisplay).toBeVisible();
  });

  test("no bounty display", () => {
    expectedProps = {
      summary: {
        bountyAmount: null,
      },
    };

    const { getByTestId } = render(<BountyChip {...expectedProps} />);
    const noBountyDisplay = getByTestId("no-bounty-banner");

    expect(noBountyDisplay).toBeVisible();
  });
});
