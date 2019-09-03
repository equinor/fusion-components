import React from 'react';
import classNames from 'classnames';
import styles from './styles.less';

type NavigationItemProps = {
    children: any;
    isActive?: boolean;
    isCollapsed?: boolean;
    type: 'child' | 'section' | 'grouping';
};

const NavigationItem = ({ children, isActive, isCollapsed, type }: NavigationItemProps) => {
    const containerClassNames = classNames(styles.container, {
        [styles.isActive]: isActive,
        [styles.isCollapsed]: isCollapsed,
        [styles.menuSection]: type === 'section',
        [styles.menuChild]: type === 'child',
        [styles.menuGrouping]: type === 'grouping',
    });

    return (
        <div className={containerClassNames}>
            {children}
            <div className={styles.visualOnClickContainer} />
        </div>
    );
};
export default NavigationItem;
