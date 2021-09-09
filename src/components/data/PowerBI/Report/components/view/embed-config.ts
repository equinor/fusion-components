import { IEmbedConfiguration } from 'powerbi-client';
import { TokenType, Permissions } from 'powerbi-models';

import deepmerge from 'deepmerge';

import { EmbedInfo } from '@equinor/fusion/lib/http/apiClients/models/report';

export type EmbedConfig = EmbedInfo['embedConfig'];

enum ConfigType {
    'Report' = 'Report',
    'Dashboard' = 'Dashboard',
}

export const getConfigId = (config: EmbedConfig): string => {
    switch (config.embedType) {
        case ConfigType.Report:
            return config?.reportId || '';
        case ConfigType.Dashboard:
            return config?.dashboardId || '';
        default:
            return config?.reportId || '';
    }
};

export const getTokenType = (config: EmbedConfig): TokenType => {
    switch (config.tokenType) {
        case 'AAD':
            return TokenType.Aad;
        case 'Embed':
            return TokenType.Embed;
    }
};

const createBaseConfig = (config: EmbedConfig): IEmbedConfiguration => {
    return {
        type: config.embedType.toLowerCase(),
        id: getConfigId(config),
        embedUrl: config.embedUrl,
        tokenType: getTokenType(config),
        permissions: Permissions.All,
        pageView: 'fitToWidth',
        settings: {
            localeSettings: {
                formatLocale: 'en',
                language: 'en',
            },
        },
    };
};

export const createConfig = (config: EmbedConfig): IEmbedConfiguration => {
    switch (config.embedType) {
        case ConfigType.Report:
            return createReportConfig(config);
        default:
            return createBaseConfig(config);
    }
};

export const createReportConfig = (config: EmbedConfig): IEmbedConfiguration => {
    const settings: IEmbedConfiguration['settings'] = {
        filterPaneEnabled: false,
        navContentPaneEnabled: false,
    };

    return deepmerge(createBaseConfig(config), { settings });
};
