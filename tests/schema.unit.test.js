// #5
var generalFeedbackDefinition = {
  type: 'object',
  properties: {
    body: {
      description: "A feedback",
      type: 'string',
      minimum: 10
    }
  },
  required: ['body']
};
describe("Schema & Definition tests", function () {
  it("should add a new definiton", function () {
    app.addSchema("test", generalFeedbackDefinition);
  });
  it("should retrieve definition", function () {
    var def = app.getSchema("test").definition();
    expect(def).to.have.property("properties");
    expect(def.properties).to.have.property("body");
    expect(def.properties.body).to.have.property("description", "A feedback");
  });
  it("should check for schema's existence", function() {
    var exists = app.hasSchema("test");
    expect(exists).to.be.equal(true);
  });
  it("should return false if schema doesn't exist", function() {
    var exists = app.hasSchema("randomNonexistentSchema");
    expect(exists).to.be.equal(false);
  });
  it("should list schemas", function() {
    var list = app.listSchemas();
    var hasTest = false;
    for (var i = 0; i < list.length; i++) {
      if (list[i].name === "test") hasTest = true;
    }
    expect(list).to.have.length.gte(1);
    if (!hasTest) throw new Error("Expected `test` to be a part of schema list");
  });
});