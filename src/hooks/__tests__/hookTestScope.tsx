import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';

type HookScopeComponentProps = {
    useHook: (props: any) => void;
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
    mounted = mount(<HookScopeComponent {...props} useHook={useHook} />);
    return mounted;
};
