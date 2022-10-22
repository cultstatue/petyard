import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($statusId: ID!, $commentText: String!) {
    addComment(statusId: $statusId, commentText: $commentText) {
      _id
      statusText
      username
      comments {
        commentText
        username
        _id
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($statusId: ID!, $id: ID!) {
    deleteComment(statusId: $statusId, _id: $id) {
      _id
      statusText
      comments {
        _id
        commentText
        username
      }
    }
  }
`;
