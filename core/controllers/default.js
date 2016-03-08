"use strict";

// Core //
const EventEmitter = require("events");
// ---- //
// External //
const Joi = require('joi');
const enjoi = require('enjoi');
// -------- //

let Drivers = {
  "elasticsearch": require("./drivers/elastic.search.js")
};

/**
 * Creates a new Controller.
 * @class
 */
class DefaultController extends EventEmitter {
  /**
   * @constructs
   * @param {Object} schema
   * @param {Object} driver - Takes name and connection options property
   * @todo implement query queue, perform bulk on queue
   */
  constructor(name, schema, driver) {
    super();
    this.ready = false;
    if (!driver || !driver.name) {
      driver = {
        name: "elasticsearch",
        options: {
          host: 'localhost:9200'
        }
      };
    }
    this.index = name;
    this.schemaDefinition = schema;
    this.schema = enjoi(schema || {});
    this.driver = DefaultController.fetchDriver(driver);
    this.driver.on("ready", (driver) => {
      // Update driver
      this.driver = driver;
      // Create Schema index
      this.driver.indices.create({ index: this.index }, (error) => {
        // Emit ready
        this.ready = true;
        this.emit("ready");
      });
    });
    this.driver.on("error", (error) => {
      this.emit("error", error);
    });
  }
  
  validate(document, callback) {
    Joi.validate(document, this.schema, callback);
  }
  
  definition() {
    return this.schemaDefinition;
  }

  static fetchDriver(driver) {
    /** @todo: Add error codes */
    if (!driver || !driver.name) return;
    if (!Drivers[driver.name]) return;
    return new (Drivers[driver.name])(driver.options);
  }
}

module.exports = DefaultController;