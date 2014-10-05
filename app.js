var express = require('express'),
    fs = require('fs'),
    app = express();

var https = require('https'), // module for https
    fs = require('fs');

var options = {
    key: fs.readFileSync('/keys/server.key'),
    cert: fs.readFileSync('/keys/server.crt'),
    ca: fs.readFileSync('/keys/ca.crt'),
    requestCert: true,
    rejectUnauthorized: false
};

app.get('/', function(req, res){
    var file = __dirname + '/files' + req.url;
    res.download(file);
});

https.createServer(options, function (req, res) {
    if (!req.client.authorized) {
        res.writeHead(401, {"Content-Type": "application/json"});
        res.end('{"status": "denied"}');
    }

}).listen(443);
