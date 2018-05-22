import {N1qlQuery, Bucket} from 'couchbase';
import Airline from '../models/Airline'
import TravelSampleType from '../models/TravelSample'
import {bucketName} from '../server_configs'

export const prettyLog = (json: any) : void => console.log(JSON.stringify(json, null, 2));

export const queryAsync = (param: N1qlQuery, bucket: Bucket) : Promise<any> => {
  return new Promise((resolve, reject) => {
    bucket.query(param, (err, data) => {
      if (err !== null) return reject(err);
      resolve(data);
    })
  })
}

export const toN1qlQuery = (queryString: string) : N1qlQuery => N1qlQuery.fromString(queryString.replace('bucket', `\`${bucketName}\``));
export const getByIdQuery = <T extends TravelSampleType>(id: number, arg: T) : N1qlQuery => toN1qlQuery(`SELECT * FROM bucket WHERE type = '${arg.type}' and id = ${id}` );
export const getByTypeQuery = <T extends TravelSampleType>(arg: T) : N1qlQuery => toN1qlQuery(`SELECT * FROM bucket WHERE type = '${arg.type}' LIMIT 10`);

export const mapCbResponse = <T extends TravelSampleType>(promise: Promise<any>, arg: T): any => {
  return promise.then(json => json.map(apJson => arg.fromJson(apJson)))
                .catch(err => new Error(err));
};

