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
// import {resolvers as FlightResolvers} from '../schemas/flight';
import {resolvers as RouteResolvers} from '../schemas/route';

import findFlights from '../db/flightQuery';

const someTests = [
  { name: 'bob', age: 44, job: 'basketball player' },
  { name: 'mark', age: 22, job: 'plumber' },
  { name: 'arty', age: 43, job: 'electrician' },
  { name: 'paul', age: 13, job: 'student' },
  { name: 'john', age: 63, job: 'retired' },
  { name: 'josie', age: 35, job: 'teacher' },
  { name: 'henry', age: 85, job: 'being old' },
  { name: 'matt', age: 35, job: 'doctor' },
  { name: 'leah', age: 22, job: 'student' },
  { name: 'rachel', age: 35, job: 'dentist' },
];

const rootResolver = {
  Query: {
    test: (_, args) => someTests.filter((person) => person.name.indexOf(args.name) !== -1 ),
    searchId: (_, args) => {
      const r = dbConnection.getById(args.id);
      return r;
    },
    searchType: (_, args) => {
      const r = dbConnection.getByType(args.type, args.num);
      return r;
    },
    findAllAirports: (_, args) => {
      const r = dbConnection.findallAirport(args.cityOrIcaoOrFaa);
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

const resolvers = merge(rootResolver, AirportResolvers, HotelResolvers, RouteResolvers);

const RootQuery = `
  type Test {
    name: String
    age: Int
    job: String
  }

  union Result = Airport | Airline | Route | Hotel

  type Query {
    searchId(id: Int!): Result
    searchType(type: String!, num: Int!): [Result]
    findAllAirports(cityOrIcaoOrFaa: String!): [Airport]
    findFlights(from: String!, to: String!, leave: Int!): [Flight]
    test(name: String): [ Test ]
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [RootQuery, AirportType, GeoLocationType, AirlineType, RouteTypes, HotelTypes, FlightType],
  resolvers,
  logger: console,
});
