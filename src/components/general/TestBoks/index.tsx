import React, { FC, useRef, useState, useEffect, useCallback } from 'react';
import TextInput from './../TextInput';
import classNames from 'classnames';
import styles from './styles.less';
import { DropdownArrow } from '@equinor/fusion-components';
import { useComponentDisplayClassNames } from '@equinor/fusion';

type BoxButtonProps = {
    disabled?: boolean;
    label?: string;
    children?: React.ReactNode;
    isOpen: boolean;
    onClose: (isOpen: boolean) => void;
};

const BoxButton: FC<BoxButtonProps> = ({ onClose, disabled, label, children, isOpen }) => {
    const toggleOpen = useCallback(() => {
        onClose(!isOpen);
    }, [isOpen]);

    const headerClassNames = classNames(styles.header, useComponentDisplayClassNames(styles), {
        [styles.isOpen]: isOpen,
        [styles.disabled]: disabled,
    });

    return (
        <div className={styles.buttonContainer}>
            <div className={styles.buttonBox}>
                <div />
            </div>
        </div>
    );
};

export default BoxButton;
