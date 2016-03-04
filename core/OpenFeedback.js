"use strict";

// Core //
const FeedbackController = require("./controllers/feedback");
// ---- //

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
    let _schema = new FeedbackController(schema);
    // Store in map
    this.schemaMap.set(name, _schema);
    // Get a copy
    return this.schemaMap.get(name);
  }
  
  hasSchema(name) {
    return this.schemaMap.has(name);
  }
  
  getSchema(name) {
    return this.schemaMap.get(name);
  }
}

module.exports = OpenFeedback;