var express = require('express');
var app = module.exports = express();
var bodyParser = require('body-parser');
var url = require('url');

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

var idsByUrl = {};
var urlsById = {};

app.post('/shorten', function(req, res) {
    if (!req.body.link) {
        return res.status(400).end();
    }
    var parsedUrl = url.format(url.parse(req.body.link));

    if (idsByUrl[parsedUrl]) {

    } else {

    }

    return res
        .set('Content-Type', 'text/plain')
        .status(200)
        .send("jee");
});

app.get('/:id', function(req, res) {
    return res.status(404).end();
});

app.listen(3000);