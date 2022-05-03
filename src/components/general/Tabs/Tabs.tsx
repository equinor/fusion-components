import styles from './styles.less';
import classNames from 'classnames';
import { useEventListener } from '@equinor/fusion-components';
import { useComponentDisplayClassNames } from '@equinor/fusion';
import { useRef, useState, useEffect, cloneElement, FC, Children, ReactElement } from 'react';

type TabsProps = {
    onChange: (tabKey: string) => void;
    activeTabKey: string;
    children: any;
    noScrollGradient?: boolean;
    stickyTabs?: boolean;
};

type TabContentType = {
    children: any;
    activeTabKey: string;
};

type GradientType = 'left' | 'right' | 'leftAndRight' | null;

const TabContent: FC<TabContentType> = ({ children, activeTabKey }) => {
    const active = Children.toArray(children).find(
        (child) => (child as ReactElement).props.tabKey === activeTabKey
    ) as ReactElement | null;
    if (!active) {
        return null;
    }

    const clonedChildren = Children.map(active.props.children, (child) => cloneElement(child));
    return <div className={styles.tabContent}>{clonedChildren}</div>;
};

const TabPane: FC<TabsProps> = ({ children, onChange, activeTabKey }) => {
    const tabsPaneRef = useRef<HTMLDivElement | null>(null);
    const activeTabRef = useRef<HTMLElement | null>(null);

    const checkForGradient = (): GradientType => {
        if (!tabsPaneRef.current) {
            return null;
        }

        const pane = tabsPaneRef.current;

        if (pane.scrollLeft === 0 && pane.offsetWidth < pane.scrollWidth) {
            return 'right';
        }

        if (pane.scrollLeft != 0 && pane.scrollLeft + pane.offsetWidth < pane.scrollWidth) {
            return 'leftAndRight';
        }
        if (pane.scrollLeft != 0 && pane.scrollLeft + pane.offsetWidth === pane.scrollWidth) {
            return 'left';
        }
        return null;
    };

    const [gradient, setGradient] = useState<GradientType>(checkForGradient);

    const containerClassNames = classNames(styles.tabsPane, useComponentDisplayClassNames(styles), {
        [styles.showGradientLeft]: gradient === 'left' || gradient === 'leftAndRight',
        [styles.showGradientRight]: gradient === 'right' || gradient === 'leftAndRight',
    });

    const scrollToTab = (tabRef: HTMLElement | null) => {
        if (!tabsPaneRef.current || !tabRef) {
            return;
        }
        const pane = tabsPaneRef.current;

        if (pane.scrollWidth === pane.offsetWidth) {
            return;
        }
        pane.scrollTo(tabRef.offsetLeft - pane.offsetWidth / 2 + tabRef.offsetWidth / 2, 0);
    };

    useEventListener(
        tabsPaneRef.current,
        'scroll',
        () => setGradient(checkForGradient),
        [tabsPaneRef.current, activeTabKey],
        { passive: true }
    );

    useEffect(() => {
        scrollToTab(activeTabRef.current);
        setGradient(checkForGradient);
    }, [activeTabKey, tabsPaneRef]);

    const clonedChildren = Children.map(children, (child) => {
        const { tabKey } = child.props;
        if (!tabKey) {
            return null;
        }
        return cloneElement(child, {
            onChange: (ref: HTMLElement) => {
                activeTabRef.current = ref;
                onChange(tabKey);
            },
            isCurrent: tabKey === activeTabKey,
        });
    });

    return (
        <div className={containerClassNames} ref={tabsPaneRef}>
            <div className={styles.gradientRight} />
            <div className={styles.gradientLeft} />
            {clonedChildren}
        </div>
    );
};

const Tabs: FC<TabsProps> = ({
    onChange,
    activeTabKey,
    noScrollGradient,
    children,
    stickyTabs = false,
}) => {
    const tabsClassNames = classNames(styles.tabs, useComponentDisplayClassNames(styles), {
        [styles.stickyTabs]: stickyTabs,
    });
    return (
        <div className={tabsClassNames}>
            <TabPane
                activeTabKey={activeTabKey}
                noScrollGradient={noScrollGradient}
                onChange={(tabKey) => onChange(tabKey)}
            >
                {children}
            </TabPane>

            <TabContent activeTabKey={activeTabKey}>{children}</TabContent>
        </div>
    );
};

Tabs.displayName = 'Tabs';

export default Tabs;
