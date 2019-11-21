import * as React from 'react';
import * as styles from './styles.less';
import PopoverContainer, { PopoverContainerProps } from './components/Container';
import {
    useClickToggleController,
    useRelativePositioning,
    useClickOutsideOverlayPortal,
    useOverlayPortal,
    useHoverToggleController,
} from '@equinor/fusion-components';

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
    const popoverContentRef = React.useRef<HTMLDivElement | null>(null);
    const [isOpen, ref, setIsOpen] = hover
        ? useHoverToggleController<T>(delay)
        : useClickToggleController<T>();

    const rect = useRelativePositioning(ref);

    const close = React.useCallback(() => isOpen && setIsOpen && setIsOpen(false), [
        isOpen,
        setIsOpen,
    ]);

    useClickOutsideOverlayPortal(close, popoverContentRef.current);

    useOverlayPortal(
        isOpen,
        <div
            ref={popoverContentRef}
            className={styles.container}
            style={{
                width: rect.width,
                height: rect.height,
                top: rect.top,
                left: rect.left,
            }}
        >
            <PopoverContainer {...props}>{content}</PopoverContainer>
        </div>
    );

    return [ref, isOpen, setIsOpen];
};
