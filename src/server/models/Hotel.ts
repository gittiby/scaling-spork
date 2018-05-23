import {bucketName} from '../server_configs'
import TravelSampleType from './TravelSample'
import GeoLocation from './GeoLocation';

interface RatingJSON {
  Cleanliness: number;
  Location: number;
  Overall: number;
  Rooms: number;
  Service: number;
  Value: number;
  "Business service (e.g., internet access)": number
  "Check in / front desk": number
}
interface ReviewJSON {
    author: string;
    content: string;
    date: string;
    ratings: RatingJSON;
}

interface HotelJSON {
  id: number;
  address: string;
  reviews: [ReviewJSON];
  country: string;
  city: string;
  type: string;
  description: string;
  name: string;
  vacancy: boolean;
  phone: string;
  geo: GeoLocation;
}

export default class Hotel implements TravelSampleType {
  id: number;
  address: string;
  reviews: [ReviewJSON];
  geo: GeoLocation;
  country: string;
  city: string;
  type: string;
  description: string;
  name: string;
  vacancy: boolean;
  phone: string;

  constructor() {
    this.type = 'hotel';
  }
  fromJson(json: any): Hotel {
    let hotelJson: HotelJSON = json[bucketName];
    let hotel = Object.create(Hotel.prototype);
    return Object.assign(hotel, hotelJson);
  }
}