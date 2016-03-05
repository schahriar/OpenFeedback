// #10
var chance = new (require("chance"));
var documentID;
var documentTemp;
describe("Feedback Controller tests", function() {
  this.timeout(10000);
  it("should create a new feedback", function(done) {
    var response = "some chance " + chance.paragraph();
    app.getSchema("test").create({
      body: response
    }, function(error, id) {
      if (error) throw error;
      
      documentID = id;
      done();
    });
  });
  it("should get a feedback", function(done) {
    app.getSchema("test").get({
      id: documentID
    }, function(error, result) {
      if (error) throw error;
      
      documentTemp = result;
      expect(result).to.have.property("found", true);
      setTimeout(done, 1000);
    });
  });
  it("should search a feedback", function(done) {
    app.getSchema("test").search({
      analyzeWildcard: true,
      body: {
        query: {
          match: {
            body: '* chance *'
          }
        },
      }
    }, function(error, results) {
      if (error) throw error;
      expect(results).to.have.length.gte(1);
      expect(results[0]).to.have.property("_source");
      expect(results[0]._source).to.have.property("body", documentTemp._source.body);
      done();
    });
  });
  it("should update a feedback", function(done) {
    var response = "some chance " + chance.paragraph();
    app.getSchema("test").update({ id: documentID }, {
      body: response
    }, function(error, id) {
      if (error) throw error;

      documentID = id;
      done();
    });
  });
  it("should delete a feedback", function(done) {
    app.getSchema("test").delete({ id: documentID }, function(error) {
      if (error) throw error;
      // Check if exists
      app.getSchema("test").get({
        id: documentID
      }, function(error, document) {
        expect(error).to.not.be.null;
        expect(document).to.be.undefined;
        
        done();
      });
    });
  });
});