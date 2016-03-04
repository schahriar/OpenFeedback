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
  
  search(query) {
    return this.client.search(query);
  }
  
  create(document) {
    return this.client.create(document);
  }
  
  get(index) {
    return this.client.search({
      index: index
    });
  }
  
  update(document) {
    return this.client.update(document);
  }
  
  delete(query) {
    return this.client.delete(query);
  }
  
  ping(callback) {
    this.client.ping({
      // 10 second timeout
      requestTimeout: 10000,
    }, callback);
  }
}

module.exports = Elastic;