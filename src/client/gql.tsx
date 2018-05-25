import gql from 'graphql-tag';
import {graphqlEndpoint as gqlUrl} from '../../global_configs';
import {client as graphqlClient, GQL} from 'rewire-graphql';

export const query = gql`
  SearchByType(type: "airport", num:1){
      ... on Airport{
        airportname
        id
        country
        city
      }
    }
`;
const client = graphqlClient(gqlUrl);

export async function getit(q: any) {
  const results = await client.query(query, {size: 20}).then((res) => {
    console.log(res);
  }).catch((err) => console.log(err));
}
