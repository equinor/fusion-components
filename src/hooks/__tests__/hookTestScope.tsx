import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { createFusionContext, FusionContext, ServiceResolver } from '@equinor/fusion';
import JestAuthContainer from './JestAuthContainer';

type HookScopeComponentProps = {
    useHook: (props: any) => void;
};

const serviceResolver: ServiceResolver = {
    getDataProxyBaseUrl: () => 'https://pro-s-dataproxy-ci.azurewebsites.net',
    getFusionBaseUrl: () => 'https://pro-s-portal-ci.azurewebsites.net',
    getContextBaseUrl: () => 'https://pro-s-context-ci.azurewebsites.net',
    getOrgBaseUrl: () => 'https://pro-s-org-ci.azurewebsites.net',
    getPowerBiBaseUrl: () => 'https://pro-s-powerbi-ci.azurewebsites.net',
    getTasksBaseUrl: () => 'https://pro-s-tasks-ci.azurewebsites.net',
    getProjectsBaseUrl: () => 'https://pro-s-projects-ci.azurewebsites.net',
    getMeetingsBaseUrl: () => 'https://pro-s-meetingsv2-ci.azurewebsites.net',
    getPeopleBaseUrl: () => 'https://pro-s-people-ci.azurewebsites.net',
    getReportsBaseUrl: () => 'https://pro-s-reports-ci.azurewebsites.net',
    getPowerBiApiBaseUrl: () => 'https://api.powerbi.com/v1.0/myorg',
    getNotificationBaseUrl:() => 'https://pro-s-notification-ci.azurewebsites.net',
};

const HookScopeContext: React.FC<HookScopeComponentProps> = ({ useHook, ...props }) => {
    // @ts-ignore
    const root = React.useRef(document.createElement('div'));
    // @ts-ignore
    const overlay = React.useRef(document.createElement('div'));
    // @ts-ignore
    const headerContent = React.useRef(document.createElement('div'));
    
    const fusionContext = createFusionContext(new JestAuthContainer(), serviceResolver, {
        root,
        overlay,
        headerContent,
    });

    return (
        <FusionContext.Provider value={fusionContext}>
            <HookScopeComponent useHook={useHook} {...props} />
        </FusionContext.Provider>
    );
};

const HookScopeComponent: React.FC<HookScopeComponentProps> = ({ useHook, ...props }) => {
    useHook(props);
    return null;
};

let mounted: ReactWrapper | null = null;

afterEach(() => {
    // Clean up after each test
    if (mounted && mounted.exists()) {
        mounted.unmount();
    }
});

export const hookTestScope = (useHook: (props: any) => void, props: Object = {}) => {
    mounted = mount(<HookScopeContext {...props} useHook={useHook} />);
    return mounted;
};
