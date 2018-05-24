import {Bucket, N1qlQuery} from 'couchbase';

import {bucketName} from '../server_configs';

export const prettyLog = (json: any): void => console.log(JSON.stringify(json, null, 2));

export const toN1qlQuery = (queryString: string): N1qlQuery => {
  const q: string = queryString.replace('bucket', `\`${bucketName}\``);
  return N1qlQuery.fromString(q);
};

export const queryAsync = (param: N1qlQuery, bucket: Bucket): Promise<any> => {
  return new Promise((resolve, reject) => {
    bucket.query(param, (err, data) => {
      if (err !== null) {
        return reject(err);
      }
      resolve(data);
    });
  });
};
