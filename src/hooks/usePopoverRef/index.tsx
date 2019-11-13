import * as React from 'react';
import * as styles from './styles.less';
import PopoverContainer, { PopoverContainerProps } from './components/Container';
import {
    useClickToggleController,
    useRelativePositioning,
    useClickOutsideOverlayPortal,
    useOverlayPortal,
} from '@equinor/fusion-components';
import useHoverPopoverRef from './useHoverPopoverRef';

export { useHoverPopoverRef };

export default <T extends HTMLElement>(
    content: React.ReactNode,
    props?: PopoverContainerProps
): [React.MutableRefObject<T | null>, boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
    const popoverContentRef = React.useRef<HTMLDivElement | null>(null);
    const [isOpen, ref, setIsOpen] = useClickToggleController<T>();
    const rect = useRelativePositioning(ref);

    const close = React.useCallback(() => isOpen && setIsOpen(false), [isOpen]);

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
