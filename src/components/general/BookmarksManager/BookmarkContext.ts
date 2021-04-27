import { createContext } from 'react';
import { Store } from './store/store';
export type BookmarkContext = {
    store: Store;
};

export const bookmarkContext = createContext<BookmarkContext | null>(null);
