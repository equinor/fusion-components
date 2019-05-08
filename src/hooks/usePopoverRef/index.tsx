import * as React from "react";
import useClickToggleController from "../useClickToggleController";
import useOverlayPortal from "../useOverlayPortal";
import useRelativePositioning from "../useRelativePositioning";
import PopoverContent from "../../components/general/Popover/components/Content";
import * as styles from "./styles.less";
import useClickOutsideOverlayPortal from "../useClickOutsideOverlayPortal";

export default (content: React.ReactNode, props?: any): React.MutableRefObject<HTMLElement> => {
    const popoverContentRef = React.useRef(null);
    const [isOpen, ref, setIsOpen] = useClickToggleController();
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
