import {Bucket, N1qlQuery} from 'couchbase';
import ITravelSampleType from '../models/TravelSample';
import {bucketName} from '../server_configs';
import dbConnection from '../db/dbutils';

export const prettyLog = (json: any): void => console.log(JSON.stringify(json, null, 2));

export const toN1qlQuery = (queryString: string): N1qlQuery => {
  const q: string = queryString.replace(/bucket/g, `\`${bucketName}\``);
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

export const executeQuery = async (qstr: N1qlQuery): Promise<any> => {
  return await queryAsync(qstr, dbConnection.bucket);
};

// ts async must have return type of promise? but then whats the point of async in ts?
export const mapCbResponse = async <T extends ITravelSampleType>(prom: Promise<any>, arg: T) => { 
  // if a entire document is expected (ex select *) it will be contained in a bucketname object
  // otherwise it will just be an object containing the requested fields (ex sellect name from)
  try {
    const res = await prom;
    if (res) {
      return res.map((apJson) => arg.fromJson(apJson));
    }
  } catch (err) {
    return new Error(err);
  }
};

export const toDayOfWeek = (dateStr: string) => {
  const date: Date = new Date(dateStr);
  return date.getDay();
};
