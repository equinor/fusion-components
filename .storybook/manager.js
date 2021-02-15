import { create } from '@storybook/theming';
import { addons } from '@storybook/addons';
import AuthTokenInput from './authTokenAddon';


addons.setConfig({
    theme: create({
        base: 'light',
        brandTitle: 'Fusion Components',
        brandUrl: 'https://github.com/equinor/fusion-components',
        colorPrimary: '#FF1243',
        colorSecondary: '#007079',
        fontBase: 'Equinor, sans-serif',
    }),
});

/* 
addons.register('FUSION', (api) => {
    addons.addPanel('FUSION/authtoken', {
        title: 'Auth',
        render: ({ active, key }) => (<AuthTokenInput key={key} active={active} />)
    });
});
*/



