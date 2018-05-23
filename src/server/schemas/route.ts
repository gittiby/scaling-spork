import dbConnection from '../db/dbutils';
import * as dbhelp from '../db/helpers';
import Route from '../models/Route';

export const RouteTypes = `
  type Schedule {
    day: Int
    flight: String
    utc: String
  }

  type Route {
  airline: String
  airlineid: String
  destinationairport: String
  distance: Float
  equipment: String
  id: Int
  schedule: [Schedule]
  type: String
  stops: Int
  sourceairport: String
  }
`
const route = new Route();
export const resolvers = {
  Query: {
    routes: (_, args) => dbConnection.fetch(dbhelp.getByTypeQuery(route), route),
    route: (_, args) => dbConnection.fetch(dbhelp.getByIdQuery(args.id, route), route),
  },
}