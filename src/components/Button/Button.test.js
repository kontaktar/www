import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import Button from "./Button";

describe("With Enzyme", () => {
  it('component shows "Hello world!"', () => {
    const app = shallow(<Button>Hello World!</Button>);
    expect(app.find("button").text()).toStrictEqual("Hello World!");
  });
});

describe("With Snapshot Testing", () => {
  it('app shows "Hello world!"', () => {
    const component = renderer.create(<Button />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
