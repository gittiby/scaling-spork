import {Cluster, N1qlQuery, query, Bucket} from 'couchbase';

export default class CouchConnection {
  url: string
  bucket: Bucket
  constructor(url: string) {
    this.url = url;
  }
  loadDb() {
    this.bucket = (new Cluster(this.url));
    this.bucket.authenticate('Administrator', 'password');
    this.bucket.openBucket('travel-sample');
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
