import * as React from 'react';
import {
    IAuthContainer,
    createFusionContext,
    ServiceResolver,
    FusionContext,
} from '@equinor/fusion';
import AuthUser from '@equinor/fusion/lib/auth/AuthUser';

import FusionRoot from '../src/components/core/Root';

const mockUser = {
    id: '1337',
    fullName: 'Charles Carmichael',
    givenName: 'Charles',
    familyName: 'Carmichael',
    upn: 'chca@equinot.com',
    roles: [],
};

class StorybookAuthContainer implements IAuthContainer {
    
    authToken: string = localStorage.getItem('FUSION_STORYBOOK_AUTH_TOKEN') || '';

    async handleWindowCallbackAsync(): Promise<void> {
        throw new Error('Not implemented');
    }

    async acquireTokenAsync(resource: string): Promise<string | null> {
        if (this.authToken) {
            return this.authToken;
        }

        throw new Error('Not implemented');
    }

    async registerAppAsync(clientId: string, resources: string[]): Promise<boolean> {
        throw new Error('Not implemented');
    }

    login(clientId: string): void {
        throw new Error('Not implemented');
    }

    async logoutAsync(clientId?: string): Promise<void> {
        alert("Can't sign out of storybook...");
    }

    async getCachedUserAsync(): Promise<AuthUser | null> {
        return AuthUser.fromJSON(mockUser);
    }
    
    getCachedUser(): AuthUser {
        return AuthUser.fromJSON(mockUser);
    }

    setAuthToken(token: string) {
        this.authToken = token;
        localStorage.setItem('FUSION_STORYBOOK_AUTH_TOKEN', token);
    }
}

const authContainer = new StorybookAuthContainer();

// Expose the auth container to the auth token addon
window.parent['authContainer'] = authContainer;

const serviceResolver: ServiceResolver = {
    getDataProxyBaseUrl: () => 'https://pro-s-dataproxy-ci.azurewebsites.net',
    getFusionBaseUrl: () => 'https://pro-s-portal-ci.azurewebsites.net',
    getContextBaseUrl: () => 'https://pro-s-context-pr-842.azurewebsites.net',
    getOrgBaseUrl: () => 'https://pro-s-org-ci.azurewebsites.net',
    getPowerBiBaseUrl: () => 'https://pro-s-powerbi-ci.azurewebsites.net',
    getTasksBaseUrl: () => 'https://pro-s-tasks-ci.azurewebsites.net',
};

const FusionWrapper: React.FC = ({ children }) => {
    const overlay = React.useRef<HTMLElement | null>(null);
    const root = React.useRef<HTMLElement | null>(null);
    const fusionContext = createFusionContext(authContainer, serviceResolver, { overlay, root });

    return (
        <FusionContext.Provider value={fusionContext}>
            <FusionRoot rootRef={root} overlayRef={overlay}>
                {children}
            </FusionRoot>
        </FusionContext.Provider>
    );
};

export const withFusionContext = () => stories => {
    return <FusionWrapper>{stories()}</FusionWrapper>;
};
