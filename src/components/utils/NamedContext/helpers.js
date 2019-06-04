export const FUSION_NAMED_CONTEXT_GLOBAL_PREFIX = '__fusion_named_context:';
const FUSION_NAMED_CONTEXT_MOUNTED_EVENT_TYPE = 'FUSION_NAMED_CONTEXT_MOUNTED';
const FUSION_NAMED_CONTEXT_UNMOUNTED_EVENT_TYPE = 'FUSION_NAMED_CONTEXT_UNMOUNTED';
const FUSION_NAMED_CONTEXT_UPDATED_EVENT_TYPE = 'FUSION_NAMED_CONTEXT_UPDATED';

const getContextName = name => FUSION_NAMED_CONTEXT_GLOBAL_PREFIX + name;

export const ensureContext = (name, defaultValue) => {
    const contextName = getContextName(name);

    if (!window[contextName]) {
        window[contextName] = {
            listners: [],
            value: defaultValue,
            providers: 0,
            defaultValue,
        };
    }

    return window[contextName];
};

const notifyConsumers = name => {
    const context = ensureContext(name);
    context.listners.forEach(listner => listner(context.value));
};

export const handleMessage = message => {
    const mountedContext = ensureContext(message.context.name);

    switch (message.type) {
        case FUSION_NAMED_CONTEXT_UPDATED_EVENT_TYPE:
            notifyConsumers(message.context.name);
            break;

        case FUSION_NAMED_CONTEXT_MOUNTED_EVENT_TYPE:
            mountedContext.providers += 1;
            break;

        case FUSION_NAMED_CONTEXT_UNMOUNTED_EVENT_TYPE:
            // Defer unmounting of contexts incase we mounted a new one at the same time
            setTimeout(() => {
                const unmountedContext = ensureContext(message.context.name);
                unmountedContext.providers -= 1;
                if (!unmountedContext.providers) {
                    unmountedContext.value = unmountedContext.defaultValue;
                    notifyConsumers(message.context.name);
                }
            });

            break;
        default:
            break;
    }
};

export const contextUpdated = (name, value) => {
    const context = ensureContext(name, value);
    context.value = value;

    handleMessage(
        {
            type: FUSION_NAMED_CONTEXT_UPDATED_EVENT_TYPE,
            context: {
                name,
            },
        },
        window.location.origin
    );
};

export const contextMounted = name => {
    handleMessage(
        {
            type: FUSION_NAMED_CONTEXT_MOUNTED_EVENT_TYPE,
            context: {
                name,
            },
        },
        window.location.origin
    );
};

export const contextUnmounted = name => {
    handleMessage(
        {
            type: FUSION_NAMED_CONTEXT_UNMOUNTED_EVENT_TYPE,
            context: {
                name,
            },
        },
        window.location.origin
    );
};
