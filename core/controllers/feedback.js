"use strict";

// Controllers //
const DefaultController = require("./default");
// ----------- //

class Feedback extends DefaultController {
  constructor(schema, driver) {
    super(schema, driver);
  }
  
  search(query, callback) {
    this.driver.search(query, function (error, results) {
      if (error) return callback(error);
      
      callback(null, results);
    });
  }
  
  create(document, callback) {
    this.validate(document, (error) => {
      if (error) return callback(error);
      
      this.driver.create(document, function (error, _document) {
        if (error) return callback(error);
        
        callback(null, _document);
      });
    });
  }
  
  get(query, callback) {
    this.driver.get(query, callback);
  }
  
  update(document, callback) {
    this.validate(document, (error) => {
      if (error) return callback(error);
      
      this.driver.update(document, function (error, _document) {
        if (error) return callback(error);
        
        callback(null, _document);
      });
    });
  }
  
  delete(query, callback) {
    this.driver.delete(query, callback);
  }
}

module.exports = Feedback;