import {bucketName} from '../server_configs';
import ITravelSampleType from './TravelSample';
interface IAirlineJSON {
  callsign: string;
  country: string;
  iata: string;
  icao: string;
  id: number;
  name: string;
  type: string;
}

export default class Airline implements ITravelSampleType{
  public callsign: string;
  public country: string;
  public iata: string;
  public icao: string;
  public id: number;
  public name: string;
  public type: string;
  constructor() {
    this.type = 'airline';
  }

  public fromJson(json: any): Airline {
    const apJson: IAirlineJSON = json[bucketName];
    const airport = Object.create(Airline.prototype);
    return Object.assign(airport, apJson);
  }
}
