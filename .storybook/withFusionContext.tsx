import * as React from "react";
import {
    IAuthContainer,
    createFusionContext,
    ServiceResolver,
    FusionContext,
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
    handleWindowCallbackAsync(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    acquireTokenAsync(resource: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

    registerAppAsync(clientId: string, resources: string[]): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    login(clientId: string): void {
        throw new Error("Method not implemented.");
    }

    async getCachedUserAsync(): Promise<AuthUser> {
        return AuthUser.fromJSON(mockUser);
    }
}

const authContainer = new StorybookAuthContainer();
const serviceResolver: ServiceResolver = {
    getDataProxyBaseUrl: () => "",
};

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
