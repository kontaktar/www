import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import LoginFormContainer from "./LoginFormContainer";

describe("With Enzyme", () => {
  it('component shows "Hello world!"', () => {
    const app = shallow(<LoginFormContainer>Hello World!</LoginFormContainer>);
    expect(app.find("p").text()).toStrictEqual("Hello World!");
  });
});

describe("With Snapshot Testing", () => {
  it('app shows "Hello world!"', () => {
    const component = renderer.create(<LoginFormContainer />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
