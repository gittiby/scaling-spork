import {N1qlQuery, Bucket} from 'couchbase';

export const prettyLog = (json: any) : void => console.log(JSON.stringify(json, null, 2));

export const queryAsync = (param: N1qlQuery, bucket: Bucket) : Promise<any> => {
  return new Promise((resolve, reject) => {
    bucket.query(param, (err, data) => {
      if (err !== null) return reject(err);
      resolve(data);
    })
  })
}

export const toN1qlQuery = (queryString: string) : N1qlQuery => N1qlQuery.fromString(queryString);
