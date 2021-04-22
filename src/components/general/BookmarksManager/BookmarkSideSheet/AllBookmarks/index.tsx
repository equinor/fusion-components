import { BookmarkListResponse } from '@equinor/fusion';
import { Accordion, AccordionItem, ErrorMessage } from '@equinor/fusion-components';
import { useEffect, useState } from 'react';
import { ApplyBookmark } from '../..';
import Bookmark from './Bookmark';

type OpenAccordion = {
    [id: string]: boolean;
};
type AllBookmarksProps<TPayload> = {
    allBookmarks: BookmarkListResponse[];
    currentContextId: string;
    applyBookmark: (bookmarkSetting: ApplyBookmark<TPayload>) => Promise<void>;
};
type Context = {
    name: string;
    id: string;
};
function AllBookmarks<T>({ allBookmarks, currentContextId, applyBookmark }: AllBookmarksProps<T>) {
    const [openAccordions, setOpenAccordions] = useState<OpenAccordion>({});

    function handleOpenAccordionChange(id: string) {
        setOpenAccordions({ ...openAccordions, [id]: !openAccordions[id] });
    }

    useEffect(() => {
        setOpenAccordions({
            [currentContextId]: true,
        });
    }, [currentContextId]);

    if (!allBookmarks || !allBookmarks.length) {
        return (
            <ErrorMessage
                hasError
                errorType="noData"
                title="No bookmarks"
                message="No bookmarks for this app"
            />
        );
    }
    const groupedContext: Record<string, Array<BookmarkListResponse>> = {};
    const groupedContexts: Record<string, Context | undefined> = {};
    const bookmarksGroupByContextId: Record<
        string,
        Array<BookmarkListResponse>
    > = allBookmarks.reduce((__prev, curr) => {
        const key = curr.context ? curr.context.id : 'unknown';
        if (groupedContext[key]) {
            const bookmarks = groupedContext[key];
            bookmarks.push(curr);
        } else {
            groupedContext[key] = [curr];
        }
        return groupedContext;
    }, {});

    const groupByContextId: Record<string, Context> = allBookmarks.reduce((__prev, curr) => {
        const key = curr.context ? curr.context.id : 'unknown';
        if (!groupedContexts[key]) {
            groupedContexts[key] = curr.context;
        }
        return groupedContexts;
    }, {});

    return (
        <Accordion>
            {Object.values(groupByContextId).map((context) => {
                return (
                    <AccordionItem
                        label={context.name}
                        key={context.id}
                        isOpen={openAccordions[context.id]}
                        onChange={() => handleOpenAccordionChange(context.id)}
                    >
                        {Object.values(bookmarksGroupByContextId[context.id]).map((bookmark) => {
                            return (
                                <Bookmark
                                    bookmark={bookmark}
                                    applyBookmark={applyBookmark}
                                    accordionOpen={openAccordions[context.id]}
                                />
                            );
                        })}
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
}

export default AllBookmarks;
