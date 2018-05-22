import { makeExecutableSchema } from 'graphql-tools';
import {AirportType} from './airport';
import {AirlineType} from './airline';
import {GeoLocationType} from './geolocation';
import {resolvers as AirportResolver} from '../schemas/airport';
import {resolvers as AirlineResolver} from '../schemas/airline';
import {merge} from 'lodash';

const resolvers = merge(AirportResolver, AirlineResolver);

const RootQuery = `
  type Query {
    airport(id: Int!): [Airport]
    airports: [Airport]
    airline(id: Int!): [Airline]
    airlines: [Airline]
  }
`
export const schema = makeExecutableSchema({
  typeDefs: [RootQuery, AirportType, GeoLocationType, AirlineType],
  resolvers: resolvers,
  logger: console
});