import React, { FC, useCallback, useMemo } from 'react';
import styles from './styles.less';
import classNames from 'classnames';
import { NavigationComponentProps } from '..';

const Child: FC<NavigationComponentProps> = ({
    title,
    id,
    onClick,
    isActive,
    onChange,
    isCollapsed,
    icon,
}) => {
    const containerClassNames = classNames(
        styles.container,
        styles.menuChild,
        {
            [styles.isActive]: isActive,
            [styles.isCollapsed]: isCollapsed,
        }
    );
    const change = useCallback(() => {
        onChange && onChange(id, false, true);
        onClick && onClick();
    }, [onClick, id, isActive, onChange]);

    const content = useMemo(() => {
        if (isCollapsed) {
            return (
                <div className={styles.navigationIcon} onClick={change}>
                    {icon}
                </div>
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
