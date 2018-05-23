import {Cluster, CreateBucketOptions, N1qlQuery, Bucket} from 'couchbase';
import {bucketName, couchDbURL} from '../server_configs';
import TravelSampleType from '../models/TravelSample';
import {prettyLog, queryAsync} from './helpers';

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
    return await queryAsync(qstr instanceof N1qlQuery ? qstr : this.toN1qlQuery(qstr), this.bucket);
  }

  private mapCbResponse<T extends TravelSampleType>(prom: Promise<any>, arg: T): any {
    return prom.then(json => json.map(apJson => arg.fromJson(apJson)))
      .catch(err => new Error(err));
  };

  private toN1qlQuery(queryString: string) : N1qlQuery {
    return N1qlQuery.fromString(queryString.replace('bucket', `\`${bucketName}\``));
  }

  async fetch<T extends TravelSampleType>(query: N1qlQuery, arg: T) : Promise<any> {
    return this.mapCbResponse(this.executeQuery(query), arg)
  }
}

const dbConnection = new CouchConnection(couchDbURL, bucketName);
export default dbConnection;