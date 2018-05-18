interface AirlineJSON {
  callsign: string;
  country: string;
  icao: string;
  id: number;
  name: string;
}

export default class Airline {
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