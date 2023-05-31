import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Logo from "~/components/Logo";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>DSA Tracker</title>
        <meta
          name="description"
          content="Your Fully Customizable DSA Tracker"
        />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <main className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-black text-white">
        <div className="flex items-center justify-center gap-x-6">
          <Logo />
          <p className="text-5xl font-semibold">DSA Tracker</p>
        </div>
        <br />
        <Link
          href="/dashboard"
          className="bg-gradient-to-r from-[#5c05ff] to-[#ff05ee] bg-clip-text text-2xl text-transparent"
        >
          Dashboard
        </Link>
      </main>
    </>
  );
};

export default Home;
