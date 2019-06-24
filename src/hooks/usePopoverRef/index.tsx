import * as React from 'react';
import useClickToggleController from '../useClickToggleController';
import useOverlayPortal from '../useOverlayPortal';
import useRelativePositioning from '../useRelativePositioning';
import * as styles from './styles.less';
import useClickOutsideOverlayPortal from '../useClickOutsideOverlayPortal';
import PopoverContainer, { PopoverContainerProps } from "./components/Container";

export default <T extends HTMLElement>(
    content: React.ReactNode,
    props?: PopoverContainerProps
): React.MutableRefObject<T | null> => {
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

    return ref;
};
