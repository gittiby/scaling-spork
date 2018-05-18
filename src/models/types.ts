interface GeoLocationJSON {
  alt: number;
  lat: number;
  lon: number;
}

export class GeoLocation {
  alt: number;
  lat: number;
  lon: number;
  constructor(la: number, lo: number, al: number) {
    this.lat = la;
    this.lon = lo;
    this.alt = al;
  }
}

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

export class Airport {
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

interface AirlineJSON {
  callsign: string;
  country: string;
  icao: string;
  id: number;
  name: string;
}

export class Airline {
  callsign: string;
  country: string;
  icao: string;
  id: number;
  name: string;
  constructor(call: string, ca: string, ic: string, id: number, na: string) {
    this.callsign = call;
    this.country = ca;
    this.icao = ic;
    this.id = id;
    this.name = na;
  }
}