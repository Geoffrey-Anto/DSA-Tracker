import { gql } from "@apollo/client";

export const GETQLIST = gql`
  {
    getQList {
      id
      userId
      isPublic
      allQuestions {
        id
        title
        link
        tags
        isSolved
      }
      favoriteQuestions {
        id
        title
        link
        tags
        isSolved
      }
      todoQuestions {
        id
        title
        link
        tags
        isSolved
      }
    }
  }
`;

export interface GETQLIST_Type {
  getQList: {
    id: string;
    userId: string;
    isPublic: boolean;
    allQuestions: {
      id: string;
      title: string;
      link: string;
      tags: string;
      isSolved: boolean;
    }[];
    favoriteQuestions: {
      id: string;
      title: string;
      link: string;
      tags: string;
      isSolved: boolean;
    }[];
    todoQuestions: {
      id: string;
      title: string;
      link: string;
      tags: string;
      isSolved: boolean;
    }[];
  };
}
