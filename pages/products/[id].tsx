import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";

import { ParsedUrlQuery } from "querystring";

import React from "react";

import Title from "../../components/Title";
import { getProduct, getProducts, Product } from "../../lib/products";
import { ApiError } from "../../lib/api";

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
  try {
    const product = await getProduct(id);
    return {
      props: { product },
      revalidate: parseInt(process.env.REVALIDATE_TIME),
    };
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return { notFound: true };
    }
    throw err;
  }
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
        <div className="border shadow hover:shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Image src={product.pictureUrl} alt="" width={640} height={480} />
            <div>
              <p className="text-sm">{product.description}</p>
              <div className="text-lg font-bold">{product.price}</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductPage;
