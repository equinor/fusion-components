import * as React from 'react';
import * as styles from './styles.less';
import * as PIXI from 'pixi.js';
import { POPOVER_MARGIN } from './utils';

export type PopOver = {
    top: number;
    left: number;
    render: () => JSX.Element;
};

type PopOverProps = {
    popover: PopOver | null;
};

export const addPopover = (
    hitContainer: PIXI.Container,
    hitArea: PIXI.Rectangle,
    renderPopover: () => JSX.Element,
    setPopover: (popover: PopOver | null) => void
) => {
    const hitAreaContainer = new PIXI.Container();
    hitAreaContainer.interactive = true;
    hitAreaContainer.hitArea = hitArea;

    let timer: NodeJS.Timeout;
    hitAreaContainer.on('mouseover', () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            setPopover({
                top: hitContainer.y + hitArea.height,
                left: hitContainer.x + hitArea.x + POPOVER_MARGIN,
                render: renderPopover,
            });
        }, 1000);
    });

    hitAreaContainer.on('mouseout', () => {
        clearTimeout(timer);
        setPopover(null);
    });

    hitContainer.addChild(hitAreaContainer);
};

const PopOver: React.FC<PopOverProps> = ({ popover }) => {
    if (!popover) return null;

    return (
        <div className={styles.popoverContainer} style={{ top: popover.top, left: popover.left }}>
            {popover.render()}
        </div>
    );
};

export default PopOver;
