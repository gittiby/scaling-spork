import {Cluster, CreateBucketOptions, N1qlQuery, Bucket} from 'couchbase';
import {bucketName, couchDbURL} from '../server_configs';
import {prettyLog, queryAsync, toN1qlQuery} from './helpers';
import Airline from '../models/Airline'

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

  async executeQuery(qstr: N1qlQuery | string) : Promise<any> {
    return await queryAsync(qstr instanceof N1qlQuery ? qstr : toN1qlQuery(qstr), this.bucket);
  }
}

const dbConnection = new CouchConnection(couchDbURL, bucketName);
export default dbConnection;