import {
  ApolloQueryResult,
  OperationVariables,
  useMutation,
} from "@apollo/client";
import { PlusIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { TOGGLE_SOLVED_QUESTION } from "../graphql/mutation/toggleSolved";
import { GETQLIST_Type } from "../graphql/query/getQList";
import AddQuestion from "./AddQuestion";
import { QuestionRow } from "./QuestionRow";

interface Props {
  data?: GETQLIST_Type;
  sortOptions: {
    sortByTitle: (order: "ASC" | "DSC") => void;
  };
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<GETQLIST_Type>>;
}

const QuestionList: React.FC<Props> = ({ data, sortOptions, refetch }) => {
  const [currSortOptionState, setCurrSortOptionState] = useState<{
    sortByTitle: "ASC" | "DSC" | " ";
  }>();
  const [toggleSolvedStatus] = useMutation(TOGGLE_SOLVED_QUESTION, {
    onCompleted: () => {
      refetch();
    },
  });
  const [isAddQuestionHidden, setIsAddQuestionHidden] = useState(true);

  const onToggleHandler = async (id: string, _: number) => {
    const resp = await toggleSolvedStatus({
      variables: {
        questionId: id,
      },
    });
    if (!resp.data?.toggleSolved) {
      toast.error("Error in toggling status");
      return;
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-start justify-center flex-1 mt-14 p-4 pr-6">
      <div
        className="w-full flex items-center pr-6 mb-2"
        onClick={() => {
          setIsAddQuestionHidden(!isAddQuestionHidden);
        }}
      >
        <p className="text-center w-full p-2 m-2 text-2xl font-bold underline underline-offset-8">
          All Questions
        </p>
        <div className="flex items-center justify-center mt-2 gap-x-3 cursor-pointer">
          <p className="w-fit text-lg">Add</p>
          <PlusIcon className="w-8 h-8  mr-10" />
        </div>
      </div>
      <div
        className={
          isAddQuestionHidden
            ? "z-30 absolute left-1/4 top-1/4 w-1/2 h-1/2 border-2 border-gray-300 hidden"
            : "z-30 absolute left-1/4 top-1/4 w-1/2 h-1/2 border-2 border-gray-300 flex"
        }
      >
        <AddQuestion />
      </div>
      <Toaster />
      <table className="w-full border border-gray-400">
        <thead className="w-full border border-gray-400">
          <tr className="w-full ">
            <th className="border border-gray-400 p-3">
              <div>
                <p>S No</p>
              </div>
            </th>
            <th
              className="border border-gray-400 p-3 cursor-pointer"
              onClick={async () => {
                if (currSortOptionState?.sortByTitle === " ") {
                  sortOptions.sortByTitle("DSC");
                }
                setCurrSortOptionState({
                  sortByTitle:
                    currSortOptionState?.sortByTitle === "DSC" ? "ASC" : "DSC",
                });
                currSortOptionState?.sortByTitle === "ASC"
                  ? sortOptions.sortByTitle("DSC")
                  : sortOptions.sortByTitle("ASC");
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <p className="flex flex-1 text-center w-full items-center justify-center">
                  Question
                </p>
                <p className="text-xs h-full flex items-end justify-start hover:text-purple">
                  {currSortOptionState?.sortByTitle}
                </p>
              </div>
            </th>
            <th className="border border-gray-400 p-3">Tags</th>
            <th className="border border-gray-400 p-3">Category</th>
            <th className="border border-gray-400 p-3">Status</th>
            <th className="border border-gray-400 p-3">Link</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {data?.getQList?.allQuestions?.map((question, index) => {
            return (
              <QuestionRow
                key={question.id}
                index={index}
                onToggleHandler={onToggleHandler}
                question={question}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionList;
