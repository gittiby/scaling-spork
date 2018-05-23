import { makeExecutableSchema } from 'graphql-tools';
import {AirportType} from './airport';
import {AirlineType} from './airline';
import {GeoLocationType} from './geolocation';
import {RouteTypes} from './route';
import {HotelTypes} from './hotel';
import {resolvers as AirportResolver} from '../schemas/airport';
import {resolvers as AirlineResolver} from '../schemas/airline';
import {resolvers as RouteResolver} from '../schemas/route';
import {resolvers as HotelResolver} from '../schemas/hotel';
import {merge} from 'lodash';

import dbConnection from '../db/dbutils';
import * as dbhelp from '../db/helpers';


// const rootResolver = {
//   Query: {
//     byId: (_, args) => {
//       let type = args.type;
//       let id = args.id;
//       return dbConnection.fetch(dbhelp.getByTypeQuery(args.howMany, type), type);
//     }
//   }
// }

const resolvers = merge(AirportResolver, AirlineResolver, RouteResolver, HotelResolver, /* rootResolver */);

const RootQuery = `
  #interface SearchableType {
  #  type: String!
  #}
  type Query {
    airport(id: Int!): [Airport]
    airports(howMany: Int!): [Airport]
    airline(id: Int!): [Airline]
    airlines(howMany: Int!): [Airline]
    route(id: Int!): [Route]
    routes(howMany: Int!): [Route]
    hotel(id: Int!): [Hotel]
    hotels(howMany: Int!): [Hotel]
    #byId(type: String!, id: Int!): [Searchable]
  }
`
export const schema = makeExecutableSchema({
  typeDefs: [RootQuery, AirportType, GeoLocationType, AirlineType, RouteTypes, HotelTypes],
  resolvers: resolvers,
  logger: console
});