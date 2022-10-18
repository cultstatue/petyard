import { gql } from "@apollo/client";
// THESE ARE NOTE THE REAL MUTATIONS JUST FOR TESTING SIGNUP MODALS
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    # REPLACE THIS INFORMATION
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!, $email: String!) {
    # REPLACE THIS INFORMATION
    addUser(username: $username, password: $password, email: $email) {
      user {
        _id
        username
        email
        bookCount
        savedBooks {
          authors
          bookId
          image
          link
          title
          description
        }
      }
      token
    }
  }
`;
