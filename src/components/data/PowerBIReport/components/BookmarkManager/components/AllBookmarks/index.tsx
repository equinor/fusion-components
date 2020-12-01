import { AccordionItem, Accordion, ErrorMessage } from '@equinor/fusion-components';
import * as styles from './styles.less';
import { BookmarkContext, PBIBookmark, UpdateBookmarkOperation } from '../../useBookmarks';
import Bookmark from './Bookmark';
import { useState, useEffect } from 'react';

type AllBookmarksProps = {
    allBookmarks: BookmarkContext[];
    currentContextId: string;
    updateBookmark: (
        bookmark: PBIBookmark,
        operation: UpdateBookmarkOperation,
        contextId: string
    ) => void;
    onBookmarkSelect: (bookmark: PBIBookmark, contextId: string) => void;
};
type OpenAccordion = {
    [contextId: string]: boolean;
};

const AllBookmarks: React.FC<AllBookmarksProps> = ({
    allBookmarks,
    currentContextId,
    updateBookmark,
    onBookmarkSelect,
}) => {
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
            {allBookmarks.map((contextBookmark, index) => (
                <AccordionItem
                    key={`${contextBookmark.contextId}-${index}`}
                    label={contextBookmark.contextName}
                    isOpen={openAccordions[contextBookmark.contextId]}
                    onChange={() => handleOpenAccordionChange(contextBookmark.contextId)}
                >
                    <div className={styles.contextBookmarks}>
                        {contextBookmark.bookmarks &&
                            contextBookmark.bookmarks.map((bookMark) => (
                                <Bookmark
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
};

export default AllBookmarks;
