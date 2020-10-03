import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import UserLayout from "./UserLayout";

describe("With Enzyme", () => {
  it('component shows "Hello world!"', () => {
    const app = shallow(<UserLayout>Hello World!</UserLayout>);
    expect(app.find("p").text()).toStrictEqual("Hello World!");
  });
});

describe("With Snapshot Testing", () => {
  it('app shows "Hello world!"', () => {
    const component = renderer.create(<UserLayout />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
