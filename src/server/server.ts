import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as helpers from './db/helpers';

import {bucketName, couchDbURL} from './server_configs';
import {graphiqlExpress, graphqlExpress} from 'apollo-server-express';

import cb from './db/dbutils';
import { schema } from './schemas/schema';

const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// start server
const port: number = 4000;
app.listen(port, () => {
  console.log(`Visit http://localhost:${port}/graphiql to run queries.`);
});
