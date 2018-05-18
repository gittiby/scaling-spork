import * as express from 'express';
import * as bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { schema } from './schema/schema';
import {prettyLog} from './db/helpers';
import CouchConnection from './db/dbutils';
import {Airport} from './models/types';
import * as helpers from './db/helpers';
import {bucketName} from './server_configs';

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

const cb: CouchConnection = new CouchConnection('http://localhost:8091', bucketName);
// cb.testQuery();

cb.executeQuery(`SELECT * FROM \`${bucketName}\` WHERE type = 'airport' LIMIT 1`).then(json => {
  let apjson = json[0][bucketName];
  let ap: Airport = Airport.fromJson(apjson);
  ap.saymyname();
});

// Start server
const port: number = 4000
app.listen(port, () => {
  console.log(`Visit http://localhost:${port}/graphiql to run queries.`);
});

