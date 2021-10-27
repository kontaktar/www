import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import Carousel from ".";

export default {
  title: "Components/Carousel",
  component: Carousel
} as ComponentMeta<typeof Carousel>;

const Template: ComponentStory<any> = (...args) => (
  <>
    <Carousel cards={[{ userId: "1" }]} />
  </>
);

export const Default = Template.bind({});
Default.parameters = {};
Default.args = {};
