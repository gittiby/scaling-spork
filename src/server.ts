import * as express from 'express';
import * as bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { schema } from './schema/schema';
import CouchConnection from './db/dbutils';

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

const cb = new CouchConnection('http://localhost:8091', 'travel-sample');
cb.testQuery();

// Start the server
app.listen(4000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});
