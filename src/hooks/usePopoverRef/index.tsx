import * as React from 'react';
import useClickToggleController from '../useClickToggleController';
import useOverlayPortal from '../useOverlayPortal';
import useRelativePositioning from '../useRelativePositioning';
import PopoverContent from '../../components/general/Popover/components/Content';
import * as styles from './styles.less';
import useClickOutsideOverlayPortal from '../useClickOutsideOverlayPortal';

export default <T extends HTMLElement>(
    content: React.ReactNode,
    props?: any
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
            <PopoverContent {...props}>{content}</PopoverContent>
        </div>
    );

    return ref;
};
