import * as dbhelp from '../db/helpers';

import {AirlineType} from './airline';
import {AirportType} from './airport';
import {GeoLocationType} from './geolocation';
import {HotelTypes} from './hotel';
import {RouteTypes} from './route';
import dbConnection from '../db/dbutils';
import {makeExecutableSchema} from 'graphql-tools';
import {merge} from 'lodash';

// import {resolvers as AirportResolver} from '../schemas/airport';
// import {resolvers as AirlineResolver} from '../schemas/airline';
// import {resolvers as RouteResolver} from '../schemas/route';
// import {resolvers as HotelResolver} from '../schemas/hotel';

const rootResolver = {
  Query: {
    SearchById: (_, args) => {
      const r = dbConnection.getById(args.id);
      return r;
    },
    SearchByType: (_, args) => {
      const r = dbConnection.getByType(args.type, args.num);
      return r;
    },
  },
  Result: {
    __resolveType(obj, context, info) {
      let type = obj.type;
      type = `${type[0].toUpperCase()}${type.slice(1)}`; // improve this
      return type;
    },
  },
};

const resolvers = merge(rootResolver);

const RootQuery = `
  union Result = Airport | Airline | Route | Hotel

  type Query {
    SearchById(id: Int!): Result
    SearchByType(type: String!, num: Int!): [Result]
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [RootQuery, AirportType, GeoLocationType, AirlineType, RouteTypes, HotelTypes],
  resolvers,
  logger: console,
});
