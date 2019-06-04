import * as React from 'react';
import * as styles from './styles.less';

type TabsProps = {
    onChange: (tabKey: string) => void;
    activeTabKey: string;
    children: any;
};

type TabContentType = {
    children: any;
    activeTabKey: string;
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
    return <React.Fragment>{clonedChildren}</React.Fragment>;
};

const TabPane: React.FC<TabsProps> = ({ children, onChange, activeTabKey }) => {
    const clonedChildren = React.Children.map(children, child => {
        const { title, tabKey } = child.props;
        if (!title || !tabKey) {
            return null;
        }
        return React.cloneElement(child, {
            onChange: () => onChange(tabKey),
            isCurrent: tabKey === activeTabKey,
        });
    });

    return <React.Fragment>{clonedChildren}</React.Fragment>;
};

const Tabs: React.FC<TabsProps> = ({ onChange, activeTabKey, children }) => {
    return (
        <div className={styles.tabs}>
            <div className={styles.tabsPane}>
                <TabPane
                    children={children}
                    activeTabKey={activeTabKey}
                    onChange={tabKey => onChange(tabKey)}
                />
            </div>
            <div className={styles.tabContent}>
                <TabContent children={children} activeTabKey={activeTabKey} />
            </div>
        </div>
    );
};

Tabs.displayName = 'Tabs';

export default Tabs;
