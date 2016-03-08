"use strict";

// Controllers //
const DefaultController = require("./default");
// ----------- //

class Feedback extends DefaultController {
  constructor(name, schema, driver) {
    super(name, schema, driver);
  }
  
  search(query, callback) {
    // Extend index, type
    query.index = this.index;
    query.type = "OpenFeedbackSchema";
    this.driver.search(query, function (error, results) {
      if (error) return callback(error);
      
      callback(null, results);
    });
  }
  
  create(model, callback) {
    this.validate(model, (error) => {
      if (error) return callback(error);

      // Construct Document
      let document = {
        index: this.index,
        type: "OpenFeedbackSchema"
      };
      document.body = model;
      
      this.driver.create(document, function (error, _result) {
        if (error) return callback(error);
        
        callback(null, _result);
      });
    });
  }
  
  get(query, callback) {
    // Extend index, type
    query.index = this.index;
    query.type = "OpenFeedbackSchema";
    this.driver.get(query, callback);
  }
  
  update(query, model, callback) {
    this.validate(model, (error) => {
      if (error) return callback(error);
      
      // Construct Document
      let document = query;
      document.index = this.index;
      document.type = "OpenFeedbackSchema";
      document.body = {
        doc: model
      };
      
      this.driver.update(document, function (error, _result) {
        if (error) return callback(error);
        
        callback(null, _result);
      });
    });
  }
  
  delete(query, callback) {
    // Extend index, type
    query.index = this.index;
    query.type = "OpenFeedbackSchema";
    this.driver.delete(query, callback);
  }
}

module.exports = Feedback;