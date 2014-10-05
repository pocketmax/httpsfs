var fs = require('fs'),
    http = require('http'),
    https = require('https'),
    express = require('express'),
    app = express();

var options = {
    key: fs.readFileSync('/keys/server.key'),
    cert: fs.readFileSync('/keys/server.crt'),
    ca: fs.readFileSync('/keys/ca.crt'),
    requestCert: true,
    rejectUnauthorized: false
};

var server = https.createServer(options, app).listen(443,function() {
    console.log("express up!");
});

app.get('/', function(req, res){
    if (!req.client.authorized) {
        res.writeHead(401, {"Content-Type": "application/json"});
        res.end('{"status": "denied"}');
    }
    var file = __dirname + '/files' + req.url;
    res.download(file);
});
