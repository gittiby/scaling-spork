const findallAirportQuery = (queryStr: string) : string => {
  const selectport = 'SELECT airportname FROM bucket WHERE';
  let queryPrep;
  switch(queryStr.length) {
    case 3: 
      queryPrep = `${selectport} faa = '${queryStr.toUpperCase()}'`; 
      break;
    case 4:
      queryPrep = `${selectport} icao = '${queryStr.toUpperCase()}'`; 
      break;
    default:
      queryPrep = `${selectport} WHERE airportname LIKE '${queryStr.toUpperCase()}%'`; 
      break;
  }
  return queryPrep;
}
export default findallAirportQuery;