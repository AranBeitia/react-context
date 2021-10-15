import React from "react";

import {
  renderWithReduxAndRouter,
  getTestProduct,
} from "../../../utils/test-utils";

import ProductsListing from "..";

describe("<ProductsListing />", () => {
  it("is defined", () => {
    const handleDownVote = jest.fn();
    const handleUpVote = jest.fn();
    const handleSetFavorite = jest.fn();
    const handleAddToCart = jest.fn();

    expect(
      <ProductsListing
        products={[getTestProduct()]}
        handleDownVote={handleDownVote}
        handleUpVote={handleUpVote}
        handleSetFavorite={handleSetFavorite}
        handleAddToCart={handleAddToCart}
      />,
    ).toBeDefined();
  });

  it("renders the products list", () => {
    const handleDownVote = jest.fn();
    const handleUpVote = jest.fn();
    const handleSetFavorite = jest.fn();
    const handleAddToCart = jest.fn();

    const testProduct = getTestProduct();

    const { getByRole, getByText } = renderWithReduxAndRouter(
      <ProductsListing
        products={[testProduct]}
        handleDownVote={handleDownVote}
        handleUpVote={handleUpVote}
        handleSetFavorite={handleSetFavorite}
        handleAddToCart={handleAddToCart}
      />,
    );

    const img = getByRole("img");
    const article = getByRole("article");
    const h2 = getByRole("heading", { level: 2 });
    const title = getByText(testProduct.title);

    expect(img).toBeInTheDocument();
    expect(article).toBeInTheDocument();
    expect(h2).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});
