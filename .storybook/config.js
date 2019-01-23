import { configure, addDecorator } from "@storybook/react";
import applyDecorators from "./decorators";
import { withTests } from "@storybook/addon-jest";
import results from "../.jest-test-results.json";

addDecorator(withTests({ results }));

applyDecorators();

const req = require.context("../src", true, /\.stories\.js$/);

const loadStories = () => {
    req.keys().forEach(filename => req(filename));
};

configure(loadStories, module);