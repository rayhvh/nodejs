var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hallo Wereld');
}).listen(8080);
console.log("Start een web server op port 8000");