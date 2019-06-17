import * as React from "react";
import {
    IAuthContainer,
    createFusionContext,
    ServiceResolver,
    FusionContext,
    AuthContainer,
} from "@equinor/fusion";
import AuthUser from "@equinor/fusion/lib/auth/AuthUser";

import FusionRoot from "../src/components/core/Root";

const mockUser = {
    id: "1337",
    fullName: "Charles Carmichael",
    givenName: "Charles",
    familyName: "Carmichael",
    upn: "chca@equinot.com",
    roles: [],
};

class StorybookAuthContainer implements IAuthContainer {
    private authToken: string = "";
    private internalAuthContainer = new AuthContainer();

    async handleWindowCallbackAsync(): Promise<void> {
        await this.internalAuthContainer.handleWindowCallbackAsync();
    }

    async acquireTokenAsync(resource: string): Promise<string | null> {
        if(this.authToken) {
            return this.authToken;
        }
        
        return await this.internalAuthContainer.acquireTokenAsync(resource);
    }

    async registerAppAsync(clientId: string, resources: string[]): Promise<boolean> {
        return await this.internalAuthContainer.registerAppAsync(clientId, resources);
    }

    login(clientId: string): void {
        this.internalAuthContainer.login(clientId);
    }

    async getCachedUserAsync(): Promise<AuthUser | null> {
        try {
            return await this.internalAuthContainer.getCachedUserAsync();
        } catch {
            return AuthUser.fromJSON(mockUser);
        }
    }

    setAuthToken(token: string) {
        this.authToken = token;
    }
}

const authContainer = new StorybookAuthContainer();

authContainer.handleWindowCallbackAsync();

// Expose the auth container to the auth token addon
window.parent["authContainer"] = authContainer;

const serviceResolver: ServiceResolver = {
    getDataProxyBaseUrl: () => "https://pro-s-dataproxy-ci.azurewebsites.net",
    getFusionBaseUrl: () => "https://pro-s-portal-ci.azurewebsites.net",
    getContextBaseUrl: () => "https://pro-s-context-pr-842.azurewebsites.net",
};

const coreAppClientId = '5a842df8-3238-415d-b168-9f16a6a6031b';
authContainer.registerAppAsync(coreAppClientId, [
    serviceResolver.getDataProxyBaseUrl(),
    serviceResolver.getFusionBaseUrl(),
    serviceResolver.getContextBaseUrl(),
]);

const FusionWrapper: React.FC = ({ children }) => {
    const overlay = React.useRef(null);
    const root = React.useRef(null);
    const fusionContext = createFusionContext(authContainer, serviceResolver, { overlay, root });

    return (
        <FusionContext.Provider value={fusionContext}>
            <FusionRoot ref={root}>{children}</FusionRoot>
            <div ref={overlay} />
        </FusionContext.Provider>
    );
};

export const withFusionContext = () => stories => {
    return <FusionWrapper>{stories()}</FusionWrapper>;
};
