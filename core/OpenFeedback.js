"use strict";

// Core //
const FeedbackController = require("./controllers/feedback");
const APIServer = require("../api/server");
// ---- //
// External //
const Joi = require("joi");
// -------- //

/**
 * Creates a new OpenFeedback instance.
 * @class
 */
class OpenFeedback {
  constructor() {
    this.schemaMap = new Map();
  }
  
  addSchema(name, schema) {
    // Create Controller
    let _controller = new FeedbackController(name, schema);
    // Store in map
    this.schemaMap.set(name, _controller);
    // Get a copy
    return this.schemaMap.get(name);
  }
  
  hasSchema(name) {
    return this.schemaMap.has(name);
  }
  
  getSchema(name) {
    return this.schemaMap.get(name);
  }
  
  listSchemas() {
    let schemaArray = [];
    for (let Schema of this.schemaMap) {
      schemaArray.push({
        name: Schema[0],
        schema: Schema[1]
      });
    }
    
    return schemaArray;
  }
  
  connect(options, server) {
    if (!server) server = APIServer;
    server(this, options || {});
  }
}

module.exports = OpenFeedback;