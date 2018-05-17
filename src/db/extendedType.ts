import * as couchbase from 'couchbase';

// @types/couchbase missing cluster authenticate function
declare module 'couchbase' {
    interface Cluster {
      authenticate(username: string, password: string): null;
   }
}