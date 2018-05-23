## a simple app for learning ws_next tools/frameworks:
### setup server
1. `cd ./src/server`
1. run `yarn`
1. [setup couchbase server via docker](https://hub.docker.com/r/couchbase/server/)
   1. currently using the server sample database __travel-sample__
1. `npm run startserver`
### setup client
1. `cd ./src/client`
1. run `yarn`
1. `npm run startclient`
### this uses:
<!-- 1. gRPC -->
<!-- 1. ksql -->
1. graphql
1. rewire
1. couchdb
<!-- 1. kafka - _librdkafka_? -->
<!-- 1. kubernetes -->
<!-- 1. elasticsearch? -->
### todo:
* fix client/ parcel setup
* running client/server from one script?