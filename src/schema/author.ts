import Book from './book';

const Author = `
  type Author {
    name: String
    age: Int
    book: [Book]
  }
`;

// wrap this and all types it depends on to avoid string deduplication
export default [ Author, Book ];
// export default () => [ Author, Book ];