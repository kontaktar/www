import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import header from "./header";

describe("With Enzyme", () => {
  it('component shows "Hello world!"', () => {
    const app = shallow(<header>Hello World!</header>);
    expect(app.find("p").text()).toStrictEqual("Hello World!");
  });
});

describe("With Snapshot Testing", () => {
  it('app shows "Hello world!"', () => {
    const component = renderer.create(<header />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
