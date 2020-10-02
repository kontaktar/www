import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import TextArea from "./TextArea";

describe("With Enzyme", () => {
  it('component shows "Hello world!"', () => {
    const app = shallow(<TextArea>Hello World!</TextArea>);
    expect(app.find("p").text()).toStrictEqual("Hello World!");
  });
});

describe("With Snapshot Testing", () => {
  it('app shows "Hello world!"', () => {
    const component = renderer.create(<TextArea />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
