// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const fs = require("fs");

 exports.handler = function(event, context) {
   fs.writeFile("/tmp/test.txt", "testing", function (err) {
    if (err) {
        context.fail("writeFile failed: " + err);
    } else {
        context.succeed("writeFile succeeded");
    }
  });
 };

server.use(middlewares)
// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}))
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server
