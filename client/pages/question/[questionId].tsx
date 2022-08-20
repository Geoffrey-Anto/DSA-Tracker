import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const Index = () => {
  const {
    query: { questionId },
  } = useRouter();
  return (
    <>
      <Head>
        <title>DSA - Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen w-full bg-gray-800 text-white">
        {questionId}
      </div>
    </>
  );
};

export default Index;
