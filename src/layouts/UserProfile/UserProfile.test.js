
import { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";

import UserProfile from "./UserProfile";

describe("With Enzyme", () => {
  it('component shows "Hello world!"', () => {
    const app = shallow(<UserProfile>Hello World!</UserProfile>);
    expect(app.find("p").text()).toStrictEqual("Hello World!");
  });
});

describe("With Snapshot Testing", () => {
  it('app shows "Hello world!"', () => {
    const component = renderer.create(<UserProfile />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
