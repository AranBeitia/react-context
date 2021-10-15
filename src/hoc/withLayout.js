import React from "react";

import AppHeader from "../components/AppHeader";
import Footer from "../components/Footer";
import Main from "../components/Main";

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

/* eslint no-param-reassign: [2, { "props": false }] */
function withLayout(WrappedComponent) {
  WrappedComponent.displayName = `withLayout(${getDisplayName(
    WrappedComponent,
  )})`;

  function WrapperComponent({ ...props }) {
    return (
      <>
        <AppHeader />
        <Main className={props.fullWidth ? "container-fluid" : "container"}>
          <WrappedComponent {...props} />
        </Main>
        <Footer />
      </>
    );
  }

  return WrapperComponent;
}

export default withLayout;
