
import { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";

import ProfileContainer from "./ProfileContainer";

describe("With Enzyme", () => {
  it('component shows "Hello world!"', () => {
    const app = shallow(<ProfileContainer>Hello World!</ProfileContainer>);
    expect(app.find("p").text()).toStrictEqual("Hello World!");
  });
});

describe("With Snapshot Testing", () => {
  it('app shows "Hello world!"', () => {
    const component = renderer.create(<ProfileContainer />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
