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
    name: String
    breed: String
    age: Int
    gender: String
    praises: [Praise]
  }
  type Praise {
    username: String
    praiseText: String
  }
  type Status {
    statusText: String
    username: String
    comments: [Comment]
  }
  type Comment {
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
  }
`;

module.exports = typeDefs;
