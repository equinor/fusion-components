import * as React from "react";
import * as styles from "./styles.less";

type TabsProps = {
    onChange: (tabKey: string) => void,
    activeTabKey: string,
    children: any,
};

type TabContentType = {
    children: any,
    activeTabKey: string,
};

const TabContent: React.FC<TabContentType> = ({ children, activeTabKey }) => {
    const active = React.Children.toArray(children).find(
        child => child.props.tabKey === activeTabKey
    );
    if (!active) {
        return null;
    }

    const clonedChildren = React.Children.map(active.props.children, child =>
        React.cloneElement(child)
    );
    return <div className={styles.tabContent}>{clonedChildren}</div>;
};

const TabPane: React.FC<TabsProps> = ({ children, onChange, activeTabKey }) => {
    const tabsPaneRef = React.useRef<HTMLDivElement | null>(null);

    const scrollToTab = (tabRef: any) => {
        if (!tabsPaneRef.current || !tabRef.current) {
            return;
        }
        const pane = tabsPaneRef.current;
        const tab = tabRef.current;

        if (pane.scrollWidth === pane.offsetWidth) {
            return;
        }
        pane.scrollTo(tab.offsetLeft - pane.offsetWidth / 2 + tab.offsetWidth / 2, 0);
    };

    const clonedChildren = React.Children.map(children, child => {
        const { title, tabKey } = child.props;
        if (!title || !tabKey) {
            return null;
        }
        return React.cloneElement(child, {
            onChange: () => onChange(tabKey),
            onCurrent: (ref: any) => scrollToTab(ref),
            isCurrent: tabKey === activeTabKey,
        });
    });

    return (
        <div className={styles.tabsPane} ref={tabsPaneRef}>
            {clonedChildren}
        </div>
    );
};

const Tabs: React.FC<TabsProps> = ({ onChange, activeTabKey, children }) => {
    return (
        <div className={styles.tabs}>
            <TabPane
                children={children}
                activeTabKey={activeTabKey}
                onChange={tabKey => onChange(tabKey)}
            />

            <TabContent children={children} activeTabKey={activeTabKey} />
        </div>
    );
};

Tabs.displayName = "Tabs";

export default Tabs;
