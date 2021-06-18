import {
    useCallback,
    useEffect,
    useState,
    ReactNode,
    MutableRefObject,
    Dispatch,
    SetStateAction,
    RefObject,
} from 'react';

import styles from './styles.less';

import {
    useClickToggleController,
    useRelativePositioning,
    useOverlayPortal,
    useHoverToggleController,
    PopoverContainer,
    PopoverContainerProps,
    PopoverPlacement,
    PopoverJustification,
} from '@equinor/fusion-components';
import useClickOutside from '../useClickOutside';
export { PopoverPlacement, PopoverJustification };

export default <T extends HTMLElement>(
    content: ReactNode,
    props?: PopoverContainerProps,
    hover?: boolean,
    delay?: number
): [MutableRefObject<T | null>, boolean, Dispatch<SetStateAction<boolean>> | undefined] => {
    const [isOpen, setIsOpen] = useState(false);

    const [isPopoverOpen, ref, setIsPopoverOpen] = hover
        ? useHoverToggleController<T>()
        : useClickToggleController<T>();

    useEffect(() => {
        setIsPopoverOpen(isOpen);
    }, [isOpen]);

    const [isContentOpen, popoverContentRef] = useHoverToggleController<HTMLDivElement>();

    const rect = useRelativePositioning(ref);

    const close = useCallback(() => {
        if (hover) {
            setTimeout(() => {
                !isContentOpen && setIsOpen(false);
            }, delay || 0);
        } else {
            isContentOpen && setIsOpen && setIsOpen(false);
        }
    }, [isContentOpen, setIsOpen, delay, isPopoverOpen, hover]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(isPopoverOpen || isContentOpen);
        }, delay || 0);
        return () => clearTimeout(timer);
    }, [isPopoverOpen, isContentOpen]);

    useClickOutside(close, popoverContentRef.current);

    useOverlayPortal(
        isOpen,
        isOpen ? (
            <div
                className={styles.container}
                style={{
                    width: rect.width,
                    height: rect.height,
                    top: rect.top,
                    left: rect.left,
                }}
            >
                <PopoverContainer ref={popoverContentRef as RefObject<HTMLDivElement>} {...props}>
                    {content}
                </PopoverContainer>
            </div>
        ) : null
    );

    return [ref, isOpen, setIsOpen];
};
