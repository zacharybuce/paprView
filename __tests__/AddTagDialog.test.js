/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddTagDialog from "../components/AddTagDialog";
jest.mock("next-auth/react");

describe("AddTagDialog Component", () => {
  test("User Id is passed Successfully", async () => {
    render(<AddTagDialog setTags={setTags} open={open} setOpen={setOpen} />);
  });
});
