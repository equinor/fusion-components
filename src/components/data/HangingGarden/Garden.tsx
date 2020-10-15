import * as React from 'react';
import * as styles from './styles.less';
import {
    HangingGardenColumnIndex,
    HangingGardenColumn,
    GardenController,
} from './models/HangingGarden';
import { getCalculatedWidth, getCalculatedHeight } from './utils';

import { useHangingGardenContext } from './hooks/useHangingGardenContext';
import useGarden from './renderHooks/useGarden';
import useRendererSize from './renderHooks/useRendererSize';

type GardenProps = {
    provideController?: React.MutableRefObject<GardenController | null>;
};

function Garden<T extends HangingGardenColumnIndex>({ provideController }: GardenProps) {
    const {
        pixiApp,
        container,
        canvas,
        maxRowCount,
        expandedColumns,
        columns,
        itemHeight,
        itemWidth,
        headerHeight,
        textureCaches: { clearTextureCaches, clearItemTextureCaches },
        scroll: { onScroll },
        popover: { popover },
    } = useHangingGardenContext();

    const { renderGarden } = useGarden();
    const { checkRendererSize } = useRendererSize();

    React.useEffect(() => {
        if (!pixiApp.current) return;

        checkRendererSize();

        if (provideController) {
            provideController.current = {
                clearGarden: () => {
                    clearTextureCaches();
                    clearItemTextureCaches();
                },
            };
        }
    }, [pixiApp.current]);

    const handleScroll = React.useCallback(
        (e: React.UIEvent<HTMLDivElement>) => {
            onScroll(e, renderGarden);
        },
        [renderGarden, onScroll]
    );

    return (
        <div className={styles.gardenContainer} ref={container} onScroll={handleScroll}>
            <div
                style={{
                    width: getCalculatedWidth(
                        expandedColumns,
                        (columns as HangingGardenColumn<T>[]).length,
                        itemWidth
                    ),
                    height: getCalculatedHeight(headerHeight, itemHeight, maxRowCount),
                    minWidth: '100%',
                    minHeight: '100%',
                }}
            >
                <canvas ref={canvas} />
            </div>
            {popover}
        </div>
    );
}

export default Garden;
