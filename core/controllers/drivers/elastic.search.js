"use strict";

// Core //
const EventEmitter = require("events");
// ---- //
// Required //
const elasticsearch = require('elasticsearch');
// -------- //

/**
 * @class Elastic
 * @description SCRUD-based driver, has to emit
 * `ready` when connected
 */
class Elastic extends EventEmitter {
  constructor(options) {
    super();
    this.client = new elasticsearch.Client(options);
    // Ping Server
    this.ping((error) => {
      if (error) return this.emit("error", error);
      
      // Emit ready when database is responding
      this.emit("ready", this);
    });
  }
  
  search(query, callback) {
    this.client.search(query, function(error, response) {
      if (error) return callback(error);

      callback(null, response.hits.hits);
    });
  }
  
  create(document, callback) {
    this.client.create(document, function (error, response) {
      if (error) return callback(error);
      if (!response.created) return callback(new Error("Failed to create document"));

      callback(null, response._id);
    });
  }
  
  get(query, callback) {
    this.client.get(query, function(error, document) {
      if (error) return callback(error);
      // Document not found, return null
      if (!document.found) return callback(null, null);

      callback(null, document);
    });
  }
  
  update(document, callback) {
    this.client.update(document, function(error, document) {
      if (error) return callback(error);

      callback(null, document);
    });
  }
  
  delete(query, callback) {
    this.client.delete(query, callback);
  }
  
  createIndex(query, callback) {
    this.client.indices.create(query, callback);
  }
  
  ping(callback) {
    this.client.ping({
      // 10 second timeout
      requestTimeout: 10000,
    }, callback);
  }
}

module.exports = Elastic;