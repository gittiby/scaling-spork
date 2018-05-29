import gql from 'graphql-tag';
import {graphqlEndpoint as gqlUrl, graphqlEndpoint} from '../../global_configs';
// import {create} from 'rewire-graphql';
import create from './node_modules/rewire-graphql/client';

const gqlEndpoint: string = 'http://localhost:4000/graphql';

const client = create(gqlEndpoint);

const query2 = gql`
  query stuff{
    test {
      name
      age
    }
  }
`
const query1 = gql`
  query($type:String!, $numOfAirports: Int!) {
    SearchByType(type: $type, num: $numOfAirports) {
      ... on Airport{
        airportname
        country
      }
    }
  }
`

export async function getit() {
  const results = await client.query(query1, {type: 'airport', numOfAirports: 4}).then((res) => {
    console.log(res.data.SearchByType);
  }).catch((err) => console.log(err));
}
