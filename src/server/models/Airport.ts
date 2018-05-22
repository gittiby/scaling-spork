import GeoLocation from './GeoLocation';
import TravelSampleType from './TravelSample'
import {bucketName} from '../server_configs'

interface AirportJSON {
  airportname: string
  city: string
  country: string
  faa: string
  geo: GeoLocation
  icao: String
  id: number
  tz: string;
}

export default class Airport implements TravelSampleType {
  airportname: string
  city: string
  country: string
  faa: string
  geo: GeoLocation
  icao: String
  id: number
  tz: string;
  type: string;
  constructor() {
    this.type = 'airport';
  }

  fromJson(json: any) : Airport {
    let apJson: AirportJSON = json[bucketName];
    let airport = Object.create(Airport.prototype);
    return Object.assign(airport, apJson);
  }
}