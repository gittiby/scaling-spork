import {Cluster, CreateBucketOptions, N1qlQuery, Bucket} from 'couchbase';
import {bucketName, couchDbURL} from '../server_configs';
import TravelSampleType from '../models/TravelSample';
import {prettyLog, queryAsync, toN1qlQuery} from './helpers';

import Airline from '../models/Airline';
import Airport from '../models/Airport';
import Route from '../models/Route';
import Hotel from '../models/Hotel';

class CouchConnection {
  couchServerURL: string
  bucketName: string
  cluster: Cluster
  bucket: Bucket

  constructor(url: string, db: string) {
    this.couchServerURL = url;
    this.bucketName = db;
    this.init();
  }

  init() {
    this.cluster = (new Cluster(this.couchServerURL));
    this.cluster.authenticate('Administrator', 'password');
    this.bucket = this.cluster.openBucket(this.bucketName);
  }

  private async executeQuery(qstr: N1qlQuery) : Promise<any> {
    return await queryAsync(qstr, this.bucket);
  }

  private getByTypeQuery = (num: number, type: string) : N1qlQuery => toN1qlQuery(`SELECT * FROM bucket WHERE type = '${type}' LIMIT ${num}`);

  private getByIdQuery = (id: number) : N1qlQuery => toN1qlQuery(`SELECT * FROM bucket where id = ${id} and type='airport'`);

  private mapCbResponse<T extends TravelSampleType>(prom: Promise<any>, arg: T): any {
    return prom.then(json => json.map(apJson => arg.fromJson(apJson)))
      .catch(err => new Error(err));
  };

  getByType(type: string, num: number) {
    let n1Query = this.getByTypeQuery(num, type);
    return this.fetchWithType(n1Query, type);
  }

  getById(id: number) {
    let n1Query = this.getByIdQuery(id);
    return this.fetchWithoutType(n1Query).then(j => j);
  }

  private async fetchWithType(query: N1qlQuery, type: string) :Promise<any> {
    const T: any = this.inferTypeFromString(type);
    return this.mapCbResponse(this.executeQuery(query), T);
  }

  private async fetchWithoutType(query: N1qlQuery) :Promise<any> {
    return this.executeQuery(query).then( json => {
      let firstElement = json && json[0] && json[0][bucketName];
      let type = firstElement.type;
      if (!type) return null;
      const T: any = this.inferTypeFromString(type);
      return T.fromJson(json[0]);
    })
  }

  private inferTypeFromString(type: string): any {
    let T: any;
    switch (type)
    {
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