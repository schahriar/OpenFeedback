"use strict";

const OpenFeedback = require("../core/OpenFeedback");
let App = new OpenFeedback();

let schema = App.addSchema("test", {
  type: 'object',
  properties: {
    body: {
      description: "A feedback",
      type: 'string',
      minimum: 10
    }
  },
  required: ['body']
});

App.connect(require("../api/server"), {});