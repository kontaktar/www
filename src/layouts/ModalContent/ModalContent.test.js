import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import ModalContent from "./ModalContent";

describe("With Enzyme", () => {
  it('component shows "Hello world!"', () => {
    const app = shallow(<ModalContent>Hello World!</ModalContent>);
    expect(app.find("p").text()).toStrictEqual("Hello World!");
  });
});

describe("With Snapshot Testing", () => {
  it('app shows "Hello world!"', () => {
    const component = renderer.create(<ModalContent />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
