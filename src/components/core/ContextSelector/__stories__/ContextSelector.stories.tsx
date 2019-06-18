import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ContextTypes } from "@equinor/fusion";
import ContextSelector from "../index";

const PDPContextSelectorStory = () => <ContextSelector type={ContextTypes.PDP} />;
const OrgChartContextSelectorStory = () => <ContextSelector type={ContextTypes.OrgChart} />;

storiesOf("Core components/Context Selector", module).add("PDP", () => (
    <PDPContextSelectorStory />
));

storiesOf("Core components/Context Selector", module).add("OrgChart", () => (
    <OrgChartContextSelectorStory />
));
