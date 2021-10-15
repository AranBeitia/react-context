import { createContext } from "react";

const initValues = {
  saveNewProduct: () => {},
};

const NewProductContext = createContext(initValues);

export default NewProductContext;
