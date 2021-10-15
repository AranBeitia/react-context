import React from "react";

import Main from "..";
import { renderWithReduxAndRouter } from "../../../utils/test-utils";

describe("<Main />", () => {
  it("is defined", () => {
    expect(<Main />).toBeDefined();
  });

  it("renders an main html5 element", () => {
    const { getByRole } = renderWithReduxAndRouter(<Main />);

    const element = getByRole("main");
    expect(element).toBeInTheDocument();
  });

  it("renders the children", () => {
    const { getByRole } = renderWithReduxAndRouter(
      <Main>
        <h1>hello</h1>
      </Main>,
    );

    const element = getByRole("heading");
    expect(element).toHaveTextContent("hello");
  });

  it("forwards the props", () => {
    const { getByRole } = renderWithReduxAndRouter(
      <Main className="container">
        <h1>hello</h1>
      </Main>,
    );

    const element = getByRole("main");
    expect(element).toHaveClass("container");
  });
});
