import * as React from "react";
import { mount } from "enzyme";

const HookScopeComponent = ({ useHook, ...props }) => {
    useHook(props);
    return null;
};

let mounted = null;

afterEach(() => {
    // Clean up after each test
    if (mounted && mounted.exists()) {
        mounted.unmount();
    }
});

export const hookTestScope = (useHook: Function, props: Object = {}) => {
    mounted = mount(<HookScopeComponent {...props} useHook={useHook} />);
    return mounted;
};
