import React, { useEffect, useReducer } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import NewProduct from "./pages/NewProduct";

import * as api from "./api";

import useLocalStorage from "./hooks/useLocalStorage";
import loadLocalStorageItems from "./utils/loadLocalStorageItems";

import HomeContext from "./context/HomeContext";
import NewProductContext from "./context/NewProductContext";

function buildNewCartItem(cartItem) {
  if (cartItem.quantity >= cartItem.unitsInStock) {
    return cartItem;
  }

  return {
    id: cartItem.id,
    title: cartItem.title,
    img: cartItem.img,
    price: cartItem.price,
    unitsInStock: cartItem.unitsInStock,
    createdAt: cartItem.createdAt,
    updatedAt: cartItem.updatedAt,
    quantity: cartItem.quantity + 1,
  };
}

const PRODUCTS_LOCAL_STORAGE_KEY = "react-sc-state-products";
const CART_ITEMS_LOCAL_STORAGE_KEY = "react-sc-state-cart-items";

const actionTypes = {
  FETCH_INIT: "FETCH_INIT",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",
  CART_ITEMS: "CART_ITEMS",
  PRODUCT_ITEMS: "PRODUCT_ITEMS",
};

const initialState = {
  products: loadLocalStorageItems(PRODUCTS_LOCAL_STORAGE_KEY, []),
  cartItems: loadLocalStorageItems(CART_ITEMS_LOCAL_STORAGE_KEY, []),
  isLoading: false,
  hasError: false,
  loadingError: null,
};

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.FETCH_INIT: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actionTypes.FETCH_SUCCESS: {
      return {
        ...state,
        products: [...action.payload],
        isLoading: true,
      };
    }
    case actionTypes.FETCH_ERROR: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
        loadingError: { ...action.payload },
      };
    }
    case actionTypes.CART_ITEMS: {
      return {
        ...state,
        cartItems: [...action.payload],
      };
    }
    case actionTypes.PRODUCT_ITEMS: {
      return {
        ...state,
        products: [...action.payload],
      };
    }
    default: {
      return state;
    }
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { products, cartItems, isLoading, hasError, loadingError } = state;

  useLocalStorage(products, PRODUCTS_LOCAL_STORAGE_KEY);
  useLocalStorage(cartItems, CART_ITEMS_LOCAL_STORAGE_KEY);

  useEffect(() => {
    if (products.length === 0) {
      dispatch({ type: actionTypes.FETCH_INIT });

      api
        .getProducts()
        .then((data) => {
          dispatch({
            type: actionTypes.FETCH_SUCCESS,
            payload: data,
          });
        })
        .catch((error) => {
          dispatch({
            type: actionTypes.FETCH_ERROR,
            payload: error.message,
          });
        });
    }
  }, []);

  function handleAddToCart(productId) {
    const prevCartItem = cartItems.find((item) => item.id === productId);
    const foundProduct = products.find((product) => product.id === productId);

    if (prevCartItem) {
      const updatedCartItems = cartItems.map((item) => {
        if (item.id !== productId) {
          return item;
        }

        if (item.quantity >= item.unitsInStock) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      });
      dispatch({ type: actionTypes.CART_ITEMS, payload: updatedCartItems });
      return;
    }

    const updatedProduct = buildNewCartItem(foundProduct);
    dispatch({
      type: actionTypes.CART_ITEMS,
      payload: [...cartItems, updatedProduct],
    });
    // setCartItems((prevState) => [...prevState, updatedProduct]);
  }

  function handleChange(event, productId) {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === productId && item.quantity <= item.unitsInStock) {
        return {
          ...item,
          quantity: Number(event.target.value),
        };
      }

      return item;
    });
    dispatch({
      type: actionTypes.CART_ITEMS,
      payload: [updatedCartItems],
    });
  }

  function handleRemove(productId) {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    dispatch({ type: actionTypes.CART_ITEMS, payload: updatedCartItems });
  }

  function handleDownVote(productId) {
    const updatedProducts = products.map((product) => {
      if (
        product.id === productId &&
        product.votes.downVotes.currentValue <
          product.votes.downVotes.lowerLimit
      ) {
        return {
          ...product,
          votes: {
            ...product.votes,
            downVotes: {
              ...product.votes.downVotes,
              currentValue: product.votes.downVotes.currentValue + 1,
            },
          },
        };
      }

      return product;
    });
    dispatch({ type: actionTypes.PRODUCT_ITEMS, payload: updatedProducts });
  }

  function handleUpVote(productId) {
    const updatedProducts = products.map((product) => {
      if (
        product.id === productId &&
        product.votes.upVotes.currentValue < product.votes.upVotes.upperLimit
      ) {
        return {
          ...product,
          votes: {
            ...product.votes,
            upVotes: {
              ...product.votes.upVotes,
              currentValue: product.votes.upVotes.currentValue + 1,
            },
          },
        };
      }

      return product;
    });
    dispatch({ type: actionTypes.PRODUCT_ITEMS, payload: updatedProducts });
  }

  function handleSetFavorite(productId) {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          isFavorite: !product.isFavorite,
        };
      }

      return product;
    });
    dispatch({ type: actionTypes.PRODUCT_ITEMS, payload: updatedProducts });
  }

  function saveNewProduct(newProduct) {
    dispatch({
      type: actionTypes.PRODUCT_ITEMS,
      payload: [...products, newProduct],
    });
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/new-product">
          <NewProductContext.Provider
            value={{
              saveNewProduct: saveNewProduct,
            }}
          >
            <NewProduct />
          </NewProductContext.Provider>
        </Route>
        <Route path="/" exact>
          <HomeContext.Provider
            value={{
              cartItems: cartItems,
              products: products,
              isLoading: isLoading,
              hasError: hasError,
              loadingError: loadingError,
              handleDownVote: handleDownVote,
              handleUpVote: handleUpVote,
              handleSetFavorite: handleSetFavorite,
              handleAddToCart: handleAddToCart,
              handleRemove: handleRemove,
              handleChange: handleChange,
            }}
          >
            <Home fullWidth />
          </HomeContext.Provider>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
