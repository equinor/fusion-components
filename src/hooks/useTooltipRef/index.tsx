import * as React from 'react';
import * as styles from './styles.less';

import {
    useRelativePositioning,
    useHoverToggleController,
    useOverlayPortal,
} from '@equinor/fusion-components';
import PopoverContainer from './components/Container';

export type TooltipPlacement = 'below' | 'above' | 'left' | 'right';

export default (
    content: String | React.ReactNode,
    placement: TooltipPlacement = 'below',
    delay?: number
): React.MutableRefObject<any> => {
    const [isOpen, ref] = useHoverToggleController(delay);
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const rect = useRelativePositioning(ref);

    const isTooltipOpen = React.useMemo(() => isOpen && content !== '', [isOpen, content]);
    useOverlayPortal(
        isTooltipOpen,

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
                ref={containerRef as React.RefObject<HTMLDivElement>}
                content={content}
                placement={placement}
            >
                {content}
            </PopoverContainer>
        </div>
    );

    return ref;
};
