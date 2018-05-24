interface IGeoLocationJSON {
  alt: number;
  lat: number;
  lon: number;
}

export default class GeoLocation {
  public alt: number;
  public lat: number;
  public lon: number;
  constructor(la: number, lo: number, al: number) {
    this.lat = la;
    this.lon = lo;
    this.alt = al;
  }
}
