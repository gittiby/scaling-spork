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

  private async executeQuery(qstr: N1qlQuery | string) : Promise<any> {
    return await queryAsync(qstr instanceof N1qlQuery ? qstr : toN1qlQuery(qstr), this.bucket);
  }

  private mapCbResponse<T extends TravelSampleType>(prom: Promise<any>, arg: T): any {
    return prom.then(json => json.map(apJson => arg.fromJson(apJson)))
      .catch(err => new Error(err));
  };

  // async fetch<T extends TravelSampleType>(query: N1qlQuery, arg: T) : Promise<any> {
  //   return this.mapCbResponse(this.executeQuery(query), arg)
  // }

  async fetchGeneric(query: N1qlQuery, type: string) :Promise<any> {
    const T: any = this.inferTypeFromString(type);
    return this.mapCbResponse(this.executeQuery(query), T);
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