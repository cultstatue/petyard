import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
    $profile_img: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      profile_img: $profile_img
    ) {
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

export const UPDATE_STATUS = gql`
  mutation UpdateStatus($statusId: ID!, $statusText: String!) {
    updateStatus(statusId: $statusId, statusText: $statusText) {
      _id
      statusText
    }
  }
`;

export const ADD_STATUS = gql`
  mutation AddStatus($statusText: String!) {
    addStatus(statusText: $statusText) {
      _id

      statusText
      username
      comments {
        commentText
        username
      }
    }
  }
`;

export const ADD_PET = gql`
  mutation addPet(
    $name: String!
    $breed: String!
    $age: Int
    $gender: String
    $image: String!
    $species: String!
  ) {
    addPet(
      name: $name
      breed: $breed
      age: $age
      gender: $gender
      image: $image
      species: $species
    ) {
      _id
      name
      breed
      age
      gender
      image
      species
    }
  }
`;
export const ADD_PRAISE = gql`
  mutation AddPraise($petId: ID!) {
    addPraise(petId: $petId) {
      _id
    }
  }
`;
