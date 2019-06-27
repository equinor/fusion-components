import * as React from 'react';
import { storiesOf } from '@storybook/react';
import useKeyboardNavigation from '../useKeyboardNavigation';

const KeyboardNavigationStory = () => {
    const listItems = ['Item 1', 'Item 2', 'Item 3'];

    const [currentItem, setCurrentItem] = React.useState<number | null>(null);
    const ref = useKeyboardNavigation({
        onDown: () => {
            setCurrentItem(
                currentItem && currentItem < listItems.length - 1 ? currentItem + 1 : currentItem
            );
        },
        onUp: () => setCurrentItem(currentItem && currentItem > 0 ? currentItem - 1 : currentItem),
    });

    return (
        <React.Fragment>
            <input
                ref={ref}
                placeholder={
                    currentItem !== null ? listItems[currentItem] : 'Click me to use navigation'
                }
                readOnly
                onClick={() => setCurrentItem(listItems.indexOf('0'))}
            />
            <ul>
                {listItems.map((item, index) => (
                    <li
                        style={{
                            listStyleType: 'none',
                            fontWeight: index === currentItem ? 600 : 200,
                        }}
                        key={index.toString()}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </React.Fragment>
    );
};

storiesOf('Hooks|KeyboardNavigation', module).add('Default', () => {
    return <KeyboardNavigationStory />;
});
