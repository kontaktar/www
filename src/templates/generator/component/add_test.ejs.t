---
to: src/components/<%= name %>/<%= name %>.test.js
message: |
 - {green CREATED}: TEST
---
import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import <%= name %> from "./<%= name %>";

describe("With Enzyme", () => {
  it('component shows "Hello world!"', () => {
    const app = shallow(<<%= name %>>Hello World!</<%= name %>>);
    expect(app.find("p").text()).toStrictEqual("Hello World!");
  });
});

describe("With Snapshot Testing", () => {
  it('app shows "Hello world!"', () => {
    const component = renderer.create(<<%= name %> />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
