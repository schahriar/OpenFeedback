"use strict";

// Core //
const FeedbackController = require("./controllers/feedback");
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
    let _controller = new FeedbackController(schema);
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
  
  static Schema() {
    return Joi;
  }
}

module.exports = OpenFeedback;