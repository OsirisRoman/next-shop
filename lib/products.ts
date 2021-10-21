import { fetchJson } from "./api";

const CMS_URL = "http://localhost:1337";
export interface Product {
  id: number;
  title: string;
  description: string;
}

const stripProduct = (product: Product): Product => {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
  };
};

export const getProduct = async (id: string): Promise<Product> => {
  const product = await fetchJson(`${CMS_URL}/products/${id}`);
  return stripProduct(product);
};

export const getProducts = async (): Promise<Product[]> => {
  const products = await fetchJson(`${CMS_URL}/products`);
  return products.map(stripProduct);
};
