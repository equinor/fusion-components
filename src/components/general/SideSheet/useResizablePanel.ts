import { useAppSettings } from '@equinor/fusion';
import { useState, useCallback, useEffect } from 'react';
import { useEventListener } from '@equinor/fusion-components';

interface ResizedSize {
    width: number;
}

export interface ResizablePaneOptions {
    isResizable?: boolean;
    id?: string;
    minWidth?: number;
    maxWidth?: number;
    screenPlacement?: 'right' | 'left';
}

export default (
    { isResizable: isEnabled, id, minWidth, maxWidth, screenPlacement }: ResizablePaneOptions,
    deps?: any[]
) => {
    const [appSettings, setAppSettings] = useAppSettings();
    const resizeSettingsKey = id && `${id}.size`;
    const [isResizing, setIsResizing] = useState(false);
    const [mouseIsDown, setMouseIsDown] = useState(false);
    const [resizedSize, setResizedSize] = useState<ResizedSize | null>(null);

    const onResizeStart = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (isEnabled) {
                setIsResizing(true);
                setMouseIsDown(true);
            }
        },
        [isEnabled]
    );

    const getConstrainedSize = useCallback(
        (size: ResizedSize): ResizedSize => {
            const { width } = size;

            const windowWidth = window.innerWidth;
            const actualMaxWidth = Math.min(maxWidth || windowWidth, windowWidth);
            const actualMinWidth = minWidth || 150;

            if (width > actualMaxWidth) {
                return { width: actualMaxWidth };
            } else if (width < actualMinWidth) {
                return { width: actualMinWidth };
            }

            return size;
        },
        [maxWidth, minWidth]
    );

    const onResize = useCallback(
        (e: Event) => {
            if (!isResizing || !mouseIsDown) {
                return;
            }

            const mouseEvent = e as MouseEvent;

            const width =
                screenPlacement === 'left'
                    ? mouseEvent.pageX
                    : window.innerWidth - mouseEvent.pageX;
            const size = getConstrainedSize({ width });

            window.requestAnimationFrame(() => setResizedSize(size));
        },
        [isResizing]
    );

    const onResizeEnd = useCallback(() => {
        if (isResizing) {
            setMouseIsDown(false);
            setTimeout(() => setIsResizing(false));
            window.dispatchEvent(new CustomEvent('resize'));

            if (resizeSettingsKey && resizedSize) {
                setAppSettings(resizeSettingsKey, resizedSize);
            }
        }
    }, [resizedSize, setAppSettings, isResizing]);

    useEventListener(window, 'mousemove', onResize, [isResizing]);
    useEventListener(window, 'mouseup', onResizeEnd, [isResizing, onResizeEnd]);

    useEffect(() => {
        if (resizeSettingsKey && isEnabled) {
            const persistedSize = appSettings[resizeSettingsKey] as ResizedSize;

            if (persistedSize && persistedSize.width) {
                setIsResizing(true);
                setResizedSize(getConstrainedSize(persistedSize));
                setTimeout(() => setIsResizing(false), 0);
                return;
            }
        }

        setResizedSize(null);
    }, [isEnabled, ...(deps || [])]);

    return {
        onResizeStart,
        resizedSize,
        isResizing,
    };
};
