import gql from 'graphql-tag';
// import {watch} from './node_modules/rewire-core/index';
// import {Observe, observable, watch} from 'rewire-core';
// import { watch, observable, root } from 'rewire-core';
import { client } from 'rewire-graphql';

const gqlEndpoint: string = 'http://localhost:4000/graphql';
const rewireGqlClient = client(gqlEndpoint);

const query2 = gql`
  query stuff{
    test {
      name
      age
    }
  }
`;

const query1 = gql`
  query($type:String!, $numOfAirports: Int!) {
    searchType(type: $type, num: $numOfAirports) {
      ... on Airport{
        airportname
        country
      }
    }
  }
`;

// return promise
export const getit = () => {
  return rewireGqlClient.query(query1, { type: 'airport', numOfAirports: 4 });
  // return res.data.searchType;
};

// does some async bs
export const getitAsync = async () => {
  const p = await rewireGqlClient.query(query1, { type: 'airport', numOfAirports: 4 });
  return p;
};
