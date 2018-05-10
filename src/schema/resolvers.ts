import { books, authors, findAuthor } from '../test_data';
import { FortuneCookie } from '../retrieve_stuff_from_api';

const resolvers = {
  RootQuery: {
    books: () => books,
    // second property is always the arguments, first is obj ... see https://www.apollographql.com/docs/graphql-tools/resolvers#Resolver-function-signature
    author: (_, args) => findAuthor(args.name),
    authors: () => authors, 
    fortuneCookie: () => FortuneCookie.getOne(),
  },

  Author: {
    // define how to get the Author's book property
    book: (author) => books.filter(b => b.author == author.name) // must return iterable!
  },

};

export default resolvers;