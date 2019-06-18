import * as React from "react";
import {
    useContextQuery,
    ContextTypes,
    useContextManager,
    useCurrentContext,
    Context
} from "@equinor/fusion";
import Menu from "../../../components/general/Menu";
import usePopoverRef from "../../../hooks/usePopoverRef";

type ContextSelectorProps = {
    type: ContextTypes,
};

const ContextSelector: React.FC<ContextSelectorProps> = ({ type }: ContextSelectorProps) => {
    const [resultsIsOpen, setResultsIsOpen] = React.useState(false);
    const [queryText, setQueryText] = React.useState("");
    const [relatedContexts, setRelatedContexts] = React.useState<Context[]>([]);
    const [inputRef, setInputRef] = React.useState<HTMLElement | null>(null);
    const [queryError, isQuerying, contexts, queryContexts] = useContextQuery(type);
    const contextManager = useContextManager();
    const currentContext = useCurrentContext();
    const currentContextForType = useCurrentContext(type);

    const exchangeCurrentContext = async () => {
        const possibleContexts = await contextManager.exchangeCurrentContextAsync(type);

        if(!possibleContexts.length) {
            return;
        }

        if(possibleContexts.length === 1) {
            return contextManager.setCurrentContextAsync(possibleContexts[0]);
        }

        // TODO: Present context selector for the possible contexts
        setRelatedContexts(possibleContexts);
    };

    React.useEffect(() => {
        if(currentContext && currentContext.type.id !== type) {
            exchangeCurrentContext();
        }
    }, [currentContext, type]);

    const setCurrentContextAsync = async context => {
        if (context) {
            await contextManager.setCurrentContextAsync(context);
            setQueryText("");
            setRelatedContexts([]);
        }
    };

    const onSelectContext = item => {
        const context = [...contexts, ...relatedContexts].find(context => context.id === item.key);
        setCurrentContextAsync(context);
    };

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQueryText(e.target.value);
        queryContexts(e.target.value);
    };

    const mapContextToMenuItem = context => ({
        key: context.id,
        title: context.title,
        isSelected: currentContext ? context.id === currentContext.id : false,
    });

    const searchResultSection = {
        key: "search results",
        items: contexts.map(mapContextToMenuItem),
    };

    const exchangeContextSection = {
        key: "exchange context",
        title: currentContext ? `Exchange ${currentContext.title} with one of the following:` : "Select context",
        items: relatedContexts.map(mapContextToMenuItem),
    };

    const sections = [exchangeContextSection, searchResultSection];
    const sectionsWithContent = sections.filter(section => section.items.length);

    React.useEffect(() => {
        setResultsIsOpen(queryText.length !== 0 || relatedContexts.length !== 0);
    }, [relatedContexts]);

    const popoverContent = (
        <Menu
            sections={sectionsWithContent}
            onClick={onSelectContext}
            keyboardNavigationRef={inputRef}
            elevation={0}
        />
    );

    const popoverRef = usePopoverRef<HTMLDivElement>(popoverContent);

    return (
        <div ref={popoverRef}>
            <h2>Current: {currentContextForType ? currentContextForType.title : "None"}</h2>
            <input ref={setInputRef} type="text" value={queryText} onChange={onSearchChange} />
            {/* {resultsIsOpen && (
                <Menu
                    sections={sectionsWithContent}
                    onClick={onSelectContext}
                    keyboardNavigationRef={inputRef}
                />
            )} */}
        </div>
    );
};

export default ContextSelector;
