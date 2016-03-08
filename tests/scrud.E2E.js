// #20
"use strict";

var request = require("request");
var url = require('url');
var host = "http://localhost:28408/E2E/";
var ID;

function EMPTY_LIST_TEST_FACTORY(callback) {
  return function (error, response, body) {
    if (error) throw error;
    let results = JSON.parse(body);
    expect(response).to.have.property("statusCode", 200);
    expect(results).to.have.property("items");
    expect(results.items).to.length(0);
    callback();
  };
}

function FEEDBACK_CREATE_TEST_FACTORY(callback) {
  return function (error, response, body) {
    if (error) throw error;
    expect(response).to.have.property("statusCode", 200);
    expect(body).to.not.have.property("error");
    expect(body).to.have.property("id");
    ID = body.id;
    // Takes some time for item to get indexed
    setTimeout(callback, 1000);
  };
}

describe("SCRUD End to End testing", function () {
  this.timeout(502200);
  it("should create a new item", function (done) {
    request.post({
      url: host,
      json: true,
      body: {
        body: "Hello World"
      }
    }, FEEDBACK_CREATE_TEST_FACTORY(done));
  });
  it("should list all items", function (done) {
    request.get(url.resolve(host, "?_all"), function (error, response, body) {
      if (error) throw error;
      let results = JSON.parse(body);
      expect(response).to.have.property("statusCode", 200);
      expect(results).to.have.property("items");
      expect(results.items).to.length(1);
      expect(results.items[0]).to.have.property("_id", ID);
      done();
    });
  });
  it("should delete an item", function (done) {
    request.del(url.resolve(host, ID), function (error, response, body) {
      if (error) throw error;
      let result = JSON.parse(body);
      expect(response).to.have.property("statusCode", 200);
      expect(result).to.not.have.property("error");
      expect(result).to.have.property("success", true);
      // Takes some time for item to get indexed
      setTimeout(done, 1000);
    });
  });
  it("should have items removed from list", function (done) {
    request.get(url.resolve(host, "?_all"), EMPTY_LIST_TEST_FACTORY(done));
  });
  it("should invalidate bad items", function (done) {
    request.post({
      url: host,
      json: true,
      body: {
        boxSize: "?"
      }
    }, function (error, response, body) {
      if (error) throw error;
      expect(response).to.have.property("statusCode", 200);
      expect(body).to.have.property("error");
      expect(body).to.not.have.property("id");
      // Takes some time for item to get indexed
      setTimeout(done, 1000);
    });
  });
  it("should not have added bad items to the list", function (done) {
    request.get(url.resolve(host, "?_all"), EMPTY_LIST_TEST_FACTORY(done));
  });
  it("should create another item", function (done) {
    request.post({
      url: host,
      json: true,
      body: {
        body: "Hello World"
      }
    }, FEEDBACK_CREATE_TEST_FACTORY(done));
  });
  it("should get an item", function (done) {
    request.get(url.resolve(host, ID), function (error, response, body) {
      if (error) throw error;
      var result = JSON.parse(body);
      expect(response).to.have.property("statusCode", 200);
      expect(result).to.not.have.property("error");
      expect(result).to.have.property("item");
      expect(result.item).to.have.property("_id", ID);
      expect(result.item._source).to.have.property("body", "Hello World");
      done();
    });
  });
  it("should update an item", function (done) {
    request.put({
      url: url.resolve(host, ID),
      json: true,
      body: {
        body: "Updated Feedback"
      }
    }, function (error, response, body) {
      if (error) throw error;
      expect(response).to.have.property("statusCode", 200);
      expect(body).to.not.have.property("error");
      expect(body).to.have.property("id", ID);
      done();
    });
  });
  it("should get updated item", function (done) {
    request.get(url.resolve(host, ID), function (error, response, body) {
      if (error) throw error;
      var result = JSON.parse(body);
      expect(response).to.have.property("statusCode", 200);
      expect(result).to.not.have.property("error");
      expect(result).to.have.property("item");
      expect(result.item).to.have.property("_id", ID);
      expect(result.item._source).to.have.property("body", "Updated Feedback");
      // Takes some time for item to get indexed
      setTimeout(done, 1000);
    });
  });
  it("should search for items", function(done) {
    request.get(url.resolve(host, "?q=body:*Feedback"), function (error, response, body) {
      if (error) throw error;
      var result = JSON.parse(body);
      expect(response).to.have.property("statusCode", 200);
      expect(result).to.not.have.property("error");
      expect(result).to.have.property("items");
      expect(result.items[0]).to.have.property("_id", ID);
      done();
    });
  });
  it("should get JSON Schema definition", function(done) {
    request.get(url.resolve(host, "definition"), function (error, response, body) {
      if (error) throw error;
      var result = JSON.parse(body);
      expect(response).to.have.property("statusCode", 200);
      expect(result).to.not.have.property("error");
      expect(result).to.eql(generalFeedbackDefinition);
      done();
    });
  });
});