
import { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";

import SubscriptionContainer from "./SubscriptionContainer";

describe("With Enzyme", () => {
  it('component shows "Hello world!"', () => {
    const app = shallow(<SubscriptionContainer>Hello World!</SubscriptionContainer>);
    expect(app.find("p").text()).toStrictEqual("Hello World!");
  });
});

describe("With Snapshot Testing", () => {
  it('app shows "Hello world!"', () => {
    const component = renderer.create(<SubscriptionContainer />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
