import type { NextPage } from "next";
import Head from "next/head";
import * as jwt from "jsonwebtoken";
import { JwtPayloadType } from "../types";

interface Props {
  decodedUser: JwtPayloadType;
}

const Home: NextPage<Props> = (props) => {
  return (
    <div className="">
      <Head>
        <title>DSA - Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {JSON.stringify(props)}
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const token = context.req.cookies["access-token"];
  if (!token) {
    return {
      redirect: {
        destination: "/auth/Login",
      },
    };
  }
  let decoded: JwtPayloadType | undefined;
  try {
    decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayloadType;
  } catch (e) {
    console.log(e);
    return {
      redirect: {
        destination: "/auth/Login",
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
