import * as express from 'express';
import * as bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { schema } from './schemas/schema';
import CouchConnection from './db/dbutils';
import Airport from './models/Airport';
import * as helpers from './db/helpers';
import {bucketName, couchDbURL} from './server_configs';

const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

const cb: CouchConnection = new CouchConnection(couchDbURL, bucketName);

cb.executeQuery(`SELECT * FROM \`${bucketName}\` WHERE type = 'airport' LIMIT 2`)
  .then(json => json.forEach(apJson => Airport.fromJson(apJson[bucketName]).saymyname()))
  .catch(err => console.log(err));

// start server
const port: number = 4000
app.listen(port, () => {
  console.log(`Visit http://localhost:${port}/graphiql to run queries.`);
});

