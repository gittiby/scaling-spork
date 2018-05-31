## a simple app using couchbase server's travel-sample database for learning ws_next tools
### setup server
1. `cd ./src/server`
1. run `yarn`
1. [setup couchbase server via docker](https://hub.docker.com/r/couchbase/server/)
   1. currently using the server sample database __travel-sample__
1. `npm run startserver`
### setup client
1. run `yarn`
1. `node ./fuse.js`
### tools/frameworks this app uses:
<!-- 1. gRPC -->
<!-- 1. ksql -->
1. graphql
1. rewire
1. couchdb
<!-- 1. kafka - _librdkafka_? -->
<!-- 1. kubernetes -->
<!-- 1. elasticsearch? -->
### todo:
* running client/server from one script?
* make frontend
   * component list:
      * general label: input
      * input for findall
      * input for date picker
      * checkbox like thing
      * normal text box input
      * page to view available flights returned.
* add basic auth, using new bucket for users 
* allow users to save selected routes

--------
#### Notes ####
A note about promises that I seem to keep messing up:
If you have a function declared as async, it __always__ returns a promise.

```javascript
const someAsync = async () => {
      const ret = await stuff(); // stuff is some asyncronous call
      return ret;
}

/* if you call someAsync you won't get what you want, you'll have to resolve it again.
Should just have the function return a promise in the first place */

// can call await on this if callee is an async function
const someAsync = () : Promise<any> => {
      return stuff();
}

// caller of this will still have to provide resolve/reject handlers
const someOtherFunction = async () => {
      const ret = await someAsync();
      return ret;
}
```