import { configure } from "@storybook/react";
import applyDecorators from "../.storybook/decorators";

applyDecorators();

const req = require.context("../src", true, /\.stories\.js$/);

const loadStories = () => {
    req.keys().forEach(filename => req(filename));
};

configure(loadStories, module);
