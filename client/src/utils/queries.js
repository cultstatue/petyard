import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query getUser {
    user {
      _id
      username
      email
      status {
        _id
        statusText
        username
        comments {
          commentText
          username
        }
      }
      pets {
        _id
        username
        image
        name
        breed
        species
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
export const QUERY_PET = gql`
  query Pet($id: ID!) {
    pet(_id: $id) {
      _id
      image
      username
      name
      species
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
export const QUERY_PETS = gql`
  query Pets($username: String) {
    pets(username: $username) {
      _id
      image
      username
      species
      name
      breed
      age
      gender
      praises {
        username
        praiseText
      }
      _id
    }
  }
`;
