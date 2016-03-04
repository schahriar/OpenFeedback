"use strict";

// Core //
const EventEmitter = require("events");
// ---- //
// Required //
const elasticsearch = require('elasticsearch');
// -------- //

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
  
  ping(callback) {
    this.client.ping({
      // 10 second timeout
      requestTimeout: 10000,
    }, callback);
  }
}

module.exports = Elastic;