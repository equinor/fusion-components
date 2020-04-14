import { configure, addDecorator, addParameters } from '@storybook/react';
import results from '../.jest-test-results.json';
import { withTests } from '@storybook/addon-jest';
import theme from './theme';
import { withFusionContext } from './withFusionContext.tsx';

addDecorator(withFusionContext());
addDecorator(withTests({ results }));

addParameters({
    options: {
        theme: theme,
    },
});

const req = require.context('../src', true, /\.stories\.(jsx|tsx)$/);

const loadStories = () => {
    req.keys().forEach((filename) => req(filename));
};

configure(loadStories, module);
