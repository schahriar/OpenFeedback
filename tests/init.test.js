// #1
var exec = require("child_process").exec;
describe("Initialization Tests", function () {
  it("should flush database", function (done) {
    exec("curl \"http://localhost:9200/_all/_flush\"", function (error) {
      if (error) throw error;
      done();
    });
  });
  it("should create a new instance", function (done) {
    global.app = new OpenFeedback();
    done();
  });
});