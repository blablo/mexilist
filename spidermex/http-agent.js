var httpAgent = require('http-agent'),
    util = require('util');

var agent = httpAgent.create('www.google.com', ['finance', 'news', 'images']);

agent.addListener('next', function (err, agent) {
  console.log('Body of the current page: ' + agent.body);
  console.log('Response we saw for this page: ' + util.inspect(agent.response));

  // Go to the next page in the sequence
  agent.next();
});

agent.addListener('stop', function (err, agent) {
  console.log('the agent has stopped');
});

agent.start();