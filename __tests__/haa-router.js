'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-sap-a-team-haa:haa-router', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/haa-router'))
      .withPrompts({ someAnswer: true });
  });

  it('creates files', () => {
    assert.file(['dummyfile.txt']);
  });
});
