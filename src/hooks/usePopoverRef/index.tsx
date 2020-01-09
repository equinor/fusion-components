import * as React from 'react';
import * as styles from './styles.less';
import PopoverContainer, {
    PopoverContainerProps,
    PopoverPlacement,
    PopoverJustification,
} from './components/Container';
import {
    useClickToggleController,
    useRelativePositioning,
    useOverlayPortal,
    useHoverToggleController,
} from '@equinor/fusion-components';
import useClickOutside from '../useClickOutside';
export { PopoverPlacement, PopoverJustification };

export default <T extends HTMLElement>(
    content: React.ReactNode,
    props?: PopoverContainerProps,
    hover?: boolean,
    delay?: number
): [
    React.MutableRefObject<T | null>,
    boolean,
    React.Dispatch<React.SetStateAction<boolean>> | undefined
] => {
    const [isOpen, setIsOpen] = React.useState(false);

    const [isPopoverOpen, ref, setIsPopoverOpen] = hover
        ? useHoverToggleController<T>()
        : useClickToggleController<T>();

    const [isContentOpen, popoverContentRef] = useHoverToggleController<HTMLDivElement>();

    const rect = useRelativePositioning(ref);

    const close = React.useCallback(() => {
        if (hover) {
            setTimeout(() => {
                !isContentOpen && setIsOpen(false);
            }, delay || 0);
        } else {
            isContentOpen && setIsOpen && setIsOpen(false);
        }
    }, [isContentOpen, setIsOpen, delay, isPopoverOpen, hover]);

    React.useEffect(() => {
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
                <PopoverContainer
                    ref={popoverContentRef as React.RefObject<HTMLDivElement>}
                    {...props}
                >
                    {content}
                </PopoverContainer>
            </div>
        ) : null
    );

    return [ref, isOpen, setIsOpen];
};
