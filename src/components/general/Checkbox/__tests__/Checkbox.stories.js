import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";

import Checkbox from "../";

storiesOf("General components/Checkbox", module)
  .addParameters({ jest: ["Checkbox.stories"] })
  .add("default", () => (
    <div
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center"
      }}
    >
      <Checkbox
        primary={boolean("primary", true)}
        secondary={boolean("secondary", false)}
        isChecked={boolean("isChecked", false)}
        isDisabled={boolean("isDisabled", false)}
        label={text("label", "Label")}
        onChange={action("changed")}
      />
    </div>
  ));
