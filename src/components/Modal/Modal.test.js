import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import Modal from "./Modal";

describe("With Enzyme", () => {
  it('component shows "Hello world!"', () => {
    const app = shallow(<Modal>Hello World!</Modal>);
    expect(app.find("p").text()).toStrictEqual("Hello World!");
  });
});

describe("With Snapshot Testing", () => {
  it('app shows "Hello world!"', () => {
    const component = renderer.create(<Modal />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
