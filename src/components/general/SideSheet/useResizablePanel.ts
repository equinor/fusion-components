import { useAppSettings } from '@equinor/fusion';
import { useState, useCallback, useEffect } from 'react';
import { useEventListener } from '@equinor/fusion-components';

interface ResizedSize {
    width: number;
}

export default (
    isEnabled?: boolean,
    id?: string,
    minWidth?: number,
    maxWidth?: number,
    deps?: any[]
) => {
    const [appSettings, setAppSettings] = useAppSettings();
    const resizeSettingsKey = id && `${id}.size`;
    const [isResizing, setIsResizing] = useState(false);
    const [resizedSize, setResizedSize] = useState<ResizedSize | null>(null);

    const onResizeStart = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (isEnabled) {
                setIsResizing(true);
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
            if (!isResizing) {
                return;
            }

            const mouseEvent = e as MouseEvent;

            const width = window.innerWidth - mouseEvent.pageX;
            const size = getConstrainedSize({ width });

            setResizedSize(size);
        },
        [isResizing]
    );

    const onResizeEnd = useCallback(() => {
        if (isResizing) {
            setTimeout(() => setIsResizing(false));
            
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
                setResizedSize(getConstrainedSize(persistedSize));
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
