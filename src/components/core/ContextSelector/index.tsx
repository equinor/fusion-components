import * as React from 'react';
import {
    useContextManager,
    useCurrentContext,
    useComponentDisplayClassNames,
    useContextQuery,
    useCurrentApp,
    ContextType,
    useCurrentContextTypes,
} from '@equinor/fusion';
import * as styles from './styles.less';
import classNames from 'classnames';

import contextToDropdownSection, { formattedContextType } from './ContextToDropdownSection';
import { SearchableDropdownSection, SearchableDropdownOption } from 'components/general/SearchableDropdown';
import SearchIcon from 'components/icons/components/action/SearchIcon';
import Spinner from 'components/feedback/Spinner';
import IconButton from 'components/general/IconButton';
import CloseIcon from 'components/icons/components/navigation/CloseIcon';
import Dropdown, { useDropdownController } from 'components/general/Dropdown';
import Menu from 'components/general/Menu';

const mergeDropdownSectionItems = (sections: SearchableDropdownSection[]) =>
    sections.reduce(
        (acc: SearchableDropdownOption[], curr: SearchableDropdownSection) =>
            acc.concat(curr.items),
        []
    );

type SearchableContextDropdownOption = SearchableDropdownOption & {
    contextType: ContextType;
};

const ContextSelector: React.FC = () => {
    const [queryText, setQueryText] = React.useState('');
    const [dropdownSections, setDropdownSections] = React.useState<SearchableDropdownSection[]>([]);
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const currentContext = useCurrentContext();
    const { isQuerying, contexts, search } = useContextQuery();
    const contextManager = useContextManager();
    const currentContextTypes = useCurrentContextTypes();
    const currentApp = useCurrentApp();
    const contextManifest = currentApp?.context;

    React.useEffect(() => {
        setDropdownSections(
            contextToDropdownSection(contexts, queryText, isQuerying, currentContext)
        );
    }, [contexts, currentContext, queryText, isQuerying]);

    React.useEffect(() => {
        search(queryText);
    }, [queryText]);

    const onKeyUpCloseDropDown = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode !== 27) return; //ESC

        setIsOpen(false);
        setQueryText('');
    }, []);

    const dropdownControllerProps = React.useCallback(
        (ref, isOpen, setIsOpen) => {
            const selectedItem = React.useMemo(() => {
                const mergedItems = mergeDropdownSectionItems(dropdownSections);
                const selectedItem = mergedItems.find(option => option.isSelected === true);
                return selectedItem as SearchableContextDropdownOption;
            }, [dropdownSections]);

            const selectedValue = React.useMemo(() => {
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

            const onChangeQueryText = React.useCallback(
                (e: React.ChangeEvent<HTMLInputElement>) => {
                    setQueryText(e.target.value);
                },
                []
            );

            const onClickDropDown = React.useCallback(() => {
                !isOpen && setIsOpen(true);
            }, [isOpen]);

            const placeholder = React.useMemo(() => {
                return contextManifest?.placeholder
                    ? contextManifest.placeholder
                    : 'Search context';
            }, [contextManifest?.placeholder]);

            return (
                <>
                    <SearchIcon color="#DADADA" />
                    <input
                        type="text"
                        value={selectedValue}
                        onChange={onChangeQueryText}
                        onClick={onClickDropDown}
                        onKeyUp={onKeyUpCloseDropDown}
                        placeholder={selectedValue !== '' ? selectedValue : placeholder}
                        className={styles.searchInput}
                        ref={inputRef}
                    />
                    {isQuerying && <Spinner inline />}
                    {contextManifest?.nullable && (
                        <IconButton
                            disabled={!currentContext}
                            onClick={() => contextManager.setCurrentContextAsync(null)}
                        >
                            <CloseIcon />
                        </IconButton>
                    )}
                </>
            );
        },
        [queryText, currentContext, dropdownSections, contextManifest]
    );

    const dropdownController = useDropdownController(dropdownControllerProps);
    const { isOpen, setIsOpen, controllerRef } = dropdownController;

    const exchangeContext = React.useCallback(async () => {
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

    React.useEffect(() => {
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

    const onSelect = React.useCallback(
        item => {
            if (item.key && item.key === 'empty') {
                return;
            }
            if (isOpen) {
                const selectedContext = contexts.find(c => c.id === item.key);
                setIsOpen(false);
                setQueryText('');
                if (selectedContext) contextManager.setCurrentContextAsync(selectedContext);
            }
        },
        [isOpen, contexts]
    );

    const containerClassNames = classNames(styles.container, useComponentDisplayClassNames(styles));
    const containerRef = controllerRef as React.MutableRefObject<HTMLDivElement | null>;
    const helperText = React.useMemo(
        () => (!contexts.length && !isQuerying && !queryText ? 'Start typing to search' : null),
        [contexts, isQuerying, queryText, contextManifest]
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
