// #1
describe("Initialization Tests", function () {
  it("should create a new instance", function (done) {
    global.app = new OpenFeedback();
    done();
  });
});