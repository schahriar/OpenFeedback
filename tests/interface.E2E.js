// #20
var request = require("request");
var url = require('url');
var host = "http://localhost:28408/";

function ENDPOINT_METHOD_TEST_FACTORY(callback) {
  return function (error, response) {
    if (error) throw error;
    expect(response).to.have.property("statusCode", 200);
    callback();
  };
}

describe("Interface End to End testing", function () {
  it("should create an endpoint for schema", function (done) {
    request.get(url.resolve(host, "E2E"), function (error, response, body) {
      if (error) throw error;
      expect(response).to.have.property("statusCode", 200);
      expect(JSON.parse(body)).to.have.property("error");
      done();
    });
  });
  it("should not accept any endpoint", function (done) {
    request.get(url.resolve(host, "randomEndpoint"), function (error, response, body) {
      if (error) throw error;
      expect(response).to.have.property("statusCode", 404);
      done();
    });
  });
  it("should accept get method on correct endpoint", function (done) {
    request.get(url.resolve(host, "E2E/ID"), ENDPOINT_METHOD_TEST_FACTORY(done));
  });
  it("should accept post method on correct endpoint", function (done) {
    request.post(url.resolve(host, "E2E"), ENDPOINT_METHOD_TEST_FACTORY(done));
  });
  it("should accept put method on correct endpoint", function (done) {
    request.put(url.resolve(host, "E2E/ID"), ENDPOINT_METHOD_TEST_FACTORY(done));
  });
  it("should accept delete method on correct endpoint", function (done) {
    request.del(url.resolve(host, "E2E/ID"), ENDPOINT_METHOD_TEST_FACTORY(done));
  });
  it("should not accept unimplemented patch method on correct endpoint", function (done) {
    request.patch(url.resolve(host, "E2E"), function (error, response) {
      if (error) throw error;
      expect(response).to.have.property("statusCode", 404);
      done();
    });
  });
});