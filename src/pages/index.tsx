import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>YourCode</title>
        <meta name="description" content="A Fully Customizable DSA Tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        Hello World
      </main>
    </>
  );
};

export default Home;
