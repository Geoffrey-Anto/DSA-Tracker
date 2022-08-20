import { gql } from "@apollo/client";

export const TOGGLE_SOLVED_QUESTION = gql`
  mutation toggleSolvedQuestion($questionId: String!) {
    toggleSolved(questionId: $questionId)
  }
`;

export type ToggleSolvedQuestionMutationVariables = {};
