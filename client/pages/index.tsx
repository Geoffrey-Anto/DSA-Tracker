import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import * as jwt from "jsonwebtoken";
import { JwtPayloadType } from "../types";
import Navbar from "../components/Navbar";
import Welcome from "../components/Welcome";
import { addApolloState, initializeApollo } from "../lib/apolloClient";
import { GETQLIST, GETQLIST_Type } from "../graphql/query/getQList";
import { useQuery } from "@apollo/client";

interface Props {
  decodedUser: JwtPayloadType;
}

const Home: NextPage<Props> = ({ decodedUser }) => {
  const { data: QListData } = useQuery<GETQLIST_Type>(GETQLIST);
  return (
    <div className="min-h-screen w-full bg-gray-800 text-white">
      <Head>
        <title>DSA - Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar user={decodedUser} />
      <Welcome name={decodedUser.name} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies["access-token"];
  if (!token) {
    return {
      redirect: {
        destination: "/auth/Register",
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

  // Get QList
  const apolloClient = initializeApollo();

  try {
    await apolloClient.query({
      query: GETQLIST,
      context: {
        headers: {
          cookie: token,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }

  return addApolloState(apolloClient, {
    props: {
      decodedUser: decoded,
    },
  });
};

export default Home;
