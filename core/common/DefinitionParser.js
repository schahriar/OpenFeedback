"use strict";

class DefinitionParser {
  constructor(definition) {
    this.def = definition;
    this.schema = {};
    this._parse();
  }
  
  _parse() {
    for (let key in this.def) {
      if (this.def[key].type) this.schema[key] = this.def[key].type;
    }
  }
  
  get() {
    return this.schema;
  }
  
  getDefinition() {
    return this.def;
  }
}

module.exports = DefinitionParser;