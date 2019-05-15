import * as React from "react";
import * as PropTypes from "prop-types";
import * as styles from "./styles.less";

const Tabs = ({ onTabClick, activeTabKey, children }) => {
    const renderTabContent = () => {
        const active = children.find(child => child.props.tabKey === activeTabKey);
        if (!active) {
            return null;
        }

        return React.Children.map(active.props.children, child => React.cloneElement(child));
    };
    const renderTabPane = () => {
        return React.Children.map(children, child => {
            const { title, tabKey } = child.props;
            if (!title || !tabKey) {
                return null;
            }
            return React.cloneElement(child, {
                onTabClick: () => onTabClick(tabKey),
                isCurrent: tabKey === activeTabKey,
            });
        });
    };

    return (
        <div className={styles.tabs}>
            <div className={styles.tabsPane}>{renderTabPane()}</div>
            <div className={styles.tabContent}>{renderTabContent()}</div>
        </div>
    );
};

Tabs.displayName = "Tabs";

Tabs.propTypes = {
    activeTabKey: PropTypes.string.isRequired,
    onTabClick: PropTypes.func.isRequired,
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            tabKey: PropTypes.string.isRequired,
            title: PropTypes.string,
            disabled: PropTypes.bool,
        })
    ),
};

export default Tabs;
