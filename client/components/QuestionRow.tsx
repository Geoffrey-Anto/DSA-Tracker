import { CheckIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { memo } from "react";
import VisitButton from "./VisitButton";

interface QuestionRowProps {
  question: {
    id: string;
    title: string;
    link: string;
    tags: string;
    isSolved: boolean;
  };
  index: number;
  onToggleHandler: (id: string, index: number) => Promise<void>;
}

const areEqual:
  | ((
      prevProps: Readonly<QuestionRowProps>,
      nextProps: Readonly<QuestionRowProps>
    ) => boolean)
  | undefined = (prev, next) => {
  if (prev.question.isSolved === next.question.isSolved) {
    return true;
  }
  return false;
};

export const QuestionRow: React.FC<QuestionRowProps> = memo(
  ({ index, onToggleHandler, question }) => {
    console.log("id", index);
    return (
      <tr className="w-full">
        <td className="border border-gray-400 text-center p-3">
          {(index + 1).toString()}
        </td>
        <Link href={`/question/${question.id}`}>
          <td className="border border-gray-400 text-center p-3 hover:text-purple cursor-pointer">
            {question.title}
          </td>
        </Link>
        <td className="border border-gray-400 text-center p-3">
          {question.tags.split(",").map((val, idx) => {
            return (
              <p key={idx} className="text-sm">
                {val}
              </p>
            );
          })}
        </td>
        <td className="border border-gray-400 text-center p-3">
          {question.tags.split(",")[0]}
        </td>
        <>
          {question.isSolved ? (
            <td
              className="border border-gray-400 text-center p-3 flex items-center justify-center"
              onClick={() => {
                onToggleHandler(question.id, index);
              }}
            >
              <CheckIcon className="text-green-500 w-8 h-8 border border-gray-400 cursor-pointer" />
            </td>
          ) : (
            <td
              className="border border-gray-400 flex items-center justify-center p-3"
              onClick={() => {
                onToggleHandler(question.id, index);
              }}
            >
              <div className=" w-8 h-8 border border-gray-400 cursor-pointer"></div>
            </td>
          )}
        </>
        <td className="border border-gray-400 text-center p-3">
          <VisitButton title={question.link} />
        </td>
      </tr>
    );
  },
  areEqual
);
