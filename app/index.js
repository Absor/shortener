var express = require('express');
var app = module.exports = express();
var bodyParser = require('body-parser');
var urlService = require('./url-service');

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/shorten', function(req, res) {
    if (!req.body.link) {
        return res.status(400).end();
    }

    return res
        .set('Content-Type', 'text/plain')
        .status(200)
        .send(urlService.shorten(req.body.link));
});

app.get('/:id', function(req, res) {
    var url = urlService.lengthen(req.params.id);
    if (url) {
        return res.redirect(301, url);
    }
    return res.status(404).end();
});

app.listen(process.env.PORT || 3000);