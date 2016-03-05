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
  constructor(schema, driver) {
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
    this.schema = enjoi(schema || {});
    this.driver = DefaultController.fetchDriver(driver);
    this.driver.on("ready", () => {
      this.ready = true;
      this.emit("ready");
    });
  }
  
  validate(document, callback) {
    Joi.validate(document, this.schema, callback);
  }

  static fetchDriver(driver) {
    /** @todo: Add error codes */
    if (!driver || !driver.name) return;
    if (!Drivers[driver.name]) return;
    return new (Drivers[driver.name])(driver.options);
  }
}

module.exports = DefaultController;