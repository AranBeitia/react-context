import { createContext } from "react";

const initValues = {
  cartItems: [],
  products: [],
  isLoading: false,
  hasError: false,
  loadingError: false,
  handleDownVote: () => {},
  handleUpVote: () => {},
  handleSetFavorite: () => {},
  handleAddToCart: () => {},
  handleRemove: () => {},
  handleChange: () => {},
};

const HomeContext = createContext(initValues);

export default HomeContext;
