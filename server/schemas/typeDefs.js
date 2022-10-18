const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    status: Status
    pets: [Pet]
  }
  type Pet {
    _id: ID
    name: String
    breed: String
    age: Int
    gender: String
    praises: [Praise]
  }
  type Praise {
    _id: ID
    username: String
    praiseText: String
  }
  type Status {
    _id: ID
    statusId: String
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
    pets(username: String): [Pet]
    status(username: String): [Status]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth

    updateUser(username: String, email: String, password: String): User

    login(email: String!, password: String!): Auth

    addStatus(statusText: String!): Status
    updateStatus(statusId: String!, statusText: String!): Status
    addComment(statusId: ID!, commentText: String!): Status
    deleteComment(statusId: ID!, _id: ID!): Status
  }
`;

module.exports = typeDefs;
