// Option 1 CSR: Fetch products on the client side
// making use of React Hooks

import React, { useState, useEffect } from "react";

import Head from "next/head";
import Title from "../components/Title";

import { getProducts, Product } from "../lib/products";

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main className="px-6 py-4">
        <Title>Next Shop</Title>
        <ul>
          {products.map(product => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default HomePage;
