var httpAgent = require('http-agent'),
    jsdom = require('jsdom');

var agent = httpAgent.create('www.google.com', ['finance', 'news', 'images']);

agent.addListener('next', function (err, agent) {
  jsdom.env({
    html: agent.body,
    scripts: [
      'http://code.jquery.com/jquery-1.5.min.js'
    ]
  }, function (err, window) {
    var $ = window.jQuery;
    
    // jQuery is now loaded on the jsdom window created from 'agent.body'
    console.log($('body').html());
    
    agent.next();
  });
});

agent.addListener('stop', function (agent) {
  console.log('the agent has stopped');
});

agent.start();