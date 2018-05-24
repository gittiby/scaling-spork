import GeoLocation from './GeoLocation';
import ITravelSampleType from './TravelSample';
import {bucketName} from '../server_configs';

interface IRatingJSON {
  Cleanliness: number;
  Location: number;
  Overall: number;
  Rooms: number;
  Service: number;
  Value: number;
  'Business service (e.g., internet access)': number;
  'Check in / front desk': number;
}
interface IReviewJSON {
    author: string;
    content: string;
    date: string;
    ratings: IRatingJSON;
}

interface IHotelJSON {
  id: number;
  address: string;
  reviews: [IReviewJSON];
  country: string;
  city: string;
  type: string;
  description: string;
  name: string;
  vacancy: boolean;
  phone: string;
  geo: GeoLocation;
}

export default class Hotel implements ITravelSampleType {
  public id: number;
  public address: string;
  public reviews: [IReviewJSON];
  public geo: GeoLocation;
  public country: string;
  public city: string;
  public type: string;
  public description: string;
  public name: string;
  public vacancy: boolean;
  public phone: string;

  constructor() {
    this.type = 'hotel';
  }
  public fromJson(json: any): Hotel {
    const hotelJson: IHotelJSON = json[bucketName];
    const hotel = Object.create(Hotel.prototype);
    return Object.assign(hotel, hotelJson);
  }
}
