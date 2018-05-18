// ts / es6 import thing - unless you specify a defult, must wrap in {} when importing
import resolvers from '../resolvers/testDataResolvers';
import { makeExecutableSchema } from 'graphql-tools';
import {BookType} from './book';
import {AuthorType} from './author';

const RootQuery = `
  type Query {
    books: [Book]
    authors: [Author]
    author(name: String!): Author
    fortuneCookie: String
  }
`
export const schema = makeExecutableSchema({
  typeDefs: [RootQuery, BookType, AuthorType],
  resolvers: resolvers,
  logger: console
});