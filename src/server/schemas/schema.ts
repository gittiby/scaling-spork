import { makeExecutableSchema } from 'graphql-tools';
import {AirportType} from './airport';
import {AirlineType} from './airline';
import {GeoLocationType} from './geolocation';
import {RouteType} from './route';
import {HotelType} from './hotel';
import {resolvers as AirportResolver} from '../schemas/airport';
import {resolvers as AirlineResolver} from '../schemas/airline';
import {resolvers as RouteResolver} from '../schemas/route';
import {resolvers as HotelResolver} from '../schemas/hotel';
import {merge} from 'lodash';

const resolvers = merge(AirportResolver, AirlineResolver, RouteResolver, HotelResolver);

const RootQuery = `
  type Query {
    airport(id: Int!): [Airport]
    airports: [Airport]
    airline(id: Int!): [Airline]
    airlines: [Airline]
    route(id: Int!): [Route]
    routes: [Route]
    hotel(id: Int!): [Hotel]
    hotels: [Hotel]
  }
`
export const schema = makeExecutableSchema({
  typeDefs: [RootQuery, AirportType, GeoLocationType, AirlineType, RouteType, HotelType],
  resolvers: resolvers,
  logger: console
});