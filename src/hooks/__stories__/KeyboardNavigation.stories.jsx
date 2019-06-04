import * as React from 'react';
import { storiesOf } from '@storybook/react';
import useKeyboardNavigation from '../useKeyboardNavigation.ts';

const KeyboardNavigationStory = () => {
    const listItems = ['Item 1', 'Item 2', 'Item 3'];

    const [currentItem, setCurrentItem] = React.useState(null);
    const ref = useKeyboardNavigation({
        onDown: () =>
            setCurrentItem(currentItem < listItems.length - 1 ? currentItem + 1 : currentItem),
        onUp: () => setCurrentItem(currentItem > 0 ? currentItem - 1 : currentItem),
    });
    const setStyle = listId => {
        return {
            fontWeight: listId === currentItem ? '600' : '200',
            listStyleType: 'none',
        };
    };
    return (
        <React.Fragment>
            <input
                ref={ref.setRef}
                placeholder={
                    currentItem !== null ? listItems[currentItem] : 'Click me to use navigation'
                }
                readOnly
            />
            <ul>
                {listItems.map((item, index) => (
                    <li style={setStyle(index)}> {item}</li>
                ))}
            </ul>
        </React.Fragment>
    );
};

storiesOf('Hooks|KeyboardNavigation', module).add('default', () => {
    return <KeyboardNavigationStory />;
});
