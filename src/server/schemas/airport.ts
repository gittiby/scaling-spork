import * as dbhelp from '../db/helpers';

import Airport from '../models/Airport';
import {bucketName} from '../server_configs';
import dbConnection from '../db/dbutils';

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
`;

const airport = new Airport(); // need new instance of class to get type :|

export const resolvers = {
  Query: {
    // airports: (_, args) => dbConnection.fetch(dbhelp.getByTypeQuery(args.howMany, airport), airport),
    // airport: (_, args) => dbConnection.fetch(dbhelp.getByIdQuery(args.id, airport), airport),
  },
  Airport: {
    geo: (airport) => [airport.geo],
  },
}