interface GeoLocationJSON {
  alt: number;
  lat: number;
  lon: number;
}

export default class GeoLocation {
  alt: number;
  lat: number;
  lon: number;
  constructor(la: number, lo: number, al: number) {
    this.lat = la;
    this.lon = lo;
    this.alt = al;
  }
}