import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Input from "./Input";
import InputReadme from "./README.md";

storiesOf("Components", module)
  .addParameters({
    jest: ["Input.test"],
    readme: {
      sidebar: InputReadme,
      includePropTables: [Input]
    }
  })
  .add("Input", () => (
    <>
      <div style={{ padding: "20px" }}>
        <Input
          error={text("Error message", "")}
          label={text("Label", "Name")}
          onClick={action("Input-clicked")}
          placeholder={text("Placeholder", "Hvað heitir þú?")}
        >
          {text("Label", "This is a Input")}
        </Input>
      </div>
      <div style={{ padding: "20px" }}>
        <Input
          label="Name"
          error="Please enter a valid name"
          onClick={action("Input-clicked")}
          placeholder="Your name please"
          value="1337Njálgur"
        >
          {text("Label", "This is a Input")}
        </Input>
      </div>
      <div style={{ padding: "20px" }}>
        <Input
        // label="Name"
        // error="Please enter a valid name"
        // onClick={action("Input-clicked")}
        // placeholder="Your name please"
        // value="1337Njálgur"
        >
          {text("Label", "This is a Input")}
        </Input>
      </div>
    </>
  ));
