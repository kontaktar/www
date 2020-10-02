import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import Icon from "./Icon";

describe("With Enzyme", () => {
  it('component shows "Hello world!"', () => {
    const app = shallow(<Icon>Hello World!</Icon>);
    expect(app.find("p").text()).toStrictEqual("Hello World!");
  });
});

describe("With Snapshot Testing", () => {
  it('app shows "Hello world!"', () => {
    const component = renderer.create(<Icon />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
