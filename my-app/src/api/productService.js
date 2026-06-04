import apiClient from "./apiClient";

export const getProducts = () =>
  apiClient.get("/products");

export const createProduct = (productData) =>
  apiClient.post("/products", productData);