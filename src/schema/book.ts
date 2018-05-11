const Book = `
  type Book {
    title: String,
    author: String
    readCount: Int
    id: Int!
  }

  type Mutation {
    # takes a single param id, returns a Book
    increaseReadCount ( id: Int! ) : Book
  }
`;

export default [Book];