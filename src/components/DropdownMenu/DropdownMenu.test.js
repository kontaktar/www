import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import DropdownMenu from "./DropdownMenu";

describe("With Enzyme", () => {
  it('component shows "Hello world!"', () => {
    const app = shallow(<DropdownMenu>Hello World!</DropdownMenu>);
    expect(app.find("p").text()).toStrictEqual("Hello World!");
  });
});

describe("With Snapshot Testing", () => {
  it('app shows "Hello world!"', () => {
    const component = renderer.create(<DropdownMenu />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
