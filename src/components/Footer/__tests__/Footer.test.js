import React from "react";

import Footer from "..";
import { renderWithReduxAndRouter } from "../../../utils/test-utils";

describe("<Footer />", () => {
  it("is defined", () => {
    expect(<Footer />).toBeDefined();
  });

  it("renders an footer html5 element", () => {
    const { getByRole } = renderWithReduxAndRouter(<Footer />);

    const element = getByRole("contentinfo");
    expect(element).toBeInTheDocument();
  });

  it("renders the current year", () => {
    const { getByRole } = renderWithReduxAndRouter(<Footer />);

    const year = new Date().getFullYear();

    const element = getByRole("contentinfo");
    expect(element).toHaveTextContent(year);
  });
});
