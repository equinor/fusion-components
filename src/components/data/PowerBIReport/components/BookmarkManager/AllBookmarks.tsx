import * as React from 'react';
import {
    AccordionItem,
    Accordion,
    ErrorMessage,
    IconButton,
    MoreIcon,
} from '@equinor/fusion-components';
import * as styles from './styles.less';
import { BookmarkContext, PBIBookmark } from './useBookmarks';
import { useCurrentContext } from '@equinor/fusion';

type AllBookmarksProps = {
    allBookmarks: BookmarkContext[];
};
type OpenAccordion = {
    [contextId: string]: boolean;
};
type BookmarkProps = {
    bookmark: PBIBookmark;
};

const Bookmark: React.FC<BookmarkProps> = ({ bookmark }) => {
    return (
        <div className={styles.bookmarkContainer}>
            <IconButton>
                <MoreIcon />
            </IconButton>
            <a>{bookmark.bookmarkName}</a>
        </div>
    );
};

const AllBookmarks: React.FC<AllBookmarksProps> = ({ allBookmarks }) => {
    const [openAccordions, setOpenAccordions] = React.useState<OpenAccordion>({});
    const currentContext = useCurrentContext();

    const handleOpenAccordionChange = (id: string) => {
        setOpenAccordions({ ...openAccordions, [id]: !openAccordions[id] });
    };

    React.useEffect(() => {
        const contextId = currentContext?.id || 'global';
        setOpenAccordions({
            [contextId]: true,
        });
    }, []);
    
    if (allBookmarks.length === 0) {
        return (
            <ErrorMessage
                hasError
                errorType="noData"
                message="No bookmarks for this app, create a new one in the Add new tab"
            />
        );
    }
    return (
        <Accordion>
            {allBookmarks.map((contextBookmark) => (
                <AccordionItem
                    label={contextBookmark.contextName}
                    key={contextBookmark.contextId}
                    isOpen={openAccordions[contextBookmark.contextId]}
                    onChange={() => handleOpenAccordionChange(contextBookmark.contextId)}
                >
                    <div className={styles.contextBookmarks}>
                        {contextBookmark.bookmarks &&
                            contextBookmark.bookmarks.map((bookMark) => (
                                <Bookmark bookmark={bookMark} />
                            ))}
                    </div>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

export default AllBookmarks;
