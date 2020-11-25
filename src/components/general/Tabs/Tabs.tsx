import * as React from 'react';
import * as styles from './styles.less';
import classNames from 'classnames';
import { PaginationSkeleton } from '../Pagination';
import { useEventListener } from '@equinor/fusion-components';
import { useComponentDisplayClassNames } from '@equinor/fusion';

type TabsProps = {
    onChange: (tabKey: string) => void;
    activeTabKey: string;
    children: any;
    noScrollGradient?: boolean;
};

type TabContentType = {
    children: any;
    activeTabKey: string;
};

type GradientType = 'left' | 'right' | 'leftAndRight' | null;

const TabContent: React.FC<TabContentType> = ({ children, activeTabKey }) => {
    const active = React.Children.toArray(children).find(
        (child) => (child as React.ReactElement).props.tabKey === activeTabKey
    ) as React.ReactElement | null;
    if (!active) {
        return null;
    }

    const clonedChildren = React.Children.map(active.props.children, (child) =>
        React.cloneElement(child)
    );
    return <div className={styles.tabContent}>{clonedChildren}</div>;
};

const TabPane: React.FC<TabsProps> = ({ children, onChange, activeTabKey, noScrollGradient }) => {
    const tabsPaneRef = React.useRef<HTMLDivElement | null>(null);
    const activeTabRef = React.useRef<HTMLElement | null>(null);

    const checkForGradient = (): GradientType => {
        if (noScrollGradient || !tabsPaneRef.current) return null;

        const { scrollLeft, offsetWidth, scrollWidth } = tabsPaneRef.current;

        if (scrollLeft === 0 && offsetWidth < scrollWidth) return 'right';

        if (scrollLeft != 0 && scrollLeft + offsetWidth < scrollWidth) return 'leftAndRight';

        if (scrollLeft != 0 && scrollLeft + offsetWidth === scrollWidth) return 'left';

        return null;
    };

    const [gradient, setGradient] = React.useState<GradientType>(checkForGradient);

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

    useEventListener(tabsPaneRef.current, 'scroll', () => setGradient(checkForGradient), [
        tabsPaneRef.current,
        activeTabKey,
    ]);

    React.useEffect(() => {
        scrollToTab(activeTabRef.current);
        setGradient(checkForGradient);
    }, [activeTabKey, tabsPaneRef]);

    const clonedChildren = React.Children.map(children, (child) => {
        const { tabKey } = child.props;
        if (!tabKey) {
            return null;
        }
        return React.cloneElement(child, {
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

const Tabs: React.FC<TabsProps> = ({ onChange, activeTabKey, noScrollGradient, children }) => {
    return (
        <div className={styles.tabs}>
            <TabPane
                children={children}
                activeTabKey={activeTabKey}
                noScrollGradient={noScrollGradient}
                onChange={(tabKey) => onChange(tabKey)}
            />

            <TabContent children={children} activeTabKey={activeTabKey} />
        </div>
    );
};

Tabs.displayName = 'Tabs';

export default Tabs;
