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
    default: {
      return state;
    }
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { products, cartItems, isLoading, hasError, loadingError } = state;

  // const [products, setProducts] = useState(() =>
  //   loadLocalStorageItems(PRODUCTS_LOCAL_STORAGE_KEY, []),
  // );
  // const [cartItems, setCartItems] = useState(() =>
  //   loadLocalStorageItems(CART_ITEMS_LOCAL_STORAGE_KEY, []),
  // );

  useLocalStorage(products, PRODUCTS_LOCAL_STORAGE_KEY);
  useLocalStorage(cartItems, CART_ITEMS_LOCAL_STORAGE_KEY);

  // const [isLoading, setIsLoading] = useState(false);
  // const [hasError, setHasError] = useState(false);
  // const [loadingError, setLoadingError] = useState(null);

  useEffect(() => {
    if (products.length === 0) {
      dispatch({ type: actionTypes.FETCH_INIT });
      // setIsLoading(true);

      api
        .getProducts()
        .then((data) => {
          dispatch({
            type: actionTypes.FETCH_SUCCESS,
            payload: data,
          });
          // setProducts(data);
          // setIsLoading(false);
        })
        .catch((error) => {
          dispatch({
            type: actionTypes.FETCH_ERROR,
            payload: error.message,
          });
          // setIsLoading(false);
          // setHasError(true);
          // setLoadingError(error.message);
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

      cartItems(updatedCartItems);
      return;
    }

    const updatedProduct = buildNewCartItem(foundProduct);
    cartItems((prevState) => [...prevState, updatedProduct]);
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

    cartItems(updatedCartItems);
  }

  function handleRemove(productId) {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);

    cartItems(updatedCartItems);
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

    products(updatedProducts);
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

    products(updatedProducts);
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

    products(updatedProducts);
  }

  function saveNewProduct(newProduct) {
    products((prevState) => [newProduct, ...prevState]);
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
