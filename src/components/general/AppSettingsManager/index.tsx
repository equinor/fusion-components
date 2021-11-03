import {
    IconButton,
    BookmarksIcon,
    useTooltipRef,
    styling,
    HeaderAppAsidePortal,
    useAnchor,
} from '@equinor/fusion-components';
import { useState, useCallback } from 'react';
import AppSettingsSideSheet from './AppSettingsSideSheet';

export type AppSettingsManagerProps<T> = {
    captureAppSetting: () => Promise<T>;
    applyAppSetting: (appSetting: T, awaitForContextSwitch: boolean) => Promise<void>;
    name: string;
    anchorId: string;
    hasContext?: boolean;
};
/**
 * @deprecated Use the new BookmarksManager component instead.
 */
function AppSettingsManager<T>(props: AppSettingsManagerProps<T>) {
    const [isSideSheetOpen, setIsSideSheetOpen] = useState<boolean>(false);
    const openSideSheet = useCallback(() => setIsSideSheetOpen(true), []);
    const closeSideSheet = useCallback(() => setIsSideSheetOpen(false), []);

    const tooltipRef = useTooltipRef(props.name);
    const ref = useAnchor<HTMLButtonElement>({ id: props.anchorId, scope: 'portal' });

    return (
        <>
            <HeaderAppAsidePortal>
                <div ref={tooltipRef}>
                    <IconButton onClick={openSideSheet} ref={ref}>
                        <BookmarksIcon color={styling.colors.blackAlt2} />
                    </IconButton>
                </div>
            </HeaderAppAsidePortal>
            <AppSettingsSideSheet isOpen={isSideSheetOpen} onClose={closeSideSheet} {...props} />
        </>
    );
}

export default AppSettingsManager;
