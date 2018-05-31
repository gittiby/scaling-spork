import {toN1qlQuery, executeQuery, mapCbResponse, toDayOfWeek} from '../db/helpers';
import dbConnection from '../db/dbutils';
import { exec } from 'child_process';

const findFlights = async (from: string, to: string, leave: number /* ,callback handler: fn*/): Promise<any> => {
  let queryPrep = `SELECT faa as fromAirport FROM bucket WHERE airportname = '${from}' UNION SELECT faa as toAirport FROM bucket WHERE airportname = '${to}'`;
  let n1Query = toN1qlQuery(queryPrep);

  const faasResult = await executeQuery(n1Query);
  if (faasResult.length !== 2) {
    throw new Error('error: unable to find one of the airports');
  }
  const fromAirport: string = faasResult.find((ap) => ap.fromAirport).fromAirport;
  const toAirport: string = faasResult.find((ap) => ap.toAirport).toAirport;

  queryPrep = `SELECT a.name, s.flight, s.utc, r.sourceairport, r.destinationairport, r.equipment FROM bucket r UNNEST r.schedule s JOIN bucket a ON KEYS r.airlineid WHERE \
    r.sourceairport= '${fromAirport}' AND r.destinationairport='${toAirport}' AND s.day= ${leave} ORDER BY a.name`;
  n1Query = toN1qlQuery(queryPrep);

  return executeQuery(n1Query);
};

export default findFlights;

// SELECT a.name, s.flight, s.utc, r.sourceairport, r.destinationairport, r.equipment 
// FROM `travel-sample` r 
// UNNEST r.schedule s 
// JOIN `travel-sample` a 
// ON KEYS r.airlineid 
// WHERE r.sourceairport='SEA' AND r.destinationairport='MCO' AND s.day=6 
// ORDER BY a.name
