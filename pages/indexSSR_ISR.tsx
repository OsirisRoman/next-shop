// Option SSR 2: Fetch products on the server side but
// with Incremental Static Regeneration(ISR) in getStaticProps

import { GetStaticProps } from "next";
import React from "react";

import Head from "next/head";
import Title from "../components/Title";

import { getProducts, Product } from "../lib/products";
interface HomePageProps {
  products: Product[];
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const products = await getProducts();
  return {
    props: { products },
    revalidate: 30, // Seconds
  };
};

const HomePage: React.FC<HomePageProps> = ({ products }) => {
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
