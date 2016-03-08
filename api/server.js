"use strict";

const express = require('express');
const inspect = require('util').inspect;
const url = require('url');
const bodyParser = require('body-parser');
const compress = require('compression');

// SCRUD Router
const sCRUD = require("./SCRUD/constructor");

module.exports = function RESTful_API(instance, options) {
  let app = express();
  
  // Set Instance
  app.set("OpenFeedback", instance);
  
  // Gzip Middleware
  app.use(compress());
  
  // CORS Middleware: Allow API access, echo origin
  app.use(function (req, res, next) {
    // Allow for Remote API Requests
    res.header("Access-Control-Allow-Origin", req.get('origin'));
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE");
    
    // Intercept CORS OPTIONS Method
    if (req.method == 'OPTIONS') {
      res.send(200).end();
    } else {
      next();
    }
  });
  
  // Bodyparser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  
  // Populate request object with instance
  app.use(function (req, res, next) {
    req.openfeedback = app.get('OpenFeedback');
    next();
  });
  
  /// RESTful SCRUD ///
  app.get('OpenFeedback').listSchemas().forEach(function REST_SCHEMA_BUILDER(item) {
    app.use(url.resolve("/", item.name.toString()), sCRUD(item.schema));
  });
  /// ------------- ///
  
  // Catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // Development error handler
  // will print stacktrace
  if ((app.get('env') === 'development') && (!options.notrace)) {
    app.use(function (err, req, res, next) {
      console.trace(err);
      res.status(err.status || 500);
      res.json({
        message: err.message,
        error: inspect(err, {
          showHidden: true,
          depth: 5
        })
      });
    });
  }

  // Production error handler
  // no stacktraces leaked to user
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: JSON.stringify(err)
    });
  });
  
  app.listen(options.port || 28408);
};