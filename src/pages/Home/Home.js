import React, { useContext } from "react";

import ProductsListing from "../../components/ProductsListing";
import Cart from "../../components/Cart";
import withLayout from "../../hoc/withLayout";

import HomeContext from "../../context/HomeContext";

function Home() {
  const { isLoading, hasError, loadingError } = useContext(HomeContext);
  return (
    <div className="row">
      <div className="col col-8">
        <div className="row">
          <div className="col col-12">
            <header className="jumbotron">
              <h1 className="display-4">Shoe shop</h1>
              <p className="lead">
                This is the best shoe shop ever, you will never find a better
                one.
              </p>
              <p className="font-weight-bold">Buy now!</p>
            </header>
          </div>
          {isLoading && (
            <div className="col col-12">
              <h2>Loading products...</h2>
            </div>
          )}
          {hasError && (
            <div className="col col-12">
              <h2>Something went wrong...</h2>
              <pre>
                <code>{loadingError}</code>
              </pre>
            </div>
          )}
          {!isLoading && !hasError && (
            <div className="col col-12">
              <ProductsListing />
            </div>
          )}
        </div>
      </div>

      <Cart />
    </div>
  );
}

export default withLayout(Home);
