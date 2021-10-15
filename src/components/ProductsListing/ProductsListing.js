import React from "react";

import ItemCard from "../ItemCard";

function ProductsListing({
  products,
  handleDownVote,
  handleUpVote,
  handleSetFavorite,
  handleAddToCart,
  ...props
}) {
  return (
    <section className="row" {...props}>
      {products.map((product) => (
        <ItemCard
          key={product.id}
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
        />
      ))}
    </section>
  );
}

export default ProductsListing;
