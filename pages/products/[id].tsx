import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

import { ParsedUrlQuery } from "querystring";

import React from "react";

import Title from "../../components/Title";
import { getProduct, getProducts, Product } from "../../lib/products";

interface ProductPageParams extends ParsedUrlQuery {
  id: string;
}

interface ProductPageProps {
  product: Product;
}

export const getStaticPaths: GetStaticPaths<ProductPageParams> = async () => {
  const products = await getProducts();
  return {
    paths: products.map(product => ({
      params: {
        id: product.id.toString(),
      },
    })),
    //The fallback: false property tells nextjs that if
    //the path do not find any match, the 404 not
    //found page should be showed up
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  ProductPageProps,
  ProductPageParams
> = async ({ params: { id } }) => {
  const product = await getProduct(id);
  return {
    props: { product },
    revalidate: 30, // 5 minutes
  };
};

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  console.log("[ProductPage] renders");
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main className="px-6 py-4">
        <Title>{product.title}</Title>
        <p>{product.description}</p>
      </main>
    </>
  );
};

export default ProductPage;
