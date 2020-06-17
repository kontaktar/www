
import { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";

import Logo from "./Logo";

describe("With Enzyme", () => {
  it('component shows "Hello world!"', () => {
    const app = shallow(<Logo>Hello World!</Logo>);
    expect(app.find("p").text()).toStrictEqual("Hello World!");
  });
});

describe("With Snapshot Testing", () => {
  it('app shows "Hello world!"', () => {
    const component = renderer.create(<Logo />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
