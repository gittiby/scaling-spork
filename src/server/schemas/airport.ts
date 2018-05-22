import dbConnection from '../db/dbutils';
import Airport from '../models/Airport';
import {bucketName} from '../server_configs';
import * as dbhelp from '../db/helpers';

/* airport resolver doesn't need to know about GeoLocation schema, 
but makeExecutableSchema needs to know all typesdefs */

export const AirportType = `
  type Airport {
    id: Int!
    airportname: String
    geo: [GeoLocation] 
    country: String
    city: String
    icao: String
    faa: String
    tz: String
    type: String
  }
`
const blankAirport = new Airport(); // need new instance of class to get type :|

export const resolvers = {
  Query: {
    airports: (_, args) => dbhelp.mapCbResponse(dbConnection.executeQuery(dbhelp.getByTypeQuery(blankAirport)), blankAirport),
    airport: (_, args) => dbhelp.mapCbResponse(dbConnection.executeQuery(dbhelp.getByIdQuery(args.id, blankAirport)), blankAirport),
  },
  Airport: {
    geo: (airport) => [airport.geo],
  },
}