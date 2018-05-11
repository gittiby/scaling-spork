import { FortuneCookie } from '../retrieve_stuff_from_api';
import {resolvers as BookResolver} from './book';
import {resolvers as AuthorResolver} from './author';
import {merge} from 'lodash';

const randomResolver = {
  Query: {
    fortuneCookie: () => FortuneCookie.getOne(),
  }
}

const resolvers = merge(randomResolver, BookResolver, AuthorResolver);
export default resolvers;