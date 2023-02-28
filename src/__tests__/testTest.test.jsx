import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../App";
import AppProviders from "../AppProviders";
describe("app", () => {
  it("it runs", () => {
    const app = render(<App />, { wrapper: AppProviders });
    screen.debug();
    expect(app);
  });
});
