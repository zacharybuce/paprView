/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "../utils/test-utils";
import { renderNoSesh } from "../utils/test-utils-nosesh";
import "@testing-library/jest-dom";
import SearchResultsHeader from "../components/SearchResultsHeader";
jest.mock("next-auth/react");

describe("SearchResultsHeader", () => {
  let expectedProps;

  beforeEach(() => {
    expectedProps = {
      query: "test query",
      results: 10,
    };
  });

  test("display correct query", () => {
    const { getByTestId } = render(<SearchResultsHeader {...expectedProps} />);
    const resultsHeader = getByTestId("search-query");

    expect(resultsHeader).toBeVisible();
  });

  test("display correct results amount", () => {
    const { getByTestId } = render(<SearchResultsHeader {...expectedProps} />);
    const resultsHeader = getByTestId("search-results-amount");

    expect(resultsHeader).toBeVisible();
  });

  test("display button if session", () => {
    const { getByTestId } = render(<SearchResultsHeader {...expectedProps} />);
    const addPaperBttn = getByTestId("add-a-paper-bttn");

    expect(addPaperBttn).toBeVisible();
  });

  test("Dont display button if NO session", () => {
    const { getByTestId } = renderNoSesh(
      <SearchResultsHeader {...expectedProps} />
    );
    const addPaperBttn = getByTestId("sign-in-dialog");

    expect(addPaperBttn).toBeVisible();
  });
});
