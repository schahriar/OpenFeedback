# OpenFeedback
OpenFeedback is a framework for searchable and real-time consumer feedback. It uses JSON Schemas stored/indexed in ElasticSearch and exposes a Internal + RESTful API.

[![Build Status](https://travis-ci.org/schahriar/OpenFeedback.svg?branch=master)](https://travis-ci.org/schahriar/OpenFeedback)
[![Test Coverage](https://codeclimate.com/github/schahriar/OpenFeedback/badges/coverage.svg)](https://codeclimate.com/github/schahriar/OpenFeedback/coverage)

-----

## Installation
Instal [ElasticSearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/_installation.html) and then OpenFeedback:
```javascript
npm install --save openfeedback
```

## Usage
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

// Wait until Schema index is ready
feedback.on("ready", () => {
  feedback.create({
    body: "Great product, lacks documentation."
  }, function(error, id) {
    if (error) throw error;
  });
});
```