import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import Footer from "./Footer";

describe("With Enzyme", () => {
  it('component shows "Hello world!"', () => {
    const app = shallow(<Footer>Hello World!</Footer>);
    expect(app.find("p").text()).toStrictEqual("Hello World!");
  });
});

describe("With Snapshot Testing", () => {
  it('app shows "Hello world!"', () => {
    const component = renderer.create(<Footer />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
