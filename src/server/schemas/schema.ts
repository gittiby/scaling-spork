import * as dbhelp from '../db/helpers';
import dbConnection from '../db/dbutils';
import {makeExecutableSchema} from 'graphql-tools';
import {merge} from 'lodash';

import {AirlineType} from './airline';
import {AirportType} from './airport';
import {GeoLocationType} from './geolocation';
import {HotelTypes} from './hotel';
import {FlightType} from './flight';
import {RouteTypes} from './route';

import {resolvers as AirportResolvers} from '../schemas/airport';
import {resolvers as HotelResolvers} from '../schemas/hotel';
import {resolvers as FlightResolvers} from '../schemas/flight';

import findFlights from '../db/flightQuery';

const rootResolver = {
  Query: {
    searchId: (_, args) => {
      const r = dbConnection.getById(args.id);
      return r;
    },
    searchType: (_, args) => {
      const r = dbConnection.getByType(args.type, args.num);
      return r;
    },
    findAllAirports: (_, args) => {
      const r = dbConnection.findallAirport(args.nameOrIcaoOrFAa);
      return r;
    },
    findFlights: async (_, args) => {
      const r = await findFlights(args.from, args.to, args.leave);
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

const resolvers = merge(rootResolver, AirportResolvers, HotelResolvers);

const RootQuery = `
  union Result = Airport | Airline | Route | Hotel

  type Query {
    searchId(id: Int!): Result
    searchType(type: String!, num: Int!): [Result]
    findAllAirports(nameOrIcaoOrFAa: String!): [Airport]
    findFlights(from: String!, to: String!, leave: Int): [Flight]
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [RootQuery, AirportType, GeoLocationType, AirlineType, RouteTypes, HotelTypes, FlightType],
  resolvers,
  logger: console,
});
