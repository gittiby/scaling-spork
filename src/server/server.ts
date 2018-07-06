import * as bodyParser from 'body-parser';
import * as express from 'express';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { schema } from './schemas/schema';
import { initFCM, sendMsg } from './mobileNotifications';

const app = express();

initFCM();
setTimeout(() => {
  const fcmKey = 'dwgV9yDjtJE:APA91bHa4ftOrzocKM2_cUFbqDFMZ7lydNti1ux5QqcJ5uriQwot0D86AhWC693PMO7kefnjzyQo65RuQa23kxjzxqRCXRS_AswLe32xwujH9-h6Uai582nuhUSlzKbXt2CT_tGgoLQ7xp_l7ujVJJ88Dr5H5e9Gow';
  const msg = {
    data: {
      score: 'hello!',
      time: '2:45',
    },
  };
  sendMsg(msg, fcmKey);
}, 3000);

app.use('/graphql', (req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'content-type, authorization, content-length, x-requested-with, accept, origin');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.header('Allow', 'POST, GET, OPTIONS');
  res.header('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
}, bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// start server
const port: number = 4000;
app.listen(port, () => {
  console.log(`Visit http://localhost:${port}/graphiql to run queries.`);
});
