import { createContext, Component } from "react";
import PropTypes from "prop-types";
import global from "global";

const FUSION_NAMED_CONTEXT_GLOBAL_PREFIX = "__fusion_named_context:";
const FUSION_NAMED_CONTEXT_MOUNTED_EVENT_TYPE = "FUSION_NAMED_CONTEXT_MOUNTED";
const FUSION_NAMED_CONTEXT_UNMOUNTED_EVENT_TYPE = "FUSION_NAMED_CONTEXT_UNMOUNTED";
const FUSION_NAMED_CONTEXT_UPDATED_EVENT_TYPE = "FUSION_NAMED_CONTEXT_UPDATED";

const getContextName = name => FUSION_NAMED_CONTEXT_GLOBAL_PREFIX + name;

const ensureContext = (name, defaultValue) => {
    const contextName = getContextName(name);

    if(!global[contextName]) {
        global[contextName] = {
            listners: [],
            value: defaultValue,
            providers: 0,
            defaultValue,
        };
    }

    return global[contextName];
};

const registerConsumer = (name, defaultValue, listner) => {
    const context = ensureContext(name, defaultValue);

    const { listners } = context;

    listners.push(listner);
    return () => listners.splice(listners.indexOf(listner), 1);
};

const notifyConsumers = name => {
    const context = ensureContext(name);
    context.listners.forEach(listner => listner(context.value));
};

const handleMessage = message => {
    switch(message.type) {
        case FUSION_NAMED_CONTEXT_UPDATED_EVENT_TYPE:
            notifyConsumers(message.context.name);
            break;

        case FUSION_NAMED_CONTEXT_MOUNTED_EVENT_TYPE:
            const mountedContext = ensureContext(message.context.name);
            mountedContext.providers++;
            break;

        case FUSION_NAMED_CONTEXT_UNMOUNTED_EVENT_TYPE:
            // Defer unmounting of contexts incase we mounted a new one at the same time
            setTimeout(() => {
                const unmountedContext = ensureContext(message.context.name);
                unmountedContext.providers--;
                if(!unmountedContext.providers) {
                    unmountedContext.value = unmountedContext.defaultValue;
                    notifyConsumers(message.context.name);
                }
            });

            break;
    }
};

const contextUpdated = (name, value) => {
    const context = ensureContext(name, value);
    context.value = value;

    handleMessage({
        type: FUSION_NAMED_CONTEXT_UPDATED_EVENT_TYPE,
        context: {
            name,
        },
    }, global.location.origin);
};

const contextMounted = name => {
    handleMessage({
        type: FUSION_NAMED_CONTEXT_MOUNTED_EVENT_TYPE,
        context: {
            name,
        },
    }, global.location.origin);
};

const contextUnmounted = name => {
    handleMessage({
        type: FUSION_NAMED_CONTEXT_UNMOUNTED_EVENT_TYPE,
        context: {
            name,
        },
    }, global.location.origin);
};

const createProvider = name => {
    return class NamedContextProvider extends Component {
        static propTypes = {
            value: PropTypes.any.isRequired,
        };

        componentDidMount() {
            contextMounted(name);
            contextUpdated(name, this.props.value);
        }

        componentDidUpdate(prevProps) {
            const { value } = this.props;

            if(value !== prevProps.value) {
                contextUpdated(name, value);
            }
        }

        componentWillUnmount() {
            contextUnmounted(name);
        }

        render() {
            return this.props.children;
        }
    }
};

const createConsumer = (name, defaultValue) => {
    return class NamedContextConsumer extends Component {
        constructor(props) {
            super(props);

            const context = ensureContext(name, defaultValue);

            this.state = {
                value: context.value,
            };
        }

        componentDidMount() {
            this.unregisterConsumer = registerConsumer(name, defaultValue, value => {
                this.setState({ value });
            });
        }

        componentWillUnmount() {
            this.unregisterConsumer();
        }

        render() {
            return this.props.children(this.state.value);
        }
    }
};



global.addEventListener("message", e => {
    if(!e.data || e.origin !== global.location.origin) {
        return;
    }

    handleMessage(e.data);
});

export const createGlobalNamedContext = (name, defaultValue = null) => {
    const existingContext = ensureContext(name, defaultValue);
    contextUpdated(name, existingContext ? existingContext.value : defaultValue);

    return {
        Provider: createProvider(name),
        Consumer: createConsumer(name, existingContext ? existingContext.value : defaultValue),
    };
};

export const createNamedContext = (name, defaultValue = null) => {
    if(!global[FUSION_NAMED_CONTEXT_GLOBAL_PREFIX + name]) {
        global[FUSION_NAMED_CONTEXT_GLOBAL_PREFIX + name] = createContext(defaultValue);
    }

    return global[FUSION_NAMED_CONTEXT_GLOBAL_PREFIX + name];
};