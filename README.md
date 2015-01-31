[![Build Status](https://travis-ci.org/Absor/shortener.svg)](https://travis-ci.org/Absor/shortener)

# URL shortener service

## API

### POST /shorten

**Accepts** "Content-Type: application/x-www-form-urlencoded"

**Parameters**: Parameter link should contain the link to shorten.

**Returns**: Id for the shortened link in text/plain format.

### GET /:id

**Returns**: 301 redirects the user agent to a previously stored URL. 404 error if no link stored with given id.
