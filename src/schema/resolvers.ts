import {Book, books, authors, findAuthor, testDb } from '../test_data';
import { FortuneCookie } from '../retrieve_stuff_from_api';

const resolvers = {
  Query: {
    books: () => books,
    // second is always the args
    author: (_, args) => findAuthor(args.name),
    authors: () => authors, 
    fortuneCookie: () => FortuneCookie.getOne(),
  },

  Author: {
    // how to get the Author's book property
    book: (author) => books.filter(b => b.author == author.name) // must return iterable!
  },

  Mutation: {
    increaseReadCount: (root, args) => {
      const book: Book = books.find(book => book.id === args.id);
      if (!book) throw new Error(`couldn't find book with id ${args.id}`);
      book.readCount ++;
      return book;
    }
  }
};

export default resolvers;