import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import * as jwt from "jsonwebtoken";
import { JwtPayloadType } from "../types";
import Navbar from "../components/Navbar";
import Welcome from "../components/Welcome";
import { addApolloState, initializeApollo } from "../lib/apolloClient";
import { GETQLIST, GETQLIST_Type } from "../graphql/query/getQList";
import { useQuery } from "@apollo/client";
import Stats from "../components/Stats";
import { getSolvedQuestionCount } from "../utils/getSolvedQuestionCount";
import QuestionList from "../components/QuestionList";
import { useEffect, useState } from "react";

interface Props {
  decodedUser: JwtPayloadType;
}

const Home: NextPage<Props> = ({ decodedUser }) => {
  const { data, refetch } = useQuery<GETQLIST_Type>(GETQLIST);
  const [QListData, setQListData] = useState(data);

  const sortQuestionByAlphabetOrder = (order: "ASC" | "DSC") => {
    // sort according to title
    if (QListData && QListData.getQList && QListData.getQList.allQuestions) {
      const updatedQList = [...QListData.getQList.allQuestions].sort((a, b) => {
        // if (a.title === b.title) return 0;

        return a.title.localeCompare(b.title) === 0
          ? 0
          : order === "ASC"
          ? a.title.localeCompare(b.title) <= 0
            ? 1
            : -1
          : a.title.localeCompare(b.title) <= 0
          ? -1
          : 1;
      });

      if (updatedQList && QListData) {
        const data: GETQLIST_Type = {
          getQList: {
            ...QListData.getQList,
            allQuestions: updatedQList,
          },
        };
        setQListData(data);
      }
    }
  };

  const sortOptions = {
    sortByTitle: sortQuestionByAlphabetOrder,
  };

  useEffect(() => {
    setQListData(data);
  }, [data]);

  return (
    <>
      <Head>
        <title>DSA - Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        id="root"
        className="flex flex-col min-h-screen w-full bg-gray-800 text-white overflow-y-scroll scrollbar-thin scrollbar-thumb-purple scrollbar-track-transparent h-32 select-none"
      >
        <Navbar user={decodedUser} />
        <div className="flex h-fit items-start mt-2 justify-center sm:justify-between flex-wrap">
          <Welcome
            name={decodedUser.name}
            stats={{
              All: QListData?.getQList.allQuestions.length as number,
              Todo: QListData?.getQList.todoQuestions.length as number,
              Favs: QListData?.getQList.favoriteQuestions.length as number,
            }}
          />
          <Stats
            tackingData={{
              All: QListData?.getQList.allQuestions.length as number,
              Todo: QListData?.getQList.todoQuestions.length as number,
              Solved: getSolvedQuestionCount(QListData?.getQList.allQuestions),
            }}
          />
        </div>
        <br />
        <QuestionList
          refetch={refetch}
          sortOptions={sortOptions}
          data={QListData}
        />
      </div>
    </>
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
