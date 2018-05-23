import dbConnection from '../db/dbutils';
import * as dbhelp from '../db/helpers';
import Hotel from '../models/Hotel';

export const HotelTypes = `
  type Rating {
    Cleanliness: Int
    Location: Int
    Overall: Int
    Rooms: Int
    Service: Int
    Value: Int
  }
  type Review {
    author: String
    content: String
    date: String
    ratings: Rating
  }
  type Hotel {
    id: Int!
    address: String
    geo: [GeoLocation] 
    country: String
    city: String
    type: String
    description: String
    name: String
    reviews: [Review]
    vacancy: Boolean
    phone: String
  }
`
const hotel = new Hotel();

export const resolvers = {
  Query: {
    hotels: (_, args) => dbConnection.fetch(dbhelp.getByTypeQuery(args.howMany, hotel), hotel),
    hotel: (_, args) => dbConnection.fetch(dbhelp.getByIdQuery(args.id, hotel), hotel),
  },
  Hotel: {
    reviews: (hotel) => hotel.reviews,
    geo: (hotel) => [hotel.geo]
  },
  Review: {
    ratings: (review) => review.ratings
  }
}