const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    profile_img: String
    username: String
    email: String
    status: Status
    pets: [Pet]
  }
  type Pet {
    _id: ID
    image: String
    username: String
    name: String
    species: String
    breed: String
    age: Int
    gender: String
    praises: [Praise]
  }
  input PetInput {
    name: String
    breed: String
    age: Int
    gender: String
  }
  type Praise {
    _id: ID
    username: String
    praiseText: String
  }
  type Status {
    _id: ID
    statusText: String
    username: String
    comments: [Comment]
  }
  type Comment {
    _id: ID
    commentText: String
    username: String
  }
  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    users: [User]
    otherUser(username: String): User
    pets(username: String): [Pet]
    pet(_id: ID!): Pet
    status(username: String): [Status]
  }

  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
      profile_img: String!
    ): Auth

    updateUser(username: String, email: String, password: String): User

    login(email: String!, password: String!): Auth

    addPet(
      name: String!
      breed: String!
      age: Int
      gender: String
      image: String
      species: String
    ): Pet
    updatePet(
      petId: ID!
      name: String!
      breed: String!
      age: Int
      gender: String
    ): Pet
    deletePet(petId: ID!): User

    addStatus(statusText: String!): Status
    updateStatus(statusId: ID!, statusText: String!): Status
    addComment(statusId: ID!, commentText: String!): Status
    deleteComment(statusId: ID!, _id: ID!): Status
    addPraise(petId: ID!): Pet
  }
`;

module.exports = typeDefs;
