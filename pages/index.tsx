import Head from "next/head";
import Title from "../components/Title";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main className="px-6 py-4">
        <Title>Next Shop</Title>
        {/* <h1 className="text-2xl pb-4">Next Shop</h1> */}
        <p>[TODO: display products]</p>
      </main>
    </>
  );
};

export default HomePage;
