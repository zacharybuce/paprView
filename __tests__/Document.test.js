/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "../utils/test-utils";
import "@testing-library/jest-dom";
import Document from "../components/Document";
jest.mock("next-auth/react");

describe("Document", () => {
  let expectedProps;

  beforeEach(() => {
    expectedProps = {
      doc: {
        title: "Jest Test Article",
        publishDate: Date.now(),
        //tags: ['paprView'],
        summaries: [{}],
        authors: ["John Doe"],
        bounty: {},
      },
    };
  });

  test("should render title, author, and date", () => {
    const { getByText } = render(<Document {...expectedProps} />);
    const title = getByText(expectedProps.doc.title);
    const author = getByText("by " + expectedProps.doc.authors);

    expect(author).toBeVisible();
    expect(title).toBeVisible();
  });

  test("summaries amount", () => {
    expectedProps.doc.summaries = [{}, {}];

    const { getByTestId } = render(<Document {...expectedProps} />);
    const summaries = getByTestId("summaries-amount");

    expect(summaries).toBeVisible();
  });

  test("publish date", () => {
    const { getByTestId } = render(<Document {...expectedProps} />);
    const publishDate = getByTestId("publish-date");

    expect(publishDate).toBeVisible();
  });

  test("summaries text", () => {
    const { getByTestId } = render(<Document {...expectedProps} />);
    const summary = getByTestId("summaries-text");

    expect(summary).toBeVisible();
  });
});
