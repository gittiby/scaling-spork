import * as couchbase from 'couchbase';

// @types/couchbase missing cluster authenticate function
declare module 'couchbase' {
    // tslint:disable-next-line:interface-name
    interface Cluster {
      authenticate(username: string, password: string): null;
   }
}