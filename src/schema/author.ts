import {books, authors, findAuthor} from '../test_data';

export const AuthorType = `
  type Author {
    name: String
    age: Int
    book: [Book]
  }
`;

export const resolvers = {
  Query: {
    // second is always the args
    author: (_, args) => findAuthor(args.name),
    authors: () => authors
  },

  Author: {
    // how to get the Author's book property
    book: (author) => books.filter(b => b.author == author.name) // must return iterable!
  },
}

// wrap author and types it depends on to avoid string deduplication
// export default [ Author, ...BookType ];
// do it this way if circular dependencies exist
// export default () => [ Author, Book ];