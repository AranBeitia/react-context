import React from "react";
import { MemoryRouter } from "react-router-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import thunk from "redux-thunk";

import testProductImage from "./test-assets/test-img.jpg";

function defaultReducer(state = {}, action) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

// we don't need this for now
const rootReducer = combineReducers({
  data: defaultReducer,
});

/**
 * Wraps the component in the Redux and React Router DOM
 * Context Providers
 * @param {React Component} component The React Component
 * @param {Object} options { initialState, store }
 * @param {String} route React Router Route = "/"
 * @returns {Function} render()
 */
function renderWithReduxAndRouter(component, options = {}, route = "/") {
  const {
    initialState = {},
    store = createStore(rootReducer, initialState, applyMiddleware(thunk)),
  } = options;

  return render(
    <MemoryRouter initialEntries={[route]}>
      <Provider store={store}>{component}</Provider>
    </MemoryRouter>,
  );
}

function getInitialReduxStoreUserState() {
  return {
    user: {
      currentUser: {
        token: "__token__",
      },
    },
  };
}

function getTestProduct() {
  return {
    id: "65d6b269-209b-50ac-a566-ca6a334aa6f0",
    title: "Nike Runner 2000",
    price: 88,
    img: testProductImage,
    shortDescription:
      "Ipsum sint consequat culpa adipisicing occaecat aliquip aliquip sit labore aute.",
    longDescription:
      "Occaecat nostrud ipsum excepteur adipisicing dolor. Deserunt pariatur commodo duis Lorem laboris irure dolor dolor proident aute pariatur. Nostrud consectetur labore anim est deserunt esse est nostrud ipsum velit incididunt aliqua anim. Occaecat exercitation culpa proident aute aliqua exercitation nulla cillum velit nisi reprehenderit Lorem sunt.",
    isFavorite: false,
    createdAt: "2021-04-23T09:12:24.2424+02",
    updatedAt: "2021-04-23T09:12:24.2424+02",
    unitsInStock: 5,
    votes: {
      upVotes: {
        upperLimit: 10,
        currentValue: 0,
      },
      downVotes: {
        lowerLimit: 10,
        currentValue: 0,
      },
    },
    author: {
      id: "9cb107d1-cc36-5399-a8b2-0ad65daa5d36",
      firstName: "Clyde",
      lastName: "Tucker",
      email: "mepsukjid@riz.jm",
    },
  };
}

export {
  renderWithReduxAndRouter,
  userEvent,
  getInitialReduxStoreUserState,
  getTestProduct,
};
