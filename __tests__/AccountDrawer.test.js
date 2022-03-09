/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AccountDrawer from "../components/AccountDrawer";
jest.mock("next-auth/react");

describe("AccountDrawer Component", () => {
  test("User Id is passed Successfully", async () => {
    render(
      <AccountDrawer
        state={true}
        setState={() => {
          return false;
        }}
        logOut={() => {
          return false;
        }}
        userId={"123"}
      />
    );
    // // Act
    // // Assert
    const profileButton = screen.getByTestId("123");
    expect(profileButton).toBeDefined();
  });
});
