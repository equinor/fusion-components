import { useState, useEffect } from 'react';
import { AccordionItem, Accordion, ErrorMessage } from '@equinor/fusion-components';
import styles from './styles.less';
import { BookmarkContext, Bookmark, UpdateBookmarkOperation } from '../../useBookmarks';
import BookmarkComponent from './Bookmark';

type AllBookmarksProps<T> = {
    allBookmarks: BookmarkContext<T>[];
    currentContextId: string;
    updateBookmark: (
        bookmark: Bookmark<T>,
        operation: UpdateBookmarkOperation,
        contextId: string
    ) => void;
    onBookmarkSelect: (bookmark: Bookmark<T>, contextId: string) => void;
};
type OpenAccordion = {
    [contextId: string]: boolean;
};

function sortByString<K>(list: K[], accessor: (listItem: K) => string) {
    return [
        ...list.sort((a, b) => {
            const itemA = accessor(a)?.toUpperCase();
            const itemB = accessor(b)?.toUpperCase();
            if (!itemA || !itemB) {
                return 0;
            }
            if (itemA < itemB) {
                return -1;
            }
            if (itemA > itemB) {
                return 1;
            }
            return 0;
        }),
    ];
}

function AllBookmarks<T>({
    allBookmarks,
    currentContextId,
    updateBookmark,
    onBookmarkSelect,
}: AllBookmarksProps<T>) {
    const [openAccordions, setOpenAccordions] = useState<OpenAccordion>({});

    const handleOpenAccordionChange = (id: string) => {
        setOpenAccordions({ ...openAccordions, [id]: !openAccordions[id] });
    };

    useEffect(() => {
        setOpenAccordions({
            [currentContextId]: true,
        });
    }, [currentContextId]);

    if (!allBookmarks || allBookmarks.length === 0) {
        return (
            <ErrorMessage
                hasError
                errorType="noData"
                title="No bookmarks"
                message="No bookmarks for this app, create a new one in the Add new tab"
            />
        );
    }

    return (
        <Accordion>
            {sortByString(allBookmarks, (b) => b.contextName).map((contextBookmark) => (
                <AccordionItem
                    label={contextBookmark.contextName}
                    key={contextBookmark.contextId}
                    isOpen={openAccordions[contextBookmark.contextId]}
                    onChange={() => handleOpenAccordionChange(contextBookmark.contextId)}
                >
                    <div className={styles.contextBookmarks}>
                        {contextBookmark.bookmarks &&
                            sortByString(
                                contextBookmark.bookmarks,
                                (b) => b.bookmarkName
                            ).map((bookMark) => (
                                <BookmarkComponent
                                    key={bookMark.bookmarkId}
                                    bookmark={bookMark}
                                    onDelete={() =>
                                        updateBookmark(
                                            bookMark,
                                            'delete',
                                            contextBookmark.contextId
                                        )
                                    }
                                    onUpdate={(updatedBookmark) =>
                                        updateBookmark(
                                            updatedBookmark,
                                            'update',
                                            contextBookmark.contextId
                                        )
                                    }
                                    onSelect={() =>
                                        onBookmarkSelect(bookMark, contextBookmark.contextId)
                                    }
                                    accordionOpen={openAccordions[contextBookmark.contextId]}
                                />
                            ))}
                    </div>
                </AccordionItem>
            ))}
        </Accordion>
    );
}

export default AllBookmarks;
