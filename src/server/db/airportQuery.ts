const findallAirportQuery = (queryStr: string): string => {
  const selectport = 'SELECT * FROM bucket WHERE';
  let queryPrep;
  switch (queryStr.length) {
    case 3: 
      queryPrep = `${selectport} faa = '${queryStr.toUpperCase()}'`; 
      break;
    case 4:
      queryPrep = `${selectport} icao = '${queryStr.toUpperCase()}'`; 
      break;
    default:
      // todo: this is now case sensitive, cant find documentation about how to use this function.lower in node
      // https://blog.couchbase.com/sql-for-json-query-interface-couchbase-mobile/#patternmatching
      queryPrep = `${selectport} airportname LIKE '${queryStr}%'`; 
      break;
  }
  return queryPrep;
};
export default findallAirportQuery;
