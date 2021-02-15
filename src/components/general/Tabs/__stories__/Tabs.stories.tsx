import { useState } from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import { Tabs, Tab } from '../index';
import { Item } from './TabContent';

const TabsStory = () => {
    const [activeTabKey, setActiveTabKey] = useState('Item1');

    const changeTabKey = (tabKey) => setActiveTabKey(tabKey);

    return (
        <Tabs activeTabKey={activeTabKey} onChange={changeTabKey}>
            <Tab tabKey="Item1" title="Item 1">
                <Item changeItem={changeTabKey} nextItem="Item2" content="This is Item 1" />
            </Tab>
            <Tab tabKey="Item2" title="Item 2">
                <Item
                    changeItem={changeTabKey}
                    prevItem="Item1"
                    nextItem="Item3"
                    content="This is Item 2"
                />
            </Tab>
            <Tab tabKey="Item3" title="Item 3">
                <Item
                    changeItem={changeTabKey}
                    prevItem="Item2"
                    nextItem="Item4"
                    content="This is Item 3"
                />
            </Tab>
            <Tab tabKey="Item4" title="Item 4">
                <Item
                    changeItem={changeTabKey}
                    prevItem="Item3"
                    nextItem="Item5"
                    content="This is Item 4"
                />
            </Tab>
            <Tab tabKey="Item5" title="Item 5 is very long">
                <Item
                    changeItem={changeTabKey}
                    prevItem="Item4"
                    nextItem="Item6"
                    content="This is Item 5"
                />
            </Tab>
            <Tab tabKey="Item6" title="Item 6">
                <Item changeItem={changeTabKey} prevItem="Item5" content="This is Item 6" />
            </Tab>
            <Tab tabKey="Item7" title="Item 7" disabled />
        </Tabs>
    );
};
storiesOf('General/Tabs', module)
    .addParameters({ jest: ['Tabs.stories.jsx'] })
    .addDecorator(withFusionStory('Tabs'))
    .add('Default', () => <TabsStory />);
