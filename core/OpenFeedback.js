"use strict";

// Core //
const FeedbackController = require("./controllers/feedback");
const DefinitionParser = require("./common/DefinitionParser");
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
  
  addSchema(name, definition) {
    let def = new DefinitionParser(definition);
    // Create Controller
    let _controller = new FeedbackController(def);
    // Store in map
    this.schemaMap.set(name, { controller: _controller, schema: def.get(), definition: def.getDefinition() });
    // Get a copy
    return this.schemaMap.get(name);
  }
  
  hasSchema(name) {
    return this.schemaMap.has(name);
  }
  
  getSchema(name) {
    return this.schemaMap.get(name).definition;
  }
  
  listSchemas() {
    let schemaArray = [];
    for (let Schema of this.schemaMap) {
      schemaArray.push({
        name: Schema[0],
        schema: Schema[1].definition
      });
    }
    
    return schemaArray;
  }
  
  static Schema() {
    return Joi;
  }
}

module.exports = OpenFeedback;