import * as Yup from "yup";

const productSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "The title is too short!")
    .max(50, "The title is too long!")
    .required("The title is required"),
  price: Yup.number()
    .integer("The price must be an integer")
    .positive("The price must be a positive number")
    .required("The price is required"),
  img: Yup.string()
    .url("The image url is invalid")
    .required("The image url is required"),
  shortDescription: Yup.string()
    .min(2, "The short description is too short!")
    .max(50, "The short description is too long!")
    .required("The short description is required"),
  longDescription: Yup.string()
    .min(2, "The long description is too short!")
    .max(100, "The long description is too long!")
    .required("The long description is required"),
  unitsInStock: Yup.number()
    .integer("The units in stock must be an integer")
    .positive("The units in stock must be a positive number")
    .required("The units in stock is required"),
  authorFirstName: Yup.string()
    .min(2, "The author first name is too short!")
    .required("The author first name is required"),
  authorLastName: Yup.string()
    .min(2, "The author last name is too short!")
    .required("The author last name is required"),
  authorEmail: Yup.string().email("Invalid email").required("Required"),
});

export default productSchema;
