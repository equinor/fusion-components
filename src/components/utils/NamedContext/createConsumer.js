import { useState, useEffect } from "react";
import { ensureContext } from "./helpers";

const registerConsumer = (name, defaultValue, listner) => {
    const context = ensureContext(name, defaultValue);

    const { listners } = context;

    listners.push(listner);
    return () => listners.splice(listners.indexOf(listner), 1);
};

export default (name, defaultValue) => {
    const Consumer = ({ children }) => {
        const context = ensureContext(name, defaultValue);
        const [value, setValue] = useState(context.value);

        useEffect(() => registerConsumer(name, defaultValue, setValue), []);

        return children(value);
    };

    Consumer.displayName = "NamedContextConsumer";

    return Consumer;
};
