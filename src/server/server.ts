import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as helpers from './db/helpers';

import {bucketName, couchDbURL} from './server_configs';
import {graphiqlExpress, graphqlExpress} from 'apollo-server-express';

import cb from './db/dbutils';
import { schema } from './schemas/schema';

const app = express();

app.use('/graphql', (req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'content-type, authorization, content-length, x-requested-with, accept, origin');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.header('Allow', 'POST, GET, OPTIONS')
  res.header('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
}, bodyParser.json(), graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); 

// start server
const port: number = 4000;
app.listen(port, () => {
  console.log(`Visit http://localhost:${port}/graphiql to run queries.`);
});
