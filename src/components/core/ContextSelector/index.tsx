import * as React from "react";
import {
    useContextQuery,
    ContextTypes,
    useContextManager,
    useCurrentContext,
} from "@equinor/fusion";
import Menu from "../../../components/general/Menu";

type ContextSelectorProps = {
    type: ContextTypes,
};

const ContextSelector: React.FC<ContextSelectorProps> = props => {
    const [queryText, setQueryText] = React.useState("");
    const [inputRef, setInputRef] = React.useState<HTMLElement | null>(null);
    const [contexts, queryContexts] = useContextQuery(props.type);
    const contextManager = useContextManager();
    const currentContext = useCurrentContext();

    const setCurrentContextAsync = async context => {
        if (context) {
            await contextManager.setCurrentContextAsync(context);
            setQueryText("");
        }
    };

    const onSelectContext = item => {
        const context = contexts.find(context => context.id === item.key);
        setCurrentContextAsync(context);
    };

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQueryText(e.target.value);
        queryContexts(e.target.value);
    };

    const sections = [{
        key: "search results",
        items: contexts.map(context => ({
            key: context.id,
            title: context.title,
            isSelected: currentContext ? context.id === currentContext.id : false,
        })),
    }];

    return (
        <div>
            <h2>Current: {currentContext ? currentContext.title : "None"}</h2>
            <input ref={setInputRef} type="text" value={queryText} onChange={onSearchChange} />
            {queryText && contexts.length !== 0 && (
                <Menu
                    sections={sections}
                    onClick={onSelectContext}
                    keyboardNavigationRef={inputRef}
                />
            )}
        </div>
    );
};

export default ContextSelector;
