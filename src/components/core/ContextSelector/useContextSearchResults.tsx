import * as React from 'react';
import {
    useContextQuery,
    ContextTypes,
    useContextManager,
    useCurrentContext,
    Context,
} from '@equinor/fusion';
import Menu, { MenuSection } from '../../general/Menu';
import useRelativePortal from '../../../hooks/useRelativePortal';
import useClickOutsideOverlayPortal from '../../../hooks/useClickOutsideOverlayPortal';
import useElevationClassName from '../../../hooks/useElevationClassName';
import classNames from 'classnames';
import styles from "./styles.less";

export default (
    inputRef: HTMLElement | null,
    containerRef: React.RefObject<HTMLElement>,
    types: ContextTypes[],
    relatedContexts: Context[],
    setCurrentContextAsync: (context: Context | undefined) => Promise<void>,
    queryText: string,
    shouldShow: boolean,
    onClose: () => void
): boolean => {
    const currentContext = useCurrentContext();
    const contextManager = useContextManager();
    const popoverRef = React.useRef(null);
    const [queryError, isQuerying, contexts, queryContexts] = useContextQuery(...types);
    const [history, setHistory] = React.useState<Context[]>([]);

    React.useEffect(() => {
        queryContexts(queryText);
    }, [queryText]);

    React.useEffect(() => {
        contextManager.getAsync('history').then(history => {
            if (!history) {
                return;
            }

            setHistory(history.filter(c => types.find(type => c.type.id === type)));
        });
    }, [currentContext]);

    const mapContextToMenuItem = (context: Context) => ({
        key: context.id,
        title: context.title,
        aside: context.type.id, // TODO: Should get a displayName from the backend in the future
        isSelected: currentContext ? context.id === currentContext.id : false,
    });

    const sections: MenuSection[] = [];

    // Add context search result to results menu sections
    if (contexts.length && queryText.length) {
        sections.push({
            key: 'search results',
            title: relatedContexts.length > 0 || history.length > 0 ? 'Search results' : '',
            items: contexts.map(mapContextToMenuItem),
        });
    }

    // Add related contexts to results menu sections
    if (relatedContexts.length) {
        sections.push({
            key: 'exchange context',
            title: currentContext
                ? `Exchange ${currentContext.title} with one of the following:`
                : 'Select context',
            items: relatedContexts.map(mapContextToMenuItem),
        });
    }

    // Add context history to results menu sections if nothing else is displayed
    if (history.length && shouldShow && (queryText.length === 0 || isQuerying) && sections.length === 0) {
        sections.push({
            key: 'history',
            title: 'Recent searches',
            items: history.map(mapContextToMenuItem),
        });
    }

    const onSelectContext = React.useCallback(
        item => {
            const context = [...contexts, ...relatedContexts, ...history].find(
                context => context.id === item.key
            );
            setCurrentContextAsync(context);
        },
        [contexts, relatedContexts, history, contextManager]
    );

    const [showNoResultsMessage, setShowNoResultsMessage] = React.useState(false);
    React.useEffect(() => {
        setShowNoResultsMessage(!isQuerying && queryText.length > 2);
    }, [isQuerying, queryText]);

    const getPopoverContent = () => {
        if (sections.length) {
            return (
                <Menu
                    sections={sections}
                    onClick={onSelectContext}
                    keyboardNavigationRef={inputRef}
                />
            );
        }

        if(showNoResultsMessage) {
            const noResultsClassNames = classNames(styles.noResultsMessage, useElevationClassName(2));
            return (
                <div className={noResultsClassNames}>
                    <h5>No results for <strong>{queryText}</strong></h5>
                </div>
            );
        }
    };

    const popoverContent = (
        <div
            ref={popoverRef}
            className={styles.popover}
        >
            {getPopoverContent()}
        </div>
    );

    useRelativePortal(
        popoverContent,
        containerRef,
        shouldShow || (queryText.length > 0 && contexts.length > 0) || relatedContexts.length > 0
    );

    useClickOutsideOverlayPortal(onClose, popoverRef.current, containerRef.current);

    return isQuerying;
};
