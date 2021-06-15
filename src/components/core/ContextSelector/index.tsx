import {
    useContextManager,
    useCurrentContext,
    useComponentDisplayClassNames,
    useContextQuery,
    useCurrentApp,
    useContextHistory,
    ContextType,
    useCurrentContextTypes,
} from '@equinor/fusion';
import {
    SearchIcon,
    useDropdownController,
    Dropdown,
    Menu,
    SearchableDropdownSection,
    SearchableDropdownOption,
    Spinner,
    IconButton,
    CloseIcon,
} from '@equinor/fusion-components';
import styles from './styles.less';
import classNames from 'classnames';

import contextToDropdownSection, { formattedContextType } from './ContextToDropdownSection';
import {
    useRef,
    useState,
    useEffect,
    useCallback,
    useMemo,
    FC,
    KeyboardEvent,
    ChangeEvent,
    MutableRefObject,
} from 'react';

const mergeDropdownSectionItems = (sections: SearchableDropdownSection[]) =>
    sections.reduce(
        (acc: SearchableDropdownOption[], curr: SearchableDropdownSection) =>
            acc.concat(curr.items),
        []
    );

type SearchableContextDropdownOption = SearchableDropdownOption & {
    contextType: ContextType;
};

const ContextSelector: FC = () => {
    const contextManager = useContextManager();
    const currentContext = useCurrentContext();
    const contextHistory = useContextHistory();
    const currentContextTypes = useCurrentContextTypes();
    const currentApp = useCurrentApp();
    const contextManifest = currentApp?.context;
    const { isQuerying, contexts, search } = useContextQuery();

    const inputRef = useRef<HTMLInputElement | null>(null);

    const [queryText, setQueryText] = useState('');
    const [dropdownSections, setDropdownSections] = useState<SearchableDropdownSection[]>([]);

    useEffect(() => {
        const selection = queryText && contexts.length ? contexts : contextHistory;

        setDropdownSections(
            contextToDropdownSection(selection, queryText, isQuerying, currentContext)
        );
    }, [contexts, currentContext, queryText, isQuerying, contextHistory]);

    useEffect(() => {
        search(queryText);
    }, [queryText]);

    const onKeyUpCloseDropDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode !== 27) return; //ESC

        setIsOpen(false);
        setQueryText('');
    }, []);

    const dropdownControllerProps = useCallback(
        (ref, isOpen, setIsOpen) => {
            const selectedItem = useMemo(() => {
                const mergedItems = mergeDropdownSectionItems(dropdownSections);
                const selectedItem = mergedItems.find((option) => option.isSelected === true);
                return selectedItem as SearchableContextDropdownOption;
            }, [dropdownSections]);

            const selectedValue = useMemo(() => {
                if (isOpen) {
                    return queryText;
                } else if (selectedItem) {
                    return `${selectedItem.title} (${formattedContextType(
                        selectedItem.contextType.id
                    )})`;
                } else if (currentContext) {
                    return `${currentContext.title} (${formattedContextType(
                        currentContext.type.id
                    )})`;
                }
                return '';
            }, [isOpen, queryText, selectedItem, currentContext]);

            const onChangeQueryText = useCallback((e: ChangeEvent<HTMLInputElement>) => {
                setQueryText(e.target.value);
                setIsOpen(true);
            }, []);

            const placeholder = useMemo(() => {
                return contextManifest?.placeholder
                    ? contextManifest.placeholder
                    : 'Search context';
            }, [contextManifest?.placeholder]);

            const hasFocus = inputRef.current === document.activeElement;

            return (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <SearchIcon color="#DADADA" />
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            value={queryText}
                            onFocus={() => setIsOpen(true)}
                            onChange={onChangeQueryText}
                            onKeyUp={onKeyUpCloseDropDown}
                            placeholder={placeholder}
                            style={{ opacity: hasFocus ? 1 : 0 }}
                            className={styles.searchContainer}
                            ref={inputRef}
                        />
                        <span
                            className={classNames(styles.searchInput, styles.overlay)}
                            style={{
                                opacity: hasFocus ? 0 : 1,
                                position: 'absolute',
                                left: inputRef.current?.offsetLeft,
                                top: inputRef.current?.offsetTop,
                                width: inputRef.current?.clientWidth,
                                lineHeight: inputRef.current?.clientHeight + 'px',
                                display: 'inline-block',
                                alignItems: 'center',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                            }}
                            onClick={() => inputRef.current?.focus()}
                        >
                            {selectedValue || placeholder}
                        </span>
                    </div>
                    {isQuerying && <Spinner inline />}
                    {contextManifest?.nullable && (
                        <IconButton
                            disabled={!currentContext}
                            onClick={() => contextManager.setCurrentContextAsync(null)}
                        >
                            <CloseIcon />
                        </IconButton>
                    )}
                </div>
            );
        },
        [queryText, currentContext, dropdownSections, contextManifest]
    );

    const dropdownController = useDropdownController(dropdownControllerProps);
    const { isOpen, setIsOpen, controllerRef } = dropdownController;

    const exchangeContext = useCallback(async () => {
        const alternatives = await contextManager.exchangeCurrentContextAsync(
            ...currentContextTypes
        );

        if (!alternatives || !alternatives.length) {
            return contextManager.setCurrentContextAsync(null);
        }

        if (alternatives.length === 1) {
            return contextManager.setCurrentContextAsync(alternatives[0]);
        }

        setDropdownSections(contextToDropdownSection(alternatives, '', false, currentContext));

        setIsOpen(true);
    }, [contextManager, currentContext, currentContextTypes]);

    useEffect(() => {
        if (!contextManifest || !currentContext) {
            return;
        }

        if (contextManifest.types.indexOf(currentContext.type.id) !== -1) {
            const appPath = `/apps/${currentApp.key}`;
            const scopedPath = window.location.pathname.replace(appPath, '');
            const expectedContextIdFromUrl = contextManifest.getContextFromUrl
                ? contextManifest.getContextFromUrl(scopedPath)
                : null;
            if (!expectedContextIdFromUrl || expectedContextIdFromUrl === currentContext.id) {
                contextManager.setCurrentContextAsync(currentContext);
            } else {
                contextManager.setCurrentContextIdAsync(expectedContextIdFromUrl);
            }
        } else {
            exchangeContext();
        }
    }, [currentApp, contextManifest, exchangeContext]);

    const onSelect = useCallback(
        (item) => {
            if (item.key && item.key === 'empty') {
                return;
            }
            if (isOpen) {
                const selection = queryText && contexts.length ? contexts : contextHistory;
                const selectedContext = selection.find((c) => c.id === item.key);
                setIsOpen(false);
                setQueryText('');
                if (selectedContext) {
                    contextManager.setCurrentContextAsync(selectedContext);
                } else {
                    contextManager.setCurrentContextIdAsync(item.key);
                }
            }
        },
        [isOpen, contexts, queryText, contextHistory]
    );

    const containerClassNames = classNames(styles.container, useComponentDisplayClassNames(styles));
    const containerRef = controllerRef as MutableRefObject<HTMLDivElement | null>;
    const helperText = useMemo(
        () =>
            !dropdownSections[0]?.items?.length && !isQuerying && !queryText
                ? 'Start typing to search'
                : null,
        [dropdownSections]
    );

    return (
        <div className={containerClassNames} ref={containerRef}>
            <Dropdown controller={dropdownController}>
                <div className={styles.dropdownContainer}>
                    {helperText ? (
                        <div className={styles.helperText}>{helperText}</div>
                    ) : (
                        <Menu
                            elevation={0}
                            onClick={onSelect}
                            keyboardNavigationRef={inputRef.current}
                            sections={dropdownSections}
                        />
                    )}
                </div>
            </Dropdown>
        </div>
    );
};

export default ContextSelector;
