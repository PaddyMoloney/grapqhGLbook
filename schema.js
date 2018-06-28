var {makeExecutableSchema,addMockFunctionsToSchema} = require('graphql-tools');
var resolvers = require('./resolvers.js');
const typeDefs = `
  type Book {
    id: ID!
    title: String
    authors: [Author]
  }
  type Author {
    id: ID!
    name: String
  }
  type Query {
    books: [Book]
    book(title:String!): Book
  }
  type Mutation {
    addBook(title: String!): Book
  }
  type Subscription {
    bookAdded: Book
  }
`;
var schema = makeExecutableSchema({ typeDefs, resolvers });
module.exports = schema;
