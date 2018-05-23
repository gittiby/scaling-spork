import {bucketName} from '../server_configs'
import TravelSampleType from './TravelSample'
import GeoLocation from './GeoLocation';

interface ReviewJSON {
    author: string;
    content: string;
    date: string;
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
  // todo: fix reviews
  fromJson(json: any): Hotel {
    let apJson: HotelJSON = json[bucketName];
    let rJson: ReviewJSON = json[bucketName] && json[bucketName].reviews;
    console.log(rJson)
    let airport = Object.create(Hotel.prototype);
    let ret = Object.assign(airport, apJson);
    return ret;
  }
}