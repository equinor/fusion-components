import * as React from 'react';
import * as styles from './styles.less';
import PopoverContainer, { PopoverContainerProps } from './components/Container';
import {
    useHoverToggleController,
    useRelativePositioning,
    useOverlayPortal,
} from '@equinor/fusion-components';

export default <T extends HTMLElement>(
    content: React.ReactNode,
    props?: PopoverContainerProps,
    delay?: number
): [Boolean, React.MutableRefObject<T | null>] => {
    const popoverContentRef = React.useRef<HTMLDivElement | null>(null);
    const [isHovering, ref] = useHoverToggleController<T>(delay);
    const rect = useRelativePositioning(ref);

    useOverlayPortal(
        isHovering,
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

    return [isHovering, ref];
};
