import React, { useState, useRef, useCallback, FC } from 'react';
import classNames from 'classnames';
import {
    useClickOutsideOverlayPortal,
    RelativeOverlayPortal,
    useElevationClassName,
} from '@equinor/fusion-components';
import styles from './styles.less';

export type DropdownController = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    node: React.ReactNode;
    controllerRef: React.MutableRefObject<HTMLElement | null>;
};
type DropdownJustification = 'left' | 'right';

type DropdownProps = {
    controller: DropdownController;
    justification?: DropdownJustification;
};

export const useDropdownController = (
    controller: (
        ref: React.MutableRefObject<HTMLElement | null>,
        isOpen: boolean,
        setIsOpen: (isOpen: boolean) => void
    ) => React.ReactNode
): DropdownController => {
    const [isOpen, setIsOpen] = useState(false);
    const controllerRef = useRef<HTMLElement | null>(null);

    return {
        isOpen,
        setIsOpen,
        node: controller(controllerRef, isOpen, setIsOpen),
        controllerRef,
    };
};

const Dropdown: FC<DropdownProps> = ({ controller, justification, children }) => {
    const { isOpen, setIsOpen, node, controllerRef } = controller;

    const close = useCallback(() => isOpen && setIsOpen(false), [isOpen]);
    useClickOutsideOverlayPortal(close, controllerRef.current);

    const dropdownContainerClassNames = classNames(
        styles.dropdownContainer,
        useElevationClassName(2),{
            [styles.justifyLeft]: justification === 'left',
            [styles.justifyRight]: justification === 'right',
        }
    );

    return (
        <>
            {node}
            <RelativeOverlayPortal relativeRef={controllerRef} show={isOpen}>
                <div className={dropdownContainerClassNames}>{children}</div>
            </RelativeOverlayPortal>
        </>
    );
};

export default Dropdown;
