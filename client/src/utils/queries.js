import { gql } from "@apollo/client";

export const GET_USER = gql`
  query user {
    _id
    username
    email
    status {
      statusText
      username
      comments {
        commentText
        username
      }
    }
    pets {
      name
      breed
      age
      gender
      praises {
        username
        praiseText
      }
    }
  }
`;
