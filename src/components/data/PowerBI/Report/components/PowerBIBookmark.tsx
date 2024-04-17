import { useContext, FunctionComponent, useState, useEffect } from 'react';
import { context, PowerBIEmbedEvents } from '../context';
import { Report } from 'powerbi-client';
import { filter, first } from 'rxjs/operators';
import { useCurrentContext, useSelector } from '@equinor/fusion';
import { BookmarksManager } from '@equinor/fusion-components';
import type { BookmarkPayload } from '../../../../general/BookmarksManager/BookmarksManagerSideSheetOptions';

type Props = {
    readonly hasContext: boolean;
};

export const PowerBIBookmark: FunctionComponent<Props> = ({ hasContext }: Props) => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const pbiContext = useContext(context);
    const portalContext = useCurrentContext();
    const { component, store, event$ } = pbiContext;

    /**
     * @eskil - seems like the bookmark sidesheet does not display if the AppSettingsManager is rendered to early
     * this only triggers re-render when status of the store changes
     */
    useSelector(store, 'status');

    const report = component?.current as Report;

    /* Get bookmark to apply awaited from contextchange */
    const [bookmarkPayload, setBookmarkPayload] = useState<string | null>(null);

    /* Apply bookmark after context change */
    useEffect(() => {
        if (!report || !bookmarkPayload) return;

        // report load state observable
        const sub = event$.subscribe((event) => {
            if (event.type === PowerBIEmbedEvents.rendered && bookmarkPayload) {
                // clear bookmark from state to make sure it only runs once
                setBookmarkPayload(null);
                // apply bookmark from storage
                report.bookmarksManager.applyState(bookmarkPayload);
                sub.unsubscribe();
            }
        });

        return () => {
            sub.unsubscribe();
        };
    }, [report, bookmarkPayload, event$]);

    const captureBookmark = async () => {
        if (!report) return '';

        try {
            const bookmark = await report.bookmarksManager.capture();
            return bookmark.state || '';
        } catch (err) {
            return '';
        }
    };

    /**
     * @todo - test if this can be applied on next load
     */
    const applyBookmark = async (
        bookmark: BookmarkPayload<string>,
        _awaitForContextSwitch: boolean,
    ) => {
        if (hasContext && bookmark.context?.id !== portalContext?.id) {
            // set bookmark in state to apply after context change
            // applying bookmark in event$ observer here does not work for some unconcevable reason.
            setBookmarkPayload(bookmark.payload);
            return;
        }

        // apply bookmark when no context change
        report.bookmarksManager.applyState(bookmark.payload);
    };

    useEffect(() => {
        const loaded$ = event$.pipe(
            filter((x) => x.type === PowerBIEmbedEvents.Loaded),
            first(),
        );
        const subscription = loaded$.subscribe(() => setIsLoaded(true));

        return () => {
            subscription.unsubscribe();
        };
    }, [event$]);

    if (!pbiContext || !isLoaded) return null;

    return (
        <BookmarksManager
            capturePayload={captureBookmark}
            applyBookmark={(bookmark, awaitForContextSwitch) =>
                applyBookmark(bookmark, awaitForContextSwitch)
            }
            hasContext={hasContext}
            anchorId="pbi-bookmarks-btn"
            name="Power BI bookmarks"
        />
    );
};

export default PowerBIBookmark;
