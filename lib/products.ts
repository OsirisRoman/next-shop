import { fetchJson } from "./api";

const { CMS_URL } = process.env;
export interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
}

const stripProduct = (product: Product): Product => {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    price: "$" + (+product.price).toFixed(2),
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
