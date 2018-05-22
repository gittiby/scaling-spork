import {bucketName} from '../server_configs'
import TravelSampleType from './TravelSample'

interface scheduleJSON {
  day: number;
  flight: string;
  utc: string
}

interface routeJSON {
  airline: string;
  airlineid: string;
  destinationairport: string;
  distance: number;
  equipment: string;
  id: number;
  schedule: Array<scheduleJSON>;
  type: string;
  stops: number;
  sourceairport: string
}

export default class Route implements TravelSampleType{
  airline: string;
  airlineid: string;
  destinationairport: string;
  distance: number;
  equipment: string;
  id: number;
  schedule: Array<scheduleJSON>
  readonly type: string;
  stops: number;
  sourceairport: string
  constructor() {
    this.type = 'route';
  }

  fromJson(json: any): Route {
    let apJson: routeJSON = json[bucketName];
    let airport = Object.create(Route.prototype);
    return Object.assign(airport, apJson);
  }
}