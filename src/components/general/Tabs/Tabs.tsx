import * as React from "react";
import * as PropTypes from "prop-types";
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

const TabContent = ({ children, activeTabKey } :TabContentType) => {
    const active = children.find(child => child.props.tabKey === activeTabKey);
    if (!active) {
        return null;
    }

    const clonedChildren = React.Children.map(active.props.children, child =>
        React.cloneElement(child)
    );
    return <React.Fragment>{clonedChildren}</React.Fragment>;
};

const TabPane = ({ children, onChange, activeTabKey }: TabsProps) => {
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

const Tabs = ({ onChange, activeTabKey, children }: TabsProps) => {
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

Tabs.displayName = "Tabs";

Tabs.propTypes = {
    activeTabKey: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,

    // Has to be Tab component
    children: PropTypes.node.isRequired,
};

export default Tabs;
