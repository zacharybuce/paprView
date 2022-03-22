/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "../utils/test-utils";
import "@testing-library/jest-dom";
import RankIconDisplay from "../components/RankIconDisplay";
jest.mock("next-auth/react");

describe("RankIconDisplay", () => {
  let expectedProps;

  beforeEach(() => {
    expectedProps = {
      summary: {
        tagId: 10,
        color: "primary",
      },
    };
  });

  test("display icon of correct color", () => {
    const { getByTestId } = render(<RankIconDisplay {...expectedProps} />);
    const bountyDisplay = getByTestId("icon-color");

    expect(bountyDisplay).toBeVisible();
  });
});
