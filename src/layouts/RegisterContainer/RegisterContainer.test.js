
import { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";

import RegisterContainer from "./RegisterContainer";

describe("With Enzyme", () => {
  it('component shows "Hello world!"', () => {
    const app = shallow(<RegisterContainer>Hello World!</RegisterContainer>);
    expect(app.find("p").text()).toStrictEqual("Hello World!");
  });
});

describe("With Snapshot Testing", () => {
  it('app shows "Hello world!"', () => {
    const component = renderer.create(<RegisterContainer />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
