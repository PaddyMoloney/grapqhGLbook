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
  }
`;
var schema = makeExecutableSchema({ typeDefs, resolvers });
module.exports = schema;
