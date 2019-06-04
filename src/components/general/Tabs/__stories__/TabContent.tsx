import * as React from 'react';
import Button from '../../Button';
import styles from './styles.less';

type ItemProps = {
    changeItem: (Item: string) => void;
    prevItem?: string;
    nextItem?: string;
    content?: string;
};

export const Item: React.FC<ItemProps> = ({ changeItem, prevItem, nextItem, content }) => {
    const prevButton = prevItem ? (
        <Button primary comfortable onClick={() => prevItem && changeItem(prevItem)}>
            Previous Item
        </Button>
    ) : null;
    const nextButton = nextItem ? (
        <Button primary comfortable onClick={() => nextItem && changeItem(nextItem)}>
            Next Item
        </Button>
    ) : null;

    return (
        <div className={styles.content}>
            {prevButton}
            {nextButton}
            <div className={styles.item}>{content}</div>
        </div>
    );
};
