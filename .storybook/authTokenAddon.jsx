import React, { useState } from 'react'
const clientId = '5a842df8-3238-415d-b168-9f16a6a6031b';

/**
 * Allow setting auth token
 * @todo
 * - This needs to be rewritten when msal is implemented
 * - There should be a button and callback endpoint for sso 
 */
const AuthTokenInput = ({ active }) => {
    const [authToken, setAuthToken] = useState(
        localStorage.getItem('FUSION_STORYBOOK_AUTH_TOKEN')
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
                value={authToken || ''}
            >
            </textarea>
        </div>
    );
};
export default AuthTokenInput
