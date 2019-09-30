import * as React from 'react';
import * as styles from './styles.less';
import Arrow from './Arrow';
import classNames from 'classnames';
import {
    useRelativePositioning,
    useHoverToggleController,
    useOverlayPortal,
} from '@equinor/fusion-components';

export type TooltipPlacement = 'below' | 'above' | 'left' | 'right';

export default (
    content: String,
    placement: TooltipPlacement = 'below',
    delay?: number
): React.MutableRefObject<any> => {
    const [isOpen, ref] = useHoverToggleController(delay);
    const rect = useRelativePositioning(ref);

    const tooltipClassName = classNames(styles.tooltip, styles[placement.toLocaleLowerCase()]);

    useOverlayPortal(
        isOpen && content !== '',
        <div
            className={styles.container}
            style={{
                width: rect.width,
                height: rect.height,
                top: rect.top,
                left: rect.left,
            }}
        >
            <div className={tooltipClassName}>
                <Arrow />
                <span className={styles.content}>{content}</span>
            </div>
        </div>
    );

    return ref;
};
