import React, { FC, useCallback, useMemo } from 'react';
import styles from './styles.less';
import classNames from 'classnames';
import { NavigationComponentProps } from '..';
import CollapsedIcon from './CollapsedIcon';

const Child: FC<NavigationComponentProps> = ({ navigationItem, onChange, isCollapsed }) => {
    const { id, isActive, icon, title, onClick } = navigationItem;

    const containerClassNames = classNames(styles.container, styles.menuChild, {
        [styles.isActive]: isActive,
        [styles.isCollapsed]: isCollapsed,
    });
    const change = useCallback(() => {
        onChange && onChange(id, false, true);
        onClick && onClick();
    }, [onClick, id, isActive, onChange]);

    const content = useMemo(() => {
        if (isCollapsed) {
            return (
                <CollapsedIcon onClick={change} title={title}>
                    {icon}
                </CollapsedIcon>
            );
        }
        return (
            <div className={styles.linkContainer} onClick={change}>
                {title}
            </div>
        );
    }, [isCollapsed, icon, title, onChange, isActive]);

    return (
        <div className={containerClassNames}>
            {content}
            <div className={styles.visualOnClickContainer} />
        </div>
    );
};

export default Child;
