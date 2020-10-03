import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import FrontPageContainer from "./FrontPageContainer";

describe("With Enzyme", () => {
  it('component shows "Hello world!"', () => {
    const app = shallow(<FrontPageContainer>Hello World!</FrontPageContainer>);
    expect(app.find("p").text()).toStrictEqual("Hello World!");
  });
});

describe("With Snapshot Testing", () => {
  it('app shows "Hello world!"', () => {
    const component = renderer.create(<FrontPageContainer />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
