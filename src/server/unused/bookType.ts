import {Author, authors} from './Author';
import {Book, books} from './Book';

export const BookType = `
  type Book {
    title: String,
    author: String
    readCount: Int
    id: Int!
  }

  type Mutation {
    # takes a single param id, returns a Book
    increaseReadCount ( id: Int! ) : Book
    # changeAuthor(id: Int!, author: Author) :
  }
`;

export const resolvers = {
  Query: {
    books: () => books,
  },

  Mutation: {
    increaseReadCount: (root, args) => {
      const book: Book = books.find((b) => b.id === args.id);
      if (!book) {
        throw new Error(`couldn't find book with id ${args.id}`);
      }
      book.readCount ++;
      return book;
    },

    // changeAuthor: (root, args) => {
    //   const book: Book = books.find(book => book.id === args.id);
    //   if (!book) throw new Error(`couldn't find book with id ${args.id}`);

    // }
  },

  Author: {
  },
};
