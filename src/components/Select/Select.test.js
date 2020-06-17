
import { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";

import Select from "./Select";

describe("With Enzyme", () => {
  it('component shows "Hello world!"', () => {
    const app = shallow(<Select>Hello World!</Select>);
    expect(app.find("p").text()).toStrictEqual("Hello World!");
  });
});

describe("With Snapshot Testing", () => {
  it('app shows "Hello world!"', () => {
    const component = renderer.create(<Select />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
