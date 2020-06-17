
import { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";

import SearchBar from "./SearchBar";

describe("With Enzyme", () => {
  it('component shows "Hello world!"', () => {
    const app = shallow(<SearchBar>Hello World!</SearchBar>);
    expect(app.find("p").text()).toStrictEqual("Hello World!");
  });
});

describe("With Snapshot Testing", () => {
  it('app shows "Hello world!"', () => {
    const component = renderer.create(<SearchBar />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
