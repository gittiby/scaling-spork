import {Cluster, CreateBucketOptions, N1qlQuery, Bucket, ClusterManager} from 'couchbase';

export default class CouchConnection {
  url: string
  db: string
  cluster: Cluster
  bucket: Bucket

  constructor(url: string, db: string) {
    this.url = url;
    this.db  = db;
    this.init();
  }
  init() {
    this.cluster = (new Cluster(this.url));
    this.cluster.authenticate('Administrator', 'password');
    this.bucket = this.cluster.openBucket(this.db);
  }
  testQuery() {
    const n1ql = 'SELECT callsign FROM `travel-sample` LIMIT 10'
    const query = N1qlQuery.fromString(n1ql);
    this.bucket.query(query, null, (err, result) => {
      if (err) console.log(err);
      else console.log(result);
    });
  }
  query() {

  }
  update() {

  }
}
