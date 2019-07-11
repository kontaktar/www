import { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";

import Button from "./Button.js";

describe("With Enzyme", () => {
  it('Component shows "Hello world!"', () => {
    const app = shallow(<Button />);

    expect(app.find("p").text()).toEqual("Hello World!");
  });
});

describe("With Snapshot Testing", () => {
  it('App shows "Hello world!"', () => {
    const component = renderer.create(<Button />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
