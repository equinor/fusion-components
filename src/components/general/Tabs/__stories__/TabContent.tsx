import { useEffect, FC } from 'react';

import Button from '../../Button';
import styles from './styles.less';

type ItemProps = {
    changeItem: (Item: string) => void;
    prevItem?: string;
    nextItem?: string;
    content?: string;
};

export const Item: FC<ItemProps> = ({ changeItem, prevItem, nextItem, content }) => {
    const prevButton = prevItem ? (
        <Button onClick={() => prevItem && changeItem(prevItem)}>Previous Item</Button>
    ) : null;
    const nextButton = nextItem ? (
        <Button onClick={() => nextItem && changeItem(nextItem)}>Next Item</Button>
    ) : null;

    const timeoutPromise = (interval) => {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                console.log('RESOLVED');
                resolve('done');
            }, interval);
        });
    };

    const timeOut = async () => await timeoutPromise(5000);

    useEffect(() => {
        timeOut();
    }, []);
    return (
        <div className={styles.content}>
            {prevButton}
            {nextButton}
            <div className={styles.item}>{content}</div>
        </div>
    );
};
