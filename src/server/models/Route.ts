import {bucketName} from '../server_configs';
import ITravelSampleType from './TravelSample';

interface IScheduleJSON {
  day: number;
  flight: string;
  utc: string;
}

interface IRouteJSON {
  airline: string;
  airlineid: string;
  destinationairport: string;
  distance: number;
  equipment: string;
  id: number;
  schedule: [IScheduleJSON];
  type: string;
  stops: number;
  sourceairport: string;
  flight: string;
  name: string;
}

export default class Route implements ITravelSampleType {
  public airline: string;
  public airlineid: string;
  public destinationairport: string;
  public distance: number;
  public equipment: string;
  public id: number;
  public schedule: [ IScheduleJSON ];
  public readonly type: string;
  public stops: number;
  public sourceairport: string;
  constructor() {
    this.type = 'route';
  }
  public fromJson(json: any): Route {
    const apJson: IRouteJSON = json[bucketName];
    const route = Object.create(Route.prototype);
    const r = Object.assign(route, apJson);
    return r;
  }
}
