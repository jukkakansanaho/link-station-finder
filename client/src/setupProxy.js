/**
 *   Setup proxy middleware to handle API route traffic from react client to server.
 **/
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy(['/api', '/auth/google'], { target: 'http://localhost:5000' }));
};
