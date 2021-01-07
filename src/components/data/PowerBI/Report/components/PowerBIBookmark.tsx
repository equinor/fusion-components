import React, { useContext, FunctionComponent, useState, useEffect, useMemo } from 'react';
import { context, PowerBIEmbedEvents, PowerBIEmbedEventEntry } from '../context';
import { Report } from 'powerbi-client';
import { AppSettingsManager } from '@equinor/fusion-components';
import { filter, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { useSelector } from '@equinor/fusion';

type Props = {
    hasContext: boolean;
};

const nextRender = (event$: Observable<PowerBIEmbedEventEntry>) => {
    return event$.pipe(
        filter((x) => x.type === PowerBIEmbedEvents.rendered),
        first()
    );
};

export const PowerBIBookmark: FunctionComponent<Props> = ({ hasContext }: Props) => {
    const { component, store, event$ } = useContext(context);

    /**
     * @eskil - seems like the bookmark sidesheet does not display if the AppSettingsManager is rendered to early
     * this only triggers re-render when status of the store changes
     */
    useSelector(store, 'status');

    const report = useMemo(() => component.current as Report, [component.current]);
    const captureBookmark = async () => {
        if (!report) {
            return;
        }
        try {
            const bookmark = await report.bookmarksManager.capture();
            return bookmark.state;
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * @todo - test if this can be applied on next load
     */
    const applyBookmark = async (bookmark: string, awaitForContextSwitch: boolean) => {
        awaitForContextSwitch
            ? nextRender(event$).subscribe(() => report.bookmarksManager.applyState(bookmark))
            : report.bookmarksManager.applyState(bookmark);
    };

    return (
        <AppSettingsManager
            captureAppSetting={captureBookmark}
            applyAppSetting={applyBookmark}
            hasContext={hasContext}
            anchorId="pbi-bookmarks-btn"
            name="Power BI bookmarks"
        />
    );
};

export default PowerBIBookmark;
