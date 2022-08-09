import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(LoginUserInput: { email: $email, password: $password }) {
      data {
        id
        name
        email
      }
      message
    }
  }
`;
