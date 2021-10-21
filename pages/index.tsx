import React from "react";

import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

import Title from "../components/Title";

import { getProducts, Product } from "../lib/products";
interface HomePageProps {
  products: Product[];
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const products = await getProducts();
  return {
    props: { products },
    revalidate: parseInt(process.env.REVALIDATE_TIME),
  };
};

const HomePage: React.FC<HomePageProps> = ({ products }) => {
  console.log("[HomePage] renders");
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main className="px-6 py-4">
        <Title>Next Shop</Title>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <Link href={`/products/${product.id}`}>
                <a>{product.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default HomePage;
