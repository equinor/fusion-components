import {
    useState,
    useRef,
    useCallback,
    FC,
    useEffect,
    MutableRefObject,
    ReactNode,
    Fragment,
} from 'react';

import classNames from 'classnames';
import {
    RelativeOverlayPortal,
    useElevationClassName,
    useRelativePositioning,
} from '@equinor/fusion-components';
import { useStyles } from './Dropdown.style';
import { enqueueAsyncOperation, AsyncOperation } from '@equinor/fusion';

export type DropdownController = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    node: ReactNode;
    controllerRef: MutableRefObject<HTMLElement | null>;
};
type DropdownJustification = 'left' | 'right';

type DropdownProps = {
    controller: DropdownController;
    justification?: DropdownJustification;
};

export const useDropdownController = (
    controller: (
        ref: MutableRefObject<HTMLElement | null>,
        isOpen: boolean,
        setIsOpen: (isOpen: boolean, delay?: number) => void
    ) => ReactNode
): DropdownController => {
    const [isOpen, _setIsOpen] = useState(false);
    const controllerRef = useRef<HTMLElement | null>(null);

    const delayTimer = useRef<NodeJS.Timeout>();
    const setIsOpen = useCallback(
        (open: boolean, delay?: number) => {
            clearTimeout(delayTimer.current);
            delayTimer.current = setTimeout(() => _setIsOpen(open), delay);
        },
        [delayTimer]
    );

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

export const Dropdown: FC<DropdownProps> = ({ controller, justification, children }) => {
    const styles = useStyles();
    const { isOpen, setIsOpen, node, controllerRef } = controller;
    const outerRef = useRef<HTMLDivElement | null>(null);
    const close = useCallback(() => isOpen && setIsOpen(false), [isOpen]);

    const dropdownContainerClassNames = classNames(
        styles.dropdownContainer,
        useElevationClassName(2),
        {
            [styles.justifyLeft]: justification === 'left',
            [styles.justifyRight]: justification === 'right',
        }
    );

    const rect = useRelativePositioning(controllerRef);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [top, setTop] = useState<number | undefined>(undefined);
    const [maxHeight, setMaxHeight] = useState<string | undefined>(undefined);
    useLoop(() => {
        if (!dropdownRef.current || !isOpen) return;
        const height = dropdownRef.current.offsetHeight;
        const minHeight = parseInt(
            getComputedStyle(dropdownRef.current).getPropertyValue('min-height'),
            10
        );
        if (height <= minHeight) {
            const calculatedTop = Math.min(
                rect.height,
                Math.max(rect.top * -1, window.innerHeight - 8 * 3 - height - rect.top)
            );

            setTop(calculatedTop);
        } else {
            setTop(undefined);
        }

        const dropdownRect = dropdownRef.current.getBoundingClientRect();
        setMaxHeight(`calc(100vh - ${dropdownRect.top}px - (var(--grid-unit) * 3px))`);
    }, [rect, isOpen]);

    const handleClick = useCallback(
        (e) => {
            if (outerRef.current.contains(e.target) || dropdownRef.current.contains(e.target)) {
                return;
            }
            close();
        },
        [close]
    );

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('click', handleClick);
        } else {
            document.removeEventListener('click', handleClick);
        }

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [isOpen, handleClick]);
    return (
        <div ref={outerRef}>
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
        </div>
    );
};

export default Dropdown;
