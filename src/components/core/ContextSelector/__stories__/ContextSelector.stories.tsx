import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ContextTypes } from "@equinor/fusion";
import ContextSelector from "../index";

const ContextSelectorStory = () => <ContextSelector type={ContextTypes.PDP} />;

storiesOf("Core components/Context Selector", module).add("Default", () => (
    <ContextSelectorStory />
));
