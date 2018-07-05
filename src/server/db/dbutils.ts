import {Bucket, Cluster, CreateBucketOptions, N1qlQuery} from 'couchbase';
import {bucketName, couchDbURL} from '../server_configs';
import {prettyLog, queryAsync, toN1qlQuery, mapCbResponse, executeQuery} from './helpers';

import Airline from '../models/Airline';
import Airport from '../models/Airport';
import Hotel from '../models/Hotel';
import Route from '../models/Route';
import ITravelSampleType from '../models/TravelSample';
import findallAirport from './airportQuery';
import findFlight from './flightQuery';

class CouchConnection {
  public bucketName: string;
  public bucket: Bucket;
  private couchServerURL: string;
  private cluster: Cluster;

  constructor(url: string, db: string) {
    this.couchServerURL = url;
    this.bucketName = db;
    this.init();
  }

  public getByType(type: string, num: number) {
    const n1Query = this.getByTypeQuery(num, type);
    return this.fetchWithType(n1Query, type);
  }

  public getById(id: number) {
    const n1Query = this.getByIdQuery(id);
    return this.fetchWithoutType(n1Query).then((j) => j);
  }

  public findallAirport(airportOrIcao: string) {
    const n1Query = toN1qlQuery(findallAirport(airportOrIcao));
    return this.fetchWithType(n1Query, 'airport');
  }

  private init() {
    this.cluster = (new Cluster(this.couchServerURL));
    this.cluster.authenticate('admin', 'password');
    this.bucket = this.cluster.openBucket(this.bucketName);
  }

  private getByTypeQuery = (num: number, type: string): N1qlQuery =>
    toN1qlQuery(`SELECT * FROM bucket WHERE type = '${type}' LIMIT ${num}`)

  private getByIdQuery = (id: number): N1qlQuery =>
    toN1qlQuery(`SELECT * FROM bucket where id = ${id} and type='airport'`)

  private async fetchWithType(query: N1qlQuery, type: string): Promise<any> {
    const T: any = this.inferTypeFromString(type);
    return mapCbResponse(executeQuery(query), T);
  }

  private async fetchWithoutType(query: N1qlQuery): Promise<any> {
    return executeQuery(query).then((json) => {
      const firstElement = json && json[0] && json[0][bucketName];
      const type = firstElement.type;
      if (!type) {
        return null;
      }
      const T: any = this.inferTypeFromString(type);
      return T.fromJson(json[0]);
    });
  }

  private inferTypeFromString(type: string): any {
    let T: any;
    switch (type) {
      case 'airport':
      T = new Airport();
      break;
      case 'airline':
      T = new Airline();
      break;
      case 'route':
      T = new Route();
      break;
      case 'hotel':
      T = new Hotel();
    }
    return T;
  }
}

const dbConnection = new CouchConnection(couchDbURL, bucketName);
export default dbConnection;
