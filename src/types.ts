export class GeoLocation {
  lat: number;
  lon: number;
  alt: number;
  constructor(la: number, lo: number, al: number) {
    this.lat = la;
    this.lon = lo;
    this.alt = al;
  }
}
export class Airport {
  id: number
  name: string
  geo: Geolocation
  country: String
  icao: String
  constructor(id: number, n: string, geo: Geolocation, ca: string, ic: string) {
    this.id = id;
    this.name = n;
    this.geo = geo;
    this.country = ca;
    this.icao = ic;
  }
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