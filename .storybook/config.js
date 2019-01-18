import React from "react";
import { configure, addDecorator } from "@storybook/react";
import { withOptions } from "@storybook/addon-options";
import { withInfo } from "@storybook/addon-info";

addDecorator(stories => <div style={{ fontFamily: "Equinor", textAlign: "center" }}>{stories()}</div>);

addDecorator(
    withInfo({
        inline: true,
        propTablesExclude: [
            React.Fragment,
        ],
        styles: {
            header: {
                h1: {
                    fontFamily: "Equinor",
                },
                h2: {
                    fontFamily: "Equinor",
                },
                body: {
                    fontFamily: "Equinor",
                },
            },
            source: {
                h1: {
                    fontFamily: "Equinor",
                },
            },
            propTableHead: {
                fontFamily: "Equinor",
            },
        },
    })
);

addDecorator(
    withOptions({
        theme: {
            storiesNav: {
                backgroundColor: "white",
                borderRight: "2px solid rgba(0, 0, 0, 0.1)",
                padding: 8,
                fontFamily: "Equinor-Storybook",
            },

            menuLink: {
                padding: 8,
                color: "#007079",
            },

            activeMenuLink: {
                padding: 8,
                color: "#007079",
                backgroundColor: "#EDFCF4",
                borderRadius: 4,
            },
        },
    })
);

const req = require.context("../src", true, /stories\.js$/);

const loadStories = () => {
    req.keys().forEach(filename => req(filename));
};

configure(loadStories, module);