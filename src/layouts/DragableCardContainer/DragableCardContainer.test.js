import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import DragableCardContainer from "./DragableCardContainer";

describe("With Enzyme", () => {
  it('component shows "Hello world!"', () => {
    const app = shallow(
      <DragableCardContainer>Hello World!</DragableCardContainer>
    );
    expect(app.find("p").text()).toStrictEqual("Hello World!");
  });
});

describe("With Snapshot Testing", () => {
  it('app shows "Hello world!"', () => {
    const component = renderer.create(<DragableCardContainer />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
