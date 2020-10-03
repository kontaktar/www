import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import Card from "./Card";

describe("With Enzyme", () => {
  it('component shows "Hello world!"', () => {
    const app = shallow(<Card>Hello World!</Card>);
    expect(app.find("p").text()).toStrictEqual("Hello World!");
  });
});

describe("With Snapshot Testing", () => {
  it('app shows "Hello world!"', () => {
    const component = renderer.create(<Card />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
