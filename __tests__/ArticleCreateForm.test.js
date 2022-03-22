/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "../utils/test-utils";
import "@testing-library/jest-dom";
import ArticleCreateForm from "../components/ArticleCreateForm";
jest.mock("next-auth/react");

describe("ArticleCreateForm", () => {
  test("Title input box display", () => {
    const { getByTestId } = render(<ArticleCreateForm />);
    const contentDisplay = getByTestId("Title");

    expect(contentDisplay).toBeVisible();
  });

  test("Date input box display", () => {
    const { getByTestId } = render(<ArticleCreateForm />);
    const contentDisplay = getByTestId("Date");

    expect(contentDisplay).toBeVisible();
  });

  test("Author input box display", () => {
    const { getByTestId } = render(<ArticleCreateForm />);
    const contentDisplay = getByTestId("Author");

    expect(contentDisplay).toBeVisible();
  });
});
