var request = require('superagent');
var should = require('should');
var url = require('url');

require('../app/index.js');
var baseUrl = "http://localhost:3000";

describe('POST /shorten', function() {

    it('Should fail without link parameter', function(done) {
        request
            .post(baseUrl + '/shorten')
            .end(function(err, res) {
                res.status.should.be.exactly(400);
                done();
            });
    });

    it('Should fail with link parameter and wrong content-type', function(done) {
        request
            .post(baseUrl + '/shorten')
            .send({link: "http://www.test.com"})
            .end(function(err, res) {
                res.status.should.be.exactly(400);
                done();
            });
    });

    it('Should succeed with link parameter and right content-type', function(done) {
        request
            .post(baseUrl + '/shorten')
            .type('form')
            .send({link: "http://www.test.com"})
            .end(function(err, res) {
                res.status.should.be.exactly(200);
                done();
            });
    });

    it('Should return the id for the shortened link in text/plain format', function(done) {
        request
            .post(baseUrl + '/shorten')
            .type('form')
            .send({link: "http://www.test.com"})
            .end(function(err, res) {
                res.status.should.be.exactly(200);
                res.header['content-type'].should.match(/text\/plain/);
                res.text.should.be.ok;
                done();
            });
    });
});

describe('GET /:id', function() {

    it('Returns a 404 error if no link stored with given id', function(done) {
        request
            .get(baseUrl + '/doesntexist')
            .end(function(err, res) {
                res.status.should.be.exactly(404);
                done();
            });
    });

    describe('After a succesful POST request to /shorten has been done', function() {

        var urlToShorten = "http://test.url";
        var id;

        before(function(done) {
            request
                .post(baseUrl + '/shorten')
                .type('form')
                .send({link: urlToShorten})
                .end(function(err, res) {
                    id = res.text;
                    done();
                });
        });

        it('Should redirect (301) the user agent to a previously stored URL', function(done) {
            request
                .get(baseUrl + '/' + id)
                .redirects(0) // do not follow redirects so we get the info
                .end(function(err, res) {
                    res.status.should.be.exactly(301);
                    var formatShortened = url.format(url.parse(urlToShorten));
                    var formatRedirect = url.format(url.parse(res.header['location']));
                    formatShortened.should.match(formatRedirect);
                    done();
                });
        });

        it('Should give the same id when requesting with the same URL', function(done) {
            request
                .post(baseUrl + '/shorten')
                .type('form')
                .send({link: urlToShorten})
                .end(function(err, res) {
                    res.text.should.be.exactly(id);
                    done();
                });
        });
    });
});