import { Accordion, AccordionItem, ErrorMessage } from '@equinor/fusion-components';
import { BookmarkContext } from '../../useBookmarks';

type AllBookmarksProps<T> = {
    allBookmarks: BookmarkContext<T>[];
    currentContextId: string;
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
function AllBookmarks<T>({ allBookmarks }: AllBookmarksProps<T>) {
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
    return (
        <Accordion>
            {sortByString(allBookmarks, (b) => b.contextName).map((contextBookmark) => {
                <AccordionItem
                    label={contextBookmark.contextName}
                    key={contextBookmark.contextId}
                ></AccordionItem>;
            })}
        </Accordion>
    );
}

export default AllBookmarks;
