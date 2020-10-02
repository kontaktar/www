import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import Navigation from "./Navigation";

describe("With Enzyme", () => {
  it('component shows "Hello world!"', () => {
    const app = shallow(<Navigation>Hello World!</Navigation>);
    expect(app.find("p").text()).toStrictEqual("Hello World!");
  });
});

describe("With Snapshot Testing", () => {
  it('app shows "Hello world!"', () => {
    const component = renderer.create(<Navigation />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
