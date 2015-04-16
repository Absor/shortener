var url = require('url');

var idsByUrl = {};
var urlsById = {};

function shorten(link) {
    // Format urls to take care of trailing slashes and other weirdness
    var parsedLink = url.format(url.parse(link));
    if (idsByUrl[parsedLink]) {
        return idsByUrl[parsedLink];
    } else {
        var id = getNewId();
        // Should be unique but let's make sure
        while (urlsById[id]) {
            id = getNewId();
        }
        idsByUrl[parsedLink] = id;
        urlsById[id] = parsedLink;
        return id;
    }
}

function lengthen(id) {
    return urlsById[id];
}

function getNewId() {
    return (+new Date()).toString(36);
}

module.exports = {
    shorten: shorten,
    lengthen: lengthen
};
