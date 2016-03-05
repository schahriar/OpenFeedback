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
    this.client = new elasticsearch.client(options);
    // Ping Server
    this.ping((error) => {
      if (error) return this.emit("error", error);
      // Emit ready when database is responding
      this.emit("ready", this);
    });
  }
  
  search(query, callback) {
    this.client.search(query, callback);
  }
  
  create(document, callback) {
    this.client.create(document, callback);
  }
  
  get(query, callback) {
    this.client.get(query, callback);
  }
  
  update(document, callback) {
    this.client.update(document, callback);
  }
  
  delete(query, callback) {
    this.client.delete(query, callback);
  }
  
  ping(callback) {
    this.client.ping({
      // 10 second timeout
      requestTimeout: 10000,
    }, callback);
  }
}

module.exports = Elastic;