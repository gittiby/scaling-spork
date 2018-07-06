import * as admin from 'firebase-admin';
import dotenv = require('dotenv');

const env = dotenv.config();
if (env.error) {
  console.log('error parsing .env');
}

export const initFCM = () => { 
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.PROJECT_ID,
      clientEmail: process.env.CLIENT_EMAIL,
      privateKey:  process.env.PRIVATE_KEY,
    }),
    databaseURL: process.env.DB_URL,
  });
 };

export const sendMsg = (msg: any, deviceToken: string) => { 
  if (!msg) {
    return;
  }
  msg.token = deviceToken;

  admin.messaging().send(msg)
    .then((response) => {
    // resp is a message id string
    console.log('successfully sent mssage', response);
  }).catch((error) => {
    console.log('error sending message', error);
  });
 };
