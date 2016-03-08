"use strict";

const express = require('express');

let ready = false;

module.exports = function (schema) {
  // Create a new router
  const router = express.Router();
  // Attach Schema to Request
  router.use(function (req, res, next) {
    // Wait for schema to be ready
    if (!ready) {
      res.status(503).json({ error: "Schema not ready" });
      return;
    }
    req.schema = schema;
    next();
  });
  
  // Set ready to initial state
  ready = schema.ready;
  
  // Wait for Schema to get ready
  schema.on("ready", () => {
    ready = true;
  });
  schema.on("error", (error) => {
    console.trace(error);
  });
  
  // Extras
  router.get('/definition', require("./methods/get.definition.js")); // Get Schema Definition (JSON Schema)

  /// Methods based on BackboneJS 1.2.3
  // Ref: http://backbonejs.org/#Sync
  router.post('/', require("./methods/create.schema.js")); // Create
  router.get('/', require("./methods/get.schema.js")); // Read Many (Search)
  router.get('/:id', require("./methods/get.schema.js")); // Read One (Get)
  router.put('/:id', require("./methods/update.schema.js")); // Update
  router.delete('/:id', require("./methods/delete.schema.js")); // Delete
  
  return router;
};