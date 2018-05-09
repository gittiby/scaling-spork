import { makeExecutableSchema } from 'graphql-tools';
import {
  typeDef as Book,
  resolvers as bookResolvers
} from './book';

export const schema = makeExecutableSchema({
  typeDefs: Book,
  resolvers: bookResolvers
});