import React from "react";

import {
  renderWithReduxAndRouter,
  getTestProduct,
  userEvent,
} from "../../../utils/test-utils";

import ItemCard from "..";

describe("<ItemCard />", () => {
  it("is defined", () => {
    expect(<ItemCard />).toBeDefined();
  });

  it("renders the card img", () => {
    const handleDownVote = jest.fn();
    const handleUpVote = jest.fn();
    const handleSetFavorite = jest.fn();
    const handleAddToCart = jest.fn();

    const product = getTestProduct();

    const { getByRole } = renderWithReduxAndRouter(
      <ItemCard
        id={product.id}
        img={product.img}
        title={product.title}
        shortDescription={product.shortDescription}
        upVotes={product.votes.upVotes}
        handleUpVote={handleUpVote}
        downVotes={product.votes.downVotes}
        handleDownVote={handleDownVote}
        isFavorite={product.isFavorite}
        handleSetFavorite={handleSetFavorite}
        handleAddToCart={handleAddToCart}
      />,
    );
    const img = getByRole("img");

    expect(img).toBeInTheDocument();
  });

  it("renders the card title", () => {
    const handleDownVote = jest.fn();
    const handleUpVote = jest.fn();
    const handleSetFavorite = jest.fn();
    const handleAddToCart = jest.fn();

    const product = getTestProduct();

    const { getByText } = renderWithReduxAndRouter(
      <ItemCard
        id={product.id}
        img={product.img}
        title={product.title}
        shortDescription={product.shortDescription}
        upVotes={product.votes.upVotes}
        handleUpVote={handleUpVote}
        downVotes={product.votes.downVotes}
        handleDownVote={handleDownVote}
        isFavorite={product.isFavorite}
        handleSetFavorite={handleSetFavorite}
        handleAddToCart={handleAddToCart}
      />,
    );
    const title = getByText(product.title);

    expect(title).toBeInTheDocument();
  });

  it("renders the card description", () => {
    const handleDownVote = jest.fn();
    const handleUpVote = jest.fn();
    const handleSetFavorite = jest.fn();
    const handleAddToCart = jest.fn();

    const product = getTestProduct();

    const { getByText } = renderWithReduxAndRouter(
      <ItemCard
        id={product.id}
        img={product.img}
        title={product.title}
        shortDescription={product.shortDescription}
        upVotes={product.votes.upVotes}
        handleUpVote={handleUpVote}
        downVotes={product.votes.downVotes}
        handleDownVote={handleDownVote}
        isFavorite={product.isFavorite}
        handleSetFavorite={handleSetFavorite}
        handleAddToCart={handleAddToCart}
      />,
    );
    const description = getByText(product.shortDescription);

    expect(description).toBeInTheDocument();
  });

  it("renders the card up votes button", () => {
    const handleDownVote = jest.fn();
    const handleUpVote = jest.fn();
    const handleSetFavorite = jest.fn();
    const handleAddToCart = jest.fn();

    const product = getTestProduct();

    const { getByRole } = renderWithReduxAndRouter(
      <ItemCard
        id={product.id}
        img={product.img}
        title={product.title}
        shortDescription={product.shortDescription}
        upVotes={product.votes.upVotes}
        handleUpVote={handleUpVote}
        downVotes={product.votes.downVotes}
        handleDownVote={handleDownVote}
        isFavorite={product.isFavorite}
        handleSetFavorite={handleSetFavorite}
        handleAddToCart={handleAddToCart}
      />,
    );
    const upVotesBtn = getByRole("button", { name: "up vote product" });

    expect(upVotesBtn).toBeInTheDocument();
  });

  it("calls the card up vote button callback with the id on click", () => {
    const handleDownVote = jest.fn();
    const handleUpVote = jest.fn();
    const handleSetFavorite = jest.fn();
    const handleAddToCart = jest.fn();

    const product = getTestProduct();

    const { getByRole } = renderWithReduxAndRouter(
      <ItemCard
        id={product.id}
        img={product.img}
        title={product.title}
        shortDescription={product.shortDescription}
        upVotes={product.votes.upVotes}
        handleUpVote={handleUpVote}
        downVotes={product.votes.downVotes}
        handleDownVote={handleDownVote}
        isFavorite={product.isFavorite}
        handleSetFavorite={handleSetFavorite}
        handleAddToCart={handleAddToCart}
      />,
    );
    const upVotesBtn = getByRole("button", { name: "up vote product" });
    userEvent.click(upVotesBtn);

    expect(handleUpVote).toHaveBeenCalledWith(product.id);
  });

  it("renders the card down votes button", () => {
    const handleDownVote = jest.fn();
    const handleUpVote = jest.fn();
    const handleSetFavorite = jest.fn();
    const handleAddToCart = jest.fn();

    const product = getTestProduct();

    const { getByRole } = renderWithReduxAndRouter(
      <ItemCard
        id={product.id}
        img={product.img}
        title={product.title}
        shortDescription={product.shortDescription}
        upVotes={product.votes.upVotes}
        handleUpVote={handleUpVote}
        downVotes={product.votes.downVotes}
        handleDownVote={handleDownVote}
        isFavorite={product.isFavorite}
        handleSetFavorite={handleSetFavorite}
        handleAddToCart={handleAddToCart}
      />,
    );
    const downVotesBtn = getByRole("button", { name: "down vote product" });

    expect(downVotesBtn).toBeInTheDocument();
  });

  it("calls the card down vote button callback with the id on click", () => {
    const handleDownVote = jest.fn();
    const handleUpVote = jest.fn();
    const handleSetFavorite = jest.fn();
    const handleAddToCart = jest.fn();

    const product = getTestProduct();

    const { getByRole } = renderWithReduxAndRouter(
      <ItemCard
        id={product.id}
        img={product.img}
        title={product.title}
        shortDescription={product.shortDescription}
        upVotes={product.votes.upVotes}
        handleUpVote={handleUpVote}
        downVotes={product.votes.downVotes}
        handleDownVote={handleDownVote}
        isFavorite={product.isFavorite}
        handleSetFavorite={handleSetFavorite}
        handleAddToCart={handleAddToCart}
      />,
    );
    const downVotesBtn = getByRole("button", { name: "down vote product" });
    userEvent.click(downVotesBtn);

    expect(handleDownVote).toHaveBeenCalledWith(product.id);
  });

  it("renders the card add to cart button", () => {
    const handleDownVote = jest.fn();
    const handleUpVote = jest.fn();
    const handleSetFavorite = jest.fn();
    const handleAddToCart = jest.fn();

    const product = getTestProduct();

    const { getByRole } = renderWithReduxAndRouter(
      <ItemCard
        id={product.id}
        img={product.img}
        title={product.title}
        shortDescription={product.shortDescription}
        upVotes={product.votes.upVotes}
        handleUpVote={handleUpVote}
        downVotes={product.votes.downVotes}
        handleDownVote={handleDownVote}
        isFavorite={product.isFavorite}
        handleSetFavorite={handleSetFavorite}
        handleAddToCart={handleAddToCart}
      />,
    );
    const addToCartBtn = getByRole("button", {
      name: /add to cart/i,
    });

    expect(addToCartBtn).toBeInTheDocument();
  });

  it("calls the card add to cart button callback with the id on click", () => {
    const handleDownVote = jest.fn();
    const handleUpVote = jest.fn();
    const handleSetFavorite = jest.fn();
    const handleAddToCart = jest.fn();

    const product = getTestProduct();

    const { getByRole } = renderWithReduxAndRouter(
      <ItemCard
        id={product.id}
        img={product.img}
        title={product.title}
        shortDescription={product.shortDescription}
        upVotes={product.votes.upVotes}
        handleUpVote={handleUpVote}
        downVotes={product.votes.downVotes}
        handleDownVote={handleDownVote}
        isFavorite={product.isFavorite}
        handleSetFavorite={handleSetFavorite}
        handleAddToCart={handleAddToCart}
      />,
    );
    const addToCartBtn = getByRole("button", {
      name: /add to cart/i,
    });
    userEvent.click(addToCartBtn);

    expect(handleAddToCart).toHaveBeenCalledWith(product.id);
  });

  it("renders the card save as favorite button", () => {
    const handleDownVote = jest.fn();
    const handleUpVote = jest.fn();
    const handleSetFavorite = jest.fn();
    const handleAddToCart = jest.fn();

    const product = getTestProduct();

    const { getByRole } = renderWithReduxAndRouter(
      <ItemCard
        id={product.id}
        img={product.img}
        title={product.title}
        shortDescription={product.shortDescription}
        upVotes={product.votes.upVotes}
        handleUpVote={handleUpVote}
        downVotes={product.votes.downVotes}
        handleDownVote={handleDownVote}
        isFavorite={product.isFavorite}
        handleSetFavorite={handleSetFavorite}
        handleAddToCart={handleAddToCart}
      />,
    );
    const button = getByRole("button", {
      name: "save as favorite",
    });

    expect(button).toBeInTheDocument();
  });

  it("calls the card save as favorite button callback with the id on click", () => {
    const handleDownVote = jest.fn();
    const handleUpVote = jest.fn();
    const handleSetFavorite = jest.fn();
    const handleAddToCart = jest.fn();

    const product = getTestProduct();

    const { getByRole } = renderWithReduxAndRouter(
      <ItemCard
        id={product.id}
        img={product.img}
        title={product.title}
        shortDescription={product.shortDescription}
        upVotes={product.votes.upVotes}
        handleUpVote={handleUpVote}
        downVotes={product.votes.downVotes}
        handleDownVote={handleDownVote}
        isFavorite={product.isFavorite}
        handleSetFavorite={handleSetFavorite}
        handleAddToCart={handleAddToCart}
      />,
    );
    const button = getByRole("button", {
      name: "save as favorite",
    });
    userEvent.click(button);

    expect(handleSetFavorite).toHaveBeenCalledWith(product.id);
  });
});
