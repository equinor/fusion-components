import { createContext } from "react";
import {
    handleMessage,
    ensureContext,
    contextUpdated,
    FUSION_NAMED_CONTEXT_GLOBAL_PREFIX,
} from "./helpers";
import createProvider from "./createProvider";
import createConsumer from "./createConsumer";

window.addEventListener("message", e => {
    if (!e.data || e.origin !== window.location.origin) {
        return;
    }

    handleMessage(e.data);
});

export const createGlobalNamedContext = (name, defaultValue = null) => {
    const existingContext = ensureContext(name, defaultValue);
    contextUpdated(
        name,
        existingContext ? existingContext.value : defaultValue
    );

    return {
        Provider: createProvider(name),
        Consumer: createConsumer(
            name,
            existingContext ? existingContext.value : defaultValue
        ),
    };
};

export const createNamedContext = (name, defaultValue = null) => {
    if (!window[FUSION_NAMED_CONTEXT_GLOBAL_PREFIX + name]) {
        window[FUSION_NAMED_CONTEXT_GLOBAL_PREFIX + name] = createContext(
            defaultValue
        );
    }

    return window[FUSION_NAMED_CONTEXT_GLOBAL_PREFIX + name];
};
