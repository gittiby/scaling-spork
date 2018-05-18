import {Coordinate} from './coordinate';

export const AirportType = `
  type Airline {
    id: Int!
    name: String
    geo: [Coordinate]
    country: String
    city: String
    icao: String
  }
`