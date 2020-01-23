import * as React from 'react';
import {
    useContextManager,
    useCurrentContext,
    useComponentDisplayClassNames,
    useContextQuery,
    useCurrentApp,
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
import * as styles from './styles.less';
import classNames from 'classnames';

import ContextToDropdownSection from './ContextToDropdownSection';

const mergeDropdownSectionItems = (sections: SearchableDropdownSection[]) =>
    sections.reduce(
        (acc: SearchableDropdownOption[], curr: SearchableDropdownSection) =>
            acc.concat(curr.items),
        []
    );

const ContextSelector: React.FC = () => {
    const [queryText, setQueryText] = React.useState('');
    const [dropdownSections, setDropdownSections] = React.useState<SearchableDropdownSection[]>([]);
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const currentContext = useCurrentContext();
    const { isQuerying, contexts, search } = useContextQuery();
    const contextManager = useContextManager();
    const contextManifest = useCurrentApp()?.context;

    React.useEffect(() => {
        setDropdownSections(
            ContextToDropdownSection(contexts, queryText, isQuerying, currentContext)
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
                return selectedItem;
            }, [dropdownSections]);

            const selectedValue = React.useMemo(() => {
                if (isOpen) {
                    return queryText;
                } else if (selectedItem) {
                    return selectedItem.title;
                } else if (currentContext) {
                    return currentContext.title;
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
                    {helperText ? <div className={styles.helperText}>{helperText}</div> : null}
                    <Menu
                        elevation={0}
                        onClick={onSelect}
                        keyboardNavigationRef={inputRef.current}
                        sections={dropdownSections}
                    />
                </div>
            </Dropdown>
        </div>
    );
};

export default ContextSelector;
