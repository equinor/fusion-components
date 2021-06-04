import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../.storybook/withFusionStory';
import useKeyboardNavigation from '../useKeyboardNavigation';
import {useState, Fragment} from "react";

const KeyboardNavigationStory = () => {
    const listItems = ['Item 1', 'Item 2', 'Item 3'];

    const [currentItem, setCurrentItem] = useState<number | null>(0);
    const [ref, setRef] = useState<HTMLElement | null>(null);
    useKeyboardNavigation(
        {
            onDown: () =>
                setCurrentItem(
                    currentItem !== null && currentItem < listItems.length - 1
                        ? currentItem + 1
                        : currentItem
                ),
            onUp: () =>
                setCurrentItem(
                    currentItem !== null && currentItem > 0 ? currentItem - 1 : currentItem
                ),
        },
        ref
    );
    return (
        <Fragment>
            <input
                ref={setRef}
                placeholder={
                    currentItem !== null ? listItems[currentItem] : 'Click me to use navigation'
                }
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
        </Fragment>
    );
};

storiesOf('Hooks/KeyboardNavigation', module)
    .addDecorator(withFusionStory('KeyboardNavigation'))
    .add('Default', () => {
        return <KeyboardNavigationStory />;
    });
