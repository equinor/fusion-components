import React from "react";
import { addDecorator } from "@storybook/react";
import { withOptions } from "@storybook/addon-options";
import { withInfo } from "@storybook/addon-info";
import { themes } from "@storybook/components";

export default () => {
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
            addonPanelInRight: true,
            name: "Fusion Components",
            url: "https://github.com/equinor/fusion-components",
            sidebarAnimations: false,
            selectedAddonPanel: "storybook/tests/panel",
            theme: {
                ...themes.normal,
                storiesNav: {
                    ...themes.normal.storiesNavbar,
                    backgroundColor: "white",
                    borderRight: "2px solid rgba(0, 0, 0, 0.1)",
                    padding: 8,
                    // fontFamily: "Equinor",
                },

                menuLink: {
                    ...themes.normal.menuLink,
                    padding: 8,
                    color: "#007079",
                    // fontFamily: "Equinor",
                },

                activeMenuLink: {
                    ...themes.normal.activeMenuLink,
                    padding: 8,
                    color: "#007079",
                    backgroundColor: "#EDFCF4",
                    borderRadius: 4,
                    // fontFamily: "Equinor",
                },
            },
        })
    );
};