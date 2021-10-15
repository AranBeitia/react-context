import React from "react";

import NewProductForm from "../../components/NewProductForm";
import withLayout from "../../hoc/withLayout";

function NewProduct() {
  return (
    <div className="row justify-content-center">
      <div className="col col-8">
        <div className="row">
          <header className="col col-12">
            <h1>New product</h1>
          </header>
          <div className="col col-12">
            <hr />
          </div>

          <div className="col col-12">
            <NewProductForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withLayout(NewProduct);
