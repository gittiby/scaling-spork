import {books} from '../test_data';

export const typeDef = `
  type Query { books: [Book] }
  type Book { title: String, author: String }
`;

export const resolvers = {
  Query: { books: () => books},
};