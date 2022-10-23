import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query getUser {
    user {
      _id
      profile_img
      username
      email
      status {
        _id
        statusText
        username
        comments {
          _id
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
export const QUERY_ALL_USERS = gql`
  query getAllUsers {
    users {
      _id
      profile_img
      username
      status {
        _id
        statusText
      }
    }
  }
`;
export const QUERY_OTHER_USER = gql`
  query otherUser($username: String!) {
    otherUser(username: $username) {
      _id
      profile_img
      username
      email
      status {
        _id
        statusText
        username
        comments {
          _id
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

export const QUERY_STATUS = gql`
  query getStatus($username: String) {
    status(username: $username) {
      _id
      username
      statusText
      comments {
        commentText
        username
        _id
      }
    }
  }
`;
