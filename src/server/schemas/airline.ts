import dbConnection from '../db/dbutils';
import * as dbhelp from '../db/helpers';
import Airline from '../models/Airline'; 

export const AirlineType = `
  type Airline {
    callsign: String
    country: String
    iata: String
    icao: String
    id: Int!
    name: String
    type: String
  }
`
const blankAirline = new Airline();

export const resolvers = {
  Query: {
    airlines: (_, args) => dbhelp.mapCbResponse(dbConnection.executeQuery(dbhelp.getByTypeQuery(blankAirline)), blankAirline),
    airline: (_, args) => dbhelp.mapCbResponse(dbConnection.executeQuery(dbhelp.getByIdQuery(args.id, blankAirline)), blankAirline),
  },
}