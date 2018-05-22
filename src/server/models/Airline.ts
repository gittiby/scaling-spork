import {bucketName} from '../server_configs'
import TravelSampleType from './TravelSample'
interface AirlineJSON {
  callsign: string;
  country: string;
  iata: string;
  icao: string;
  id: number;
  name: string;
  type: string;
}

export default class Airline implements TravelSampleType{
  callsign: string;
  country: string;
  iata: string;
  icao: string;
  id: number;
  name: string;
  type: string;
  constructor() {
    this.type = 'airline';
  }

  fromJson(json: any): Airline {
    let apJson: AirlineJSON = json[bucketName];
    let airport = Object.create(Airline.prototype);
    return Object.assign(airport, apJson);
  }
}