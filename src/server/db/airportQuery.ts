// queries airports based on FAA or ICAO
// some entries missing FAA..ex ICAOs like LFAQ, LFBI, LFBN
const findallAirportQuery = (queryStr: string): string => {
  const selectport = 'SELECT * FROM bucket WHERE';
  let queryPrep;
  switch (queryStr.length) {
    case 0: 
      break;
    case 3: 
      queryPrep = `${selectport} faa = '${queryStr.toUpperCase()}' limit 10`; 
      break;
    case 4:
      queryPrep = `${selectport} icao = '${queryStr.toUpperCase()}' limit 10`; 
      break;
    default:
      // todo: this is now case sensitive, cant find documentation about how to use this function.lower in node
      // https://blog.couchbase.com/sql-for-json-query-interface-couchbase-mobile/#patternmatching
      queryPrep = `${selectport} type = 'airport' and city LIKE '${queryStr}%' limit 10`; 
      break;
  }
  return queryPrep;
};
export default findallAirportQuery;
