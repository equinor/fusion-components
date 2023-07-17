import { mount, ReactWrapper } from 'enzyme';
import { FC } from 'react';

type HookScopeComponentProps = {
    useHook: (props: any) => void;
};

const HookScopeComponent: FC<HookScopeComponentProps> = ({ useHook, ...props }) => {
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

export const hookTestScope = (useHook: (props: any) => void, props: Object = {}): ReactWrapper => {
    mounted = mount(<HookScopeComponent {...props} useHook={useHook} />);
    return mounted;
};
