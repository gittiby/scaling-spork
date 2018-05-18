import {Cluster, CreateBucketOptions, N1qlQuery, Bucket} from 'couchbase';
import {prettyLog, queryAsync, toN1qlQuery} from './helpers';

export default class CouchConnection {
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

  testQuery() {
    const q: string = 'SELECT * FROM `travel-sample` WHERE type = \'airport\' LIMIT 1'
    queryAsync(toN1qlQuery(q), this.bucket)
      .then(( response: JSON ) => prettyLog(response))
      .catch(err => console.log(err));
  } 

  async executeQuery(qstr: string) {
    return await queryAsync(toN1qlQuery(qstr), this.bucket);
  }

}

/* types
[
  {
    "type": "airline"
  },
  {
    "type": "airport"
  },
  {
    "type": "hotel"
  },
  {
    "type": "landmark"
  },
  {
    "type": "route"
  }
]
*/