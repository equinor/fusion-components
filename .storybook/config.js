import React from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
// import { withInfo } from "@storybook/addon-info";
import results from '../.jest-test-results.json';
import { withTests } from '@storybook/addon-jest';
import theme from './theme';

addDecorator(stories => <div style={{ textAlign: 'center' }}>{stories()}</div>);
addDecorator(withTests({ results }));

addParameters({
    options: {
        theme: theme,
    },
});

// addDecorator(
//     withInfo({
//         inline: true,
//         propTablesExclude: [React.Fragment],
//     })
// );

// addDecorator(
//     withOptions({
//         addonPanelInRight: true,
//         name: "Fusion Components",
//         url: "https://github.com/equinor/fusion-components",
//         sidebarAnimations: false,
//         theme: {
//             ...themes.normal,
//             storiesNav: {
//                 ...themes.normal.storiesNavbar,
//                 backgroundColor: "white",
//                 borderRight: "2px solid rgba(0, 0, 0, 0.1)",
//                 padding: 8,
//             },

//             menuLink: {
//                 ...themes.normal.menuLink,
//                 padding: 8,
//                 color: "#007079",
//             },

//             activeMenuLink: {
//                 ...themes.normal.activeMenuLink,
//                 padding: 8,
//                 color: "#007079",
//                 backgroundColor: "#EDFCF4",
//                 borderRadius: 4,
//             },
//         },
//     })
// );

const req = require.context('../src', true, /\.stories\.jsx$/);

const loadStories = () => {
    req.keys().forEach(filename => req(filename));
};

configure(loadStories, module);
