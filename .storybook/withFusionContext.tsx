import * as React from 'react';
import {
    createFusionContext,
    ServiceResolver,
    FusionContext,
    AuthContainer,
} from '@equinor/fusion';
import AuthUser from '@equinor/fusion/lib/auth/AuthUser';
import { HashRouter } from 'react-router-dom';

import FusionRoot from '../src/components/core/Root';
import AuthApp from '@equinor/fusion/lib/auth/AuthApp';
import AuthNonce from '@equinor/fusion/lib/auth/AuthNonce';

const mockUser = {
    id: '1337',
    fullName: 'Charles Carmichael',
    givenName: 'Charles',
    familyName: 'Carmichael',
    upn: 'chca@equinot.com',
    roles: [],
};

const getTopLevelWindow = (win: Window): Window => {
    if (win === win.parent) {
        return win;
    }

    return getTopLevelWindow(win.parent);
};

class StorybookAuthContainer extends AuthContainer {
    authToken: string = localStorage.getItem('FUSION_STORYBOOK_AUTH_TOKEN') || '';

    async handleWindowCallbackAsync(): Promise<void> {
        await super.handleWindowCallbackAsync();
        // window.location.search = '?';
    }

    async acquireTokenAsync(resource: string): Promise<string | null> {
        if (this.authToken) {
            return this.authToken;
        }

        return await super.acquireTokenAsync(resource);
    }

    async registerAppAsync(clientId: string, resources: string[]): Promise<boolean> {
        return await super.registerAppAsync(clientId, resources);
    }

    async loginAsync(clientId: string): Promise<void> {
        console.log('No login for you');
        /*   super.login(clientId); */
    }

    async logoutAsync(clientId?: string): Promise<void> {
        await super.logoutAsync(clientId);
    }

    async getCachedUserAsync(): Promise<AuthUser | null> {
        try {
            const cachedUser = await super.getCachedUser();
            if (cachedUser) {
                return cachedUser;
            }
        } catch (e) {}

        return AuthUser.fromJSON(mockUser);
    }

    getCachedUser(): AuthUser {
        return super.getCachedUser() || AuthUser.fromJSON(mockUser);
    }

    setAuthToken(token: string) {
        this.authToken = token;
        localStorage.setItem('FUSION_STORYBOOK_AUTH_TOKEN', token);
    }

    protected buildLoginUrl(app: AuthApp, nonce: AuthNonce, customParams?: object): string {
        const base =
            'https://login.microsoftonline.com/3aa4a235-b6e2-48d5-9195-7fcf05b459b0/oauth2/authorize';
        const params: any = {
            ...customParams,
            client_id: app.clientId,
            response_type: 'id_token',
            redirect_uri: getTopLevelWindow(window).location.origin + '?path=/signin',
            domain_hint: '@equinor.com',
            nonce: nonce.getKey(),
        };

        const queryString = Object.keys(params).reduce(
            (query, key) => query + `${query ? '&' : ''}${key}=${encodeURIComponent(params[key])}`,
            ''
        );

        return base + '?' + queryString;
    }
}

const authContainer = new StorybookAuthContainer();

authContainer.handleWindowCallbackAsync();

// Expose the auth container to the auth token addon
window.parent['authContainer'] = authContainer;

const serviceResolver: ServiceResolver = {
    getDataProxyBaseUrl: () => 'https://pro-s-dataproxy-ci.azurewebsites.net',
    getFusionBaseUrl: () => 'https://pro-s-portal-ci.azurewebsites.net',
    getContextBaseUrl: () => 'https://pro-s-context-pr-842.azurewebsites.net',
    getOrgBaseUrl: () => 'https://pro-s-org-ci.azurewebsites.net',
    getPowerBiBaseUrl: () => 'https://pro-s-powerbi-ci.azurewebsites.net',
    getTasksBaseUrl: () => 'https://pro-s-tasks-ci.azurewebsites.net',
    getProjectsBaseUrl: () => 'https://pro-s-projects-ci.azurewebsites.net',
    getMeetingsBaseUrl: () => 'https://pro-s-meetingsv2-ci.azurewebsites.net',
    getPeopleBaseUrl: () => 'https://pro-s-people-ci.azurewebsites.net',
    getReportsBaseUrl: () => 'https://pro-s-reports-ci.azurewebsites.net',
    getPowerBiApiBaseUrl: () => 'https://api.powerbi.com/v1.0/myorg',
};

const clientId = '5a842df8-3238-415d-b168-9f16a6a6031b';
authContainer.registerAppAsync(
    clientId,
    Object.keys(serviceResolver).map(key => serviceResolver[key]())
);

const FusionWrapper: React.FC = ({ children }) => {
    const overlay = React.useRef<HTMLElement | null>(null);
    const root = React.useRef<HTMLElement | null>(null);
    const fusionContext = createFusionContext(authContainer, serviceResolver, { overlay, root });

    return (
        <FusionContext.Provider value={fusionContext}>
            <HashRouter>
                <FusionRoot rootRef={root} overlayRef={overlay}>
                    {children}
                </FusionRoot>
            </HashRouter>
        </FusionContext.Provider>
    );
};

export const withFusionContext = () => stories => {
    return <FusionWrapper>{stories()}</FusionWrapper>;
};
