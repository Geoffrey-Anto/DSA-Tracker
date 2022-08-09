import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import * as jwt from "jsonwebtoken";
import { JwtPayloadType } from "../types";
import Navbar from "../components/Navbar";

interface Props {
  decodedUser: JwtPayloadType;
}

const Home: NextPage<Props> = ({ decodedUser }) => {
  return (
    <div className="min-h-screen w-full bg-gray-800 text-white">
      <Head>
        <title>DSA - Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar user={decodedUser} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies["access-token"];
  if (!token) {
    return {
      redirect: {
        destination: "/auth/Signup",
      },
      props: {},
    };
  }
  let decoded: JwtPayloadType | undefined;
  try {
    decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayloadType;
  } catch (e) {
    return {
      redirect: {
        destination: "/auth/Login?session=expired",
        permanent: false,
      },
    };
  }
  return {
    props: {
      decodedUser: decoded,
    },
  };
};

export default Home;
