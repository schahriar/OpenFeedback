// #1
var elasticsearch = require("elasticsearch");
describe("Initialization Tests", function () {
  it("should flush database", function (done) {
    var client = new elasticsearch.Client();
    client.indices.delete({
      index: "_all"
    }, function(error) {
      if (error) throw error;
      done();
    });
  });
  it("should create a new instance", function (done) {
    global.app = new OpenFeedback();
    done();
  });
  it("should start RESTful API for E2E testing", function () {
    app.connect({ port: 28408 });
  });
});