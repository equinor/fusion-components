import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import Menu from '../index';
import { CheckBox, DoneIcon } from '@equinor/fusion-components';

import {useState, Fragment} from 'react';

const MenuStory = () => {
    const [ref, setRef] = useState<HTMLElement | null>(null);

    const items = [
        {
            key: '1',
            title: 'First',
        },
        {
            key: '2',
            title: 'Selected',
            isSelected: true,
        },
        {
            key: '3',
            title: 'Disabled',
            isDisabled: true,
        },
        {
            key: '4',
            title: 'Last',
        },
    ];

    return (
        <Fragment>
            <input placeholder="Focus here to navigate" ref={setRef} />
            <Menu
                onClick={action('click')}
                keyboardNavigationRef={ref}
                sections={[
                    {
                        key: 'This is the only section, but I still need a key',
                        items: items,
                    },
                ]}
            />
            <div style={{ width: '300px' }}>
                <input placeholder="Narrow menu" ref={setRef} />
                <Menu
                    onClick={action('click')}
                    keyboardNavigationRef={ref}
                    sections={[
                        {
                            key: 'This is the only section, but I still need a key',
                            items: items,
                        },
                    ]}
                />
            </div>
        </Fragment>
    );
};

const CustomItemsMenuStory = () => {
    type Item = {
        key: string;
        title: string | React.ReactNode;
        isDisabled?: boolean;
        isChecked?: boolean;
    };

    const [items, setItems] = useState<Item[]>([
        {
            key: '1',
            title: 'Some option',
        },
        {
            key: '2',
            title: 'This is another option',
        },
        {
            key: '3',
            title: (
                <>
                    You can check this one <DoneIcon />
                </>
            ),
        },
        {
            key: '4',
            title: 'This one is disabled',
            isDisabled: true,
        },
    ]);

    const toggleItem = (item: Item) => {
        setItems(
            items.map((i) =>
                i.key === item.key
                    ? {
                          ...item,
                          isChecked: !item.isChecked,
                      }
                    : i
            )
        );
    };

    const CheckboxWrapper = ({ item }) => {
        return (
            <CheckBox
                selected={item.isChecked}
                onChange={() => toggleItem(item)}
                disabled={item.isDisabled}
            />
        );
    };

    const ItemComponent = ({ item }) => {
        return (
            <>
                <strong>{item.key}</strong> - <em>{item.title}</em>
            </>
        );
    };

    return (
        <Menu
            asideComponent={CheckboxWrapper}
            itemComponent={ItemComponent}
            onClick={toggleItem}
            sections={[
                {
                    key: 'This is the only section, but I still need a key',
                    items,
                },
            ]}
        />
    );
};

storiesOf('General/Menu', module)
    .addDecorator(withFusionStory('Menu'))
    .add('Default', () => <MenuStory />)
    .add('Custom items', () => <CustomItemsMenuStory />);
