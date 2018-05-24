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
`;

const airline = new Airline();

export const resolvers = {
  Query: {
    // airlines: (_, args) => dbConnection.fetch(dbhelp.getByTypeQuery(args.howMany, airline), airline),
    // airline: (_, args) => dbConnection.fetch(dbhelp.getByIdQuery(args.id, airline), airline)
  },
};
