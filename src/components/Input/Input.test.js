
import { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";

import Input from "./Input";

describe("With Enzyme", () => {
  it('component shows "Hello world!"', () => {
    const app = shallow(<Input>Hello World!</Input>);
    expect(app.find("p").text()).toStrictEqual("Hello World!");
  });
});

describe("With Snapshot Testing", () => {
  it('app shows "Hello world!"', () => {
    const component = renderer.create(<Input />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
