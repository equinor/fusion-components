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

const _customElementsDefine = window.customElements.define;
window.customElements.define = (name, cl, conf) => {
    if (!customElements.get(name)) {
        _customElementsDefine.call(window.customElements, name, cl, conf);
    } else {
        console.warn(`${name} has been defined twice`);
    }
};

// force full reload to not reregister web components
const customElementReq = require.context('../src/customElements', true, /\.stories\.(ts|js|mdx)$/);
configure(customElementReq, module);
if (module.hot) {
    module.hot.accept(customElementReq.id, () => {
        const currentLocationHref = window.location.href;
        window.history.pushState(null, null, currentLocationHref);
        window.location.reload();
    });
}
