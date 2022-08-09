import { QuestionType } from "../types";

export function getSolvedQuestionCount(
  question: QuestionType[] | undefined
): number {
  let num = 0;
  question?.forEach((value) => {
    if (value.isSolved) {
      num++;
    }
  });
  console.log(num);
  return num;
}
