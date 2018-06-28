var express = require('express');
var {graphqlExpress,graphiqlExpress} = require('graphql-server-express');
var bodyParser = require('body-parser');
var schema = require('./schema.js');
var {execute, subscribe} = require('graphql');
var {createServer} = require('http');
var {SubscriptionServer} = require('subscriptions-transport-ws');

const PORT = 4000;
const server = express();
server.get('/', function (req, res) {  res.send('Hello World!');});
server.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
}));

const ws = createServer(server);
ws.listen(PORT, () => {
  console.log(`GraphQL Server is now running on http://localhost:${PORT}`);
  new SubscriptionServer({
     execute,
      subscribe,
      schema
    },{
      server: ws,
      path: '/subscriptions'
    }
  );
});
