import GeoLocation from './GeoLocation';

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

export default class Airport {
  airportname: string
  city: string
  country: string
  faa: string
  geo: GeoLocation
  icao: String
  id: number
  tz: string;
  constructor(name: string, city: string, country: string, faa:string, geo: GeoLocation, icao: string, id: number, tz: string) {
    this.airportname = name;
    this.city = city;
    this.country = country;
    this.faa = faa;
    this.geo = geo;
    this.icao = icao;
    this.id = id;
    this.tz = tz;
  }
  static fromJson(json: AirportJSON) : Airport {
    let airport = Object.create(Airport.prototype);
    return Object.assign(airport, json);
  }
  saymyname() :void {
    console.log(this.airportname);
  }
}