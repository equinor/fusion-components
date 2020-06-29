import { ApplicationGuidanceQuickFact } from './types';
import {
    AuthContainer,
    HttpClient,
    FusionContext,
    IFusionContext,
    IHttpClient,
    FusionApiErrorMessage,
} from '@equinor/fusion';

export const fetchQuickFactsForScopeAsync = async (
    scope: string
): Promise<ApplicationGuidanceQuickFact[]> => {
    return TEMP_QUICK_FACT_SCOPES[scope] || [];
};

const fetchQuickFactAsync = async (scope: string, quickFactId: string) => {
    const quickFacts = await fetchQuickFactsForScopeAsync(scope);
    return quickFacts.find((qf) => qf.anchor === quickFactId) || null;
};

export const updateQuickFactAsync = async (
    scope: string,
    quickFact: ApplicationGuidanceQuickFact
) => {
    return new Promise<ApplicationGuidanceQuickFact>(async (resolve) => {
        const quickFacts = await fetchQuickFactsForScopeAsync(scope);

        if (quickFacts.some((qf) => qf.anchor === quickFact.anchor)) {
            TEMP_QUICK_FACT_SCOPES[scope] = quickFacts.map((qf) =>
                qf.anchor === quickFact.anchor ? quickFact : qf
            );
        } else {
            TEMP_QUICK_FACT_SCOPES[scope] = [...quickFacts, quickFact];
        }

        setTimeout(() => {
            resolve(quickFact);
        }, Math.random() * 2000 + 1000);
    });
};

const USE_TEMP = false;

const BASE_URL = 'https://pro-s-info-app-pr-1848.azurewebsites.net';
export default class ApplicationGuidanceApi {
    constructor(clientId: string) {
        const fusionContext = window['74b1613f-f22a-451b-a5c3-1c9391e91e68'] as IFusionContext;

        fusionContext.auth.container.registerAppAsync(clientId, [BASE_URL]);

        this.httpClient = fusionContext.http.client;
    }

    private httpClient: IHttpClient;

    async getQuickFactsAsync(scope: string) {
        if (USE_TEMP) {
            console.debug(`API: GET FOR SCOPE ${scope}`);
            return fetchQuickFactsForScopeAsync(scope);
        }
        return this.fetchAsync<ApplicationGuidanceQuickFact[]>(`collections/${scope}/quickfacts`);
    }

    async getQuickFactAsync(scope: string, quickFactId: string) {
        if (USE_TEMP) {
            console.debug(`API: GET QUICK FACT ${scope}/${quickFactId}`);
            return await fetchQuickFactAsync(scope, quickFactId);
        }

        const quickFact = await this.fetchAsync<ApplicationGuidanceQuickFact>(
            `collections/${scope}/quickfacts/${quickFactId}`
        );

        return quickFact || null;
    }

    async updateQuickFactAsync(scope: string, quickFact: ApplicationGuidanceQuickFact) {
        if (USE_TEMP) {
            console.debug(`API: UPDATE QUICK FACT ${quickFact.collectionPath}/${quickFact.anchor}`);
            return await updateQuickFactAsync(quickFact.collectionPath, quickFact);
        }

        const response = await this.httpClient.putAsync<
            ApplicationGuidanceQuickFact,
            ApplicationGuidanceQuickFact,
            FusionApiErrorMessage
        >(`${BASE_URL}/collections/${scope}/quickfacts/${quickFact.anchor}`, quickFact);

        return response.data;
    }

    private async fetchAsync<T>(url: string): Promise<T> {
        var response = await this.httpClient.getAsync<T, FusionApiErrorMessage>(
            `${BASE_URL}/${url}`
        );
        return response.data;
    }
}

const TEMP_QUICK_FACT_SCOPES: Record<string, ApplicationGuidanceQuickFact[]> = {
    storybook: [
        {
            anchor: 'button',
            title: 'This is a button',
            bodyMarkdown: 'And it does **stuff!**',
            contentUrl: '',
            created: new Date(),
            createdBy: { id: '' },
            path: '',
            slug: '',
            collectionPath: 'storybook',
        },
    ],
};
