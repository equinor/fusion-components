import * as React from 'react';
import useHoverToggleController from '../useHoverToggleController';
import useOverlayPortal from '../useOverlayPortal';
import * as styles from './styles.less';
import useRelativePositioning from '../useRelativePositioning';
import Arrow from './Arrow';
import classNames from 'classnames';

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
        isOpen,
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
