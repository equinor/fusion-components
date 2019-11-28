import * as React from 'react';
import {
    useContextManager,
    useCurrentContext,
    Context,
    useComponentDisplayClassNames,
    useContextQuery,
} from '@equinor/fusion';
import {
    SearchIcon,
    useDropdownController,
    Dropdown,
    Menu,
    SearchableDropdownSection,
    SearchableDropdownOption,
    Spinner,
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

    React.useEffect(() => {
        setDropdownSections(
            ContextToDropdownSection(contexts, queryText, isQuerying, currentContext)
        );
    }, [contexts, currentContext, queryText, isQuerying]);

    React.useEffect(() => {
        search(queryText);
    }, [queryText]);

    const setCurrentContextAsync = async (context?: Context) => {
        if (context) await contextManager.setCurrentContextAsync(context);
    };

    const onKeyUpCloseDropDown = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode !== 27) return; //ESC

        setIsOpen(false);
        setQueryText('');
    }, []);

    const dropdownControllerProps = React.useCallback((ref, isOpen, setIsOpen) => {
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

        return (
            <>
                <SearchIcon color="#DADADA" />
                <input
                    type="text"
                    value={selectedValue}
                    onChange={e => setQueryText(e.target.value)}
                    onClick={() => !isOpen && setIsOpen(true)}
                    onKeyUp={onKeyUpCloseDropDown}
                    placeholder={selectedValue !== '' ? selectedValue : 'Search contexts'}
                    className={styles.searchInput}
                    ref={inputRef}
                />
                {isQuerying && <Spinner inline />}
            </>
        );
    }, []);

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
                setCurrentContextAsync(selectedContext);
            }
        },
        [isOpen, contexts]
    );

    const containerClassNames = classNames(styles.container, useComponentDisplayClassNames(styles));
    const containerRef = controllerRef as React.MutableRefObject<HTMLDivElement | null>;
    const helperText = React.useMemo(
        () =>
            !contexts.length && !isQuerying && !queryText
                ? 'No contexts, please try the search bar above (Start typing to search)'
                : null,
        [contexts, isQuerying, queryText]
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
