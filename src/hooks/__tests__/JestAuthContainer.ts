import { AuthContainer, AuthUser, AuthApp, AuthNonce } from '@equinor/fusion';

const mockUser = {
    id: '1337',
    fullName: 'Charles Carmichael',
    givenName: 'Charles',
    familyName: 'Carmichael',
    upn: 'chca@equinot.com',
    roles: [],
};

export default class JestAuthContainer extends AuthContainer {
    authToken: string = localStorage.getItem('FUSION_STORYBOOK_AUTH_TOKEN') || '';

    async handleWindowCallbackAsync(): Promise<void> {
        await super.handleWindowCallbackAsync();
        // window.location.search = '?';
    }

    async acquireTokenAsync(resource: string): Promise<string | null> {
        return '';
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
        return '';
    }
}
