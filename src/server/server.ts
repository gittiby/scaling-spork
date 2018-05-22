import * as express from 'express';
import * as bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { schema } from './schemas/schema';
import * as helpers from './db/helpers';
import cb from './db/dbutils';
import {bucketName, couchDbURL} from './server_configs';
import Airport from './models/Airport';

const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// start server
const port: number = 4000
app.listen(port, () => {
  console.log(`Visit http://localhost:${port}/graphiql to run queries.`);
});

