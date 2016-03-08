# OpenFeedback
OpenFeedback is a fast, open-source framework for dealing with custom designed feedback schemas based on [JSON Schema](http://json-schema.org/). It uses ElasticSearch for storage and indexing and exposes an optional RESTful API based on the [SCRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) methods.

[![Build Status](https://travis-ci.org/schahriar/OpenFeedback.svg?branch=master)](https://travis-ci.org/schahriar/OpenFeedback)
[![Test Coverage](https://codeclimate.com/github/schahriar/OpenFeedback/badges/coverage.svg)](https://codeclimate.com/github/schahriar/OpenFeedback/coverage)

-----

## Installation
Instal [ElasticSearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/_installation.html) and then OpenFeedback:
```javascript
npm install --save openfeedback
```

## Usage
Create a JSON Schema and launch an Express-based API server:
```javascript
const OpenFeedback = require("openfeedback");
let app = new OpenFeedback();

// Create a new JSON Schema called feedback
// Accepts a required body {string} property 
let feedback = app.addSchema("feedback", {
  type: 'object',
  properties: {
    body: {
      description: "A feedback",
      type: 'string',
      minimum: 10
    }
  },
  required: ['body']
});

// Start a RESTful API on port 28408
app.connect({ port: 28408 });
```
Access schema based on SCRUD (Search, Create, Read, Update, Delete) interface:

- Search: **GET** localhost:28408/`schema-name`/?q=body:*word"
- Create: **POST JSON** localhost:28408/`schema-name`/
- Read: **GET** localhost:28408/`schema-name`/`id`
- Update: **PUT JSON** localhost:28408/`schema-name`/`id`
- Delete: **DELETE** localhost:28408/`schema-name`/`id`

-----

## Why OpenFeedback?
OpenFeedback is great at storing and indexing customer feedback and general responses all on a very simple API either internally or as a RESTful API. You can create any schema compatible with [JSON Schema](http://json-schema.org/) and get your feedback API up and running within a matter of minutes.

-----

## License
[MIT](https://raw.githubusercontent.com/schahriar/pubmq/master/LICENSE)