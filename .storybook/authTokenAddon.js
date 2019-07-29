import * as React from 'react';
import addons from '@storybook/addons';

const clientId = '5a842df8-3238-415d-b168-9f16a6a6031b';

const AuthTokenInput = ({ active }) => {
    const [authToken, setAuthToken] = React.useState(
        localStorage.getItem('FUSION_STORYBOOK_AUTH_TOKEN') || ''
    );

    const onAuthTokenInputChange = e => {
        setAuthToken(e.target.value);
        window.authContainer.setAuthToken(e.target.value);
    };

    const login = () => {
        window.authContainer.login(clientId);
    }

    if (!active) {
        return null;
    }

    return (
        <div
            style={{
                margin: 24,
            }}
        >
            <button onClick={login}>Sign in</button>
            <p>Or paste auth token (without bearer)</p>
            <textarea
                onChange={onAuthTokenInputChange}
                placeholder="JWT Token"
                style={{
                    
                    width: 'calc(100% - 48px)',
                    height: 'calc(100% - 80px)',
                    borderRadius: 4,
                    padding: 8,
                    boxSizing: 'border-box',
                }}
            >
                {authToken}
            </textarea>
        </div>
    );
};

addons.register('FUSION', api => {
    addons.addPanel('FUSION/authtoken', {
        title: 'Auth',
        render: ({ active, key }) => <AuthTokenInput key={key} active={active} />,
    });
});
