import {N1qlQuery, Bucket} from 'couchbase';
import TravelSampleType from '../models/TravelSample'
import {bucketName} from '../server_configs'

export const prettyLog = (json: any) : void => console.log(JSON.stringify(json, null, 2));
export const toN1qlQuery = (queryString: string) : N1qlQuery => N1qlQuery.fromString(queryString.replace('bucket', `\`${bucketName}\``));

export const queryAsync = (param: N1qlQuery, bucket: Bucket) : Promise<any> => {
  return new Promise((resolve, reject) => {
    bucket.query(param, (err, data) => {
      if (err !== null) return reject(err);
      resolve(data);
    })
  })
}

export const genericGetByIdQuery = (id: number, type: string) : N1qlQuery => toN1qlQuery(`SELECT * FROM bucket WHERE type = '${type}' and id = ${id}` );
export const genericGetByTypeQuery = (num: number, type: string) : N1qlQuery => toN1qlQuery(`SELECT * FROM bucket WHERE type = '${type}' LIMIT ${num}`);

export const getByIdQuery = (id: number) : N1qlQuery => toN1qlQuery(`SELECT * FROM bucket where id = ${id}`);
export const getByTypeQuery = <T extends TravelSampleType>(howmany: number, arg: T) : N1qlQuery => toN1qlQuery(`SELECT * FROM bucket WHERE type = '${arg.type}' LIMIT ${howmany}`);