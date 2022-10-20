import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  {
    me {
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
  }
`;
