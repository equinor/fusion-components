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

    const content = useMemo(() => {
        return (
            <div className={styles.linkContainer} onClick={change}>
                {title}
            </div>
        );
    }, [, title, onChange, isActive]);

    return (
        <NavigationItem type="child" isActive={isActive}>
            {content}
        </NavigationItem>
    );
};

export default Child;
