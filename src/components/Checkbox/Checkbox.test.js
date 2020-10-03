import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import Checkbox from "./Checkbox";

describe("With Enzyme", () => {
  it('component shows "Hello world!"', () => {
    const app = shallow(<Checkbox>Hello World!</Checkbox>);
    expect(app.find("p").text()).toStrictEqual("Hello World!");
  });
});

describe("With Snapshot Testing", () => {
  it('app shows "Hello world!"', () => {
    const component = renderer.create(<Checkbox />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
