
import { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";

import NavigationBar from "./NavigationBar";

describe("With Enzyme", () => {
  it('component shows "Hello world!"', () => {
    const app = shallow(<NavigationBar>Hello World!</NavigationBar>);
    expect(app.find("p").text()).toStrictEqual("Hello World!");
  });
});

describe("With Snapshot Testing", () => {
  it('app shows "Hello world!"', () => {
    const component = renderer.create(<NavigationBar />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
