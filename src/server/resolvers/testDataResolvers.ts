import {resolvers as BookResolver} from '../schemas/book'
import {resolvers as AuthorResolver} from '../schemas/author';
import {merge} from 'lodash';
import fetch from 'node-fetch';

const FortuneCookie = {
  getOne() {
    return fetch('http://fortunecookieapi.herokuapp.com/v1/cookie')
      .then(res => res.json())
      .then(res => {
        return res[0].fortune.message;
      });
  },
};

const cookieResolver = {
  Query: {
    fortuneCookie: () => FortuneCookie.getOne(),
  }
}

const resolvers = merge(cookieResolver, BookResolver, AuthorResolver);
export default resolvers;