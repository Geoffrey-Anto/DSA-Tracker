import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation register($email: String!, $name: String!, $password: String!) {
    register(
      createUserInput: { email: $email, name: $name, password: $password }
    ) {
      data {
        id
        name
        email
      }
      message
    }
  }
`;
