
import { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";

import Carousel from "./Carousel";

describe("With Enzyme", () => {
  it('component shows "Hello world!"', () => {
    const app = shallow(<Carousel>Hello World!</Carousel>);
    expect(app.find("p").text()).toStrictEqual("Hello World!");
  });
});

describe("With Snapshot Testing", () => {
  it('app shows "Hello world!"', () => {
    const component = renderer.create(<Carousel />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
