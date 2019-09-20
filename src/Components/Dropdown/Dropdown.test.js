
import { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";

import Dropdown from "./Dropdown";

describe("With Enzyme", () => {
  it('component shows "Hello world!"', () => {
    const app = shallow(<Dropdown>Hello World!</Dropdown>);
    expect(app.find("p").text()).toStrictEqual("Hello World!");
  });
});

describe("With Snapshot Testing", () => {
  it('app shows "Hello world!"', () => {
    const component = renderer.create(<Dropdown />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
