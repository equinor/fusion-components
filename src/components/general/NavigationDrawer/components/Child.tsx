import React, { FC, useCallback, useMemo } from 'react';
import styles from './styles.less';
import { NavigationComponentProps } from '..';
import NavigationItem from './NavigationItem';

const Child: FC<NavigationComponentProps> = ({ navigationItem, onChange }) => {
    const { id, isActive, title, onClick } = navigationItem;

    const change = useCallback(() => {
        onChange && onChange(id, false, true);
        onClick && onClick();
    }, [onClick, id, isActive, onChange]);

    return (
        <NavigationItem type="child" isActive={isActive} onClick={change}>
             <div className={styles.linkContainer}>
                <span className={styles.linkText}>{title}</span>
            </div>
        </NavigationItem>
    );
};

export default Child;
