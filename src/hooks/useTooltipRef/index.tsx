import * as styles from './styles.less';

import { useRef, useMemo, ReactNode } from 'react';

import {
    useRelativePositioning,
    useHoverToggleController,
    useOverlayPortal,
} from '@equinor/fusion-components';
import TooltipContainer from './components/Container';

export type TooltipPlacement = 'below' | 'above' | 'left' | 'right';

export default (
    content: string | ReactNode,
    placement: TooltipPlacement = 'below',
    delay?: number
): React.MutableRefObject<any> => {
    const [isOpen, ref] = useHoverToggleController(delay);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const rect = useRelativePositioning(ref);

    const isTooltipOpen = useMemo(() => isOpen && content !== '', [isOpen, content]);
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
            <TooltipContainer
                ref={containerRef as React.RefObject<HTMLDivElement>}
                content={content}
                placement={placement}
            >
                {content}
            </TooltipContainer>
        </div>
    );

    return ref;
};
