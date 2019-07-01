import * as React from 'react';
import {
    ContextTypes,
    useContextManager,
    useCurrentContext,
    Context,
    useComponentDisplayType,
    ComponentDisplayType,
} from '@equinor/fusion';
import useContextSearchResults from './useContextSearchResults';
import classNames from 'classnames';
import styles from './styles.less';
import { SearchIcon } from '../../icons/components/action';
import { Spinner } from 'index';

type ContextSelectorProps = {
    types: ContextTypes[];
};

const ContextSelector: React.FC<ContextSelectorProps> = ({ types }: ContextSelectorProps) => {
    const [shouldShowResultsDropdown, setShouldShowResultsDropdown] = React.useState(false);
    const [queryText, setQueryText] = React.useState('');
    const [relatedContexts, setRelatedContexts] = React.useState<Context[]>([]);
    const [isFetchingRelatedContexts, setIsFetchingRelatedContexts] = React.useState(false);
    const [inputRef, setInputRef] = React.useState<HTMLElement | null>(null);
    const contextManager = useContextManager();
    const currentContext = useCurrentContext();
    const currentContextForType = useCurrentContext(...types);

    const exchangeCurrentContext = async () => {
        setIsFetchingRelatedContexts(true);

        try {
            const possibleContexts = await contextManager.exchangeCurrentContextAsync(...types);
            const linkedContext = currentContext
                ? await contextManager.getLinkedContextAsync(currentContext)
                : null;

            setIsFetchingRelatedContexts(false);

            if (possibleContexts.length === 1) {
                return contextManager.setCurrentContextAsync(possibleContexts[0]);
            }

            const linkedContextIsRelevant =
                linkedContext &&
                types.find(type => linkedContext.type.id === type) &&
                possibleContexts.find(c => c.id === linkedContext.id);
            if (linkedContext && linkedContextIsRelevant) {
                return contextManager.setCurrentContextAsync(linkedContext);
            }

            if (!possibleContexts.length) {
                return;
            }

            // Try to resolve a related context from the history
            const history = await contextManager.getAsync('history');
            if (history !== null && history.length > 0) {
                const fromHistory = history.filter(
                    c => c && possibleContexts.find(pc => pc.id === c.id)
                );

                if (fromHistory.length === 1) {
                    return contextManager.setCurrentContextAsync(fromHistory[0]);
                }
            }

            setRelatedContexts(possibleContexts);
        } catch {
            setIsFetchingRelatedContexts(false);
        }

        if (inputRef) {
            inputRef.focus();
        }
    };

    React.useEffect(() => {
        if (currentContext && !types.find(type => currentContext.type.id === type)) {
            exchangeCurrentContext();
        }
    }, [currentContext, types]);

    const setCurrentContextAsync = async (context?: Context) => {
        if (context) {
            await contextManager.setCurrentContextAsync(context);
            setQueryText('');
            setRelatedContexts([]);
            setShouldShowResultsDropdown(false);
        }
    };

    const onSearchChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setQueryText(e.target.value);
    }, []);

    const onOpen = React.useCallback(() => setShouldShowResultsDropdown(true), []);
    const onClose = React.useCallback(() => {
        setShouldShowResultsDropdown(false);
        setQueryText('');
    }, []);

    const onKeyUp = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 27) {
            // ESC
            onClose();
        }
    }, []);

    React.useEffect(() => {
        if (shouldShowResultsDropdown && inputRef) {
            inputRef.focus();
        }
    }, [shouldShowResultsDropdown, inputRef]);

    const containerRef = React.useRef<HTMLDivElement>(null);

    const isQuerying = useContextSearchResults(
        inputRef,
        containerRef,
        types,
        relatedContexts,
        setCurrentContextAsync,
        queryText,
        shouldShowResultsDropdown,
        onClose
    );

    const inputClassNames = classNames(styles.searchInput, {
        [styles.focus]: shouldShowResultsDropdown,
    });

    const getButtonContent = () => {
        if (currentContextForType) {
            return currentContextForType.title;
        }

        if (isFetchingRelatedContexts) {
            return (
                <span>
                    Resolving {currentContext ? currentContext.title : null} <Spinner inline />
                </span>
            );
        }

        if (currentContext && !isFetchingRelatedContexts) {
            return `Unable to resolve ${currentContext.title}. Please select context`;
        }

        return 'Select context';
    };

    const componentDisplayType = useComponentDisplayType();
    const containerClassNames = classNames(styles.container, {
        [styles.comfortable]: componentDisplayType === ComponentDisplayType.Comfortable,
        [styles.compact]: componentDisplayType === ComponentDisplayType.Compact,
    });

    return (
        <div ref={containerRef} onClick={onOpen} className={containerClassNames}>
            <SearchIcon color="#DADADA" />
            {shouldShowResultsDropdown ? (
                <>
                    <input
                        ref={setInputRef}
                        type="text"
                        value={queryText}
                        onChange={onSearchChange}
                        onKeyUp={onKeyUp}
                        placeholder={'Search'}
                        className={inputClassNames}
                    />
                    {isQuerying && <Spinner inline />}
                </>
            ) : (
                <button className={styles.contextButton}>{getButtonContent()}</button>
            )}
        </div>
    );
};

export default ContextSelector;
