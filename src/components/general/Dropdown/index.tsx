import React, { useState, useRef, useCallback, FC, useMemo, useEffect } from 'react';
import classNames from 'classnames';
import {
    useClickOutsideOverlayPortal,
    RelativeOverlayPortal,
    useElevationClassName,
    useRelativePositioning,
} from '@equinor/fusion-components';
import styles from './styles.less';
import { enqueueAsyncOperation, AsyncOperation } from '@equinor/fusion';

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

const useLoop = (handler: AsyncOperation<void>, dependencies: any[] = []) => {
    const loopAsync = async (abortSignal: AbortSignal) => {
        try {
            await enqueueAsyncOperation(handler, abortSignal);
            loopAsync(abortSignal);
        } catch (e) {}
    };
    useEffect(() => {
        const abortController = new AbortController();
        loopAsync(abortController.signal);
        return () => abortController.abort();
    }, dependencies);
};

const Dropdown: FC<DropdownProps> = ({ controller, justification, children }) => {
    const { isOpen, setIsOpen, node, controllerRef } = controller;

    const close = useCallback(() => isOpen && setIsOpen(false), [isOpen]);
    useClickOutsideOverlayPortal(close, controllerRef.current);

    const dropdownContainerClassNames = classNames(
        styles.dropdownContainer,
        useElevationClassName(2),
        {
            [styles.justifyLeft]: justification === 'left',
            [styles.justifyRight]: justification === 'right',
        }
    );

    const rect = useRelativePositioning(controllerRef);
    const maxHeight = useMemo(() => {
        return `calc(100vh - ${rect.top + rect.height}px - (var(--grid-unit) * 3px))`;
    }, [rect.top, rect.height]);

    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [top, setTop] = useState<number | undefined>(undefined);
    useLoop(() => {
        if (!dropdownRef.current) return;
        const height = dropdownRef.current.offsetHeight;
        const minHeight = parseInt(
            getComputedStyle(dropdownRef.current).getPropertyValue('min-height')
        );
        if (height <= minHeight) {
            const calculatedTop = Math.min(
                rect.top,
                Math.max(0, window.innerHeight - 8 * 3 - height - rect.top)
            );
            setTop(calculatedTop);
        } else {
            setTop(undefined);
        }
    }, [rect]);

    return (
        <>
            {node}
            <RelativeOverlayPortal relativeRef={controllerRef} show={isOpen}>
                <div
                    className={dropdownContainerClassNames}
                    style={{ maxHeight, top }}
                    ref={dropdownRef}
                >
                    {children}
                </div>
            </RelativeOverlayPortal>
        </>
    );
};

export default Dropdown;
