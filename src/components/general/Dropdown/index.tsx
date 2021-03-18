import {
    useState,
    useRef,
    useCallback,
    FC,
    useEffect,
    MutableRefObject,
    ReactNode,
    forwardRef,
    PropsWithChildren,
    RefObject,
    createRef,
} from 'react';
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
const Dropdown = forwardRef<HTMLDivElement | null, PropsWithChildren<DropdownProps>>(
    ({ controller, justification, children }, ref) => {
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
        const dropdownRef =
            (ref as RefObject<HTMLDivElement | null>) || createRef<HTMLDivElement | null>();
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
    }
);
export default Dropdown;
