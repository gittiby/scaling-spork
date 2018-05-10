// ts / es6 import thing - unless you specify a defult, must wrap in {} when importing
import resolvers from './resolvers';
import { makeExecutableSchema } from 'graphql-tools';
import Author from './author';
import author from './author';

const RootQuery = `
  type RootQuery {
    books: [Book]
    authors: [Author]
    author(name: String!): Author
    fortuneCookie: String
  }
`
const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery, ...Author],
  resolvers: resolvers
});