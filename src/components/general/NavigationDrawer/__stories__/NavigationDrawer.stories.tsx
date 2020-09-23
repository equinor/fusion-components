import React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import NavigationDrawer, { NavigationStructure } from '../index';
import { ErrorIcon, WarningIcon } from '@equinor/fusion-components';
import Chip from "../../Chip";

const navStructure = [
    {
        id: 'grouping1',
        type: 'grouping',
        title: 'Grouping',
        icon: <ErrorIcon outline />,
        navigationChildren: [
            {
                id: 'section1',
                title: 'Section',
                type: 'section',
                navigationChildren: [
                    {
                        id: 'child',
                        type: 'child',
                        title: 'Child1',
                    },
                    {
                        id: 'child1',
                        type: 'child',
                        title: 'Child2',
                    },
                ],
            },
            {
                id: 'section80',
                title: 'New Section',
                type: 'section',
                navigationChildren: [
                    {
                        id: 'child51',
                        type: 'child',
                        title: 'First Child',
                    },
                    {
                        id: 'child152',
                        type: 'child',
                        title: 'Second Child',
                    },
                ],
            },
        ],
    },
    {
        id: 'labe1',
        title: 'Label',
        type: 'label',
    },
    {
        id: 'grouping2',
        type: 'grouping',
        title: 'Grouping2',
        icon: <WarningIcon outline />,
        navigationChildren: [
            {
                id: 'section2',
                title: 'Section2',
                type: 'section',
                navigationChildren: [
                    {
                        id: 'child4',
                        type: 'child',
                        title: 'Child4',
                    },
                    {
                        id: 'child5',
                        type: 'child',
                        title: 'Child5',
                    },
                ],
            },
        ],
    },
    {
        id: 'grouping3',
        type: 'grouping',
        title: 'Grouping 3 with a super long title to show off how neat ellipsis is',
        icon: "3", 
        navigationChildren: [
            {
                id: 'section3',
                title: 'Section 3 with a super long title to show off how neat ellipsis is',
                type: 'section',
                navigationChildren: [
                    {
                        id: 's3c1',
                        type: 'child',
                        title: 'Child4 with a super long title to show off how neat ellipsis is',
                        aside:<Chip title="1"/>
                    },
                ],
            },
        ],
    },
    {
        id: 'grouping4',
        type: 'grouping',
        title: 'Grouping4',
        icon: <ErrorIcon outline />,
        aside: <ErrorIcon outline/>
    }
] as NavigationStructure[];

const NavigationDrawerStory = () => {
    const [structure, setStructure] = React.useState<NavigationStructure[]>(navStructure);
    const [selected, setSelected] = React.useState<string>("child5");
    return (
        <>
            <NavigationDrawer
                id="navigation-drawer-story"
                structure={structure}
                selectedId={selected}
                onChangeSelectedId={selectedItem => setSelected(selectedItem)}
                onChangeStructure={newStructure => {
                    setStructure(newStructure);
                }}
                quickFactScope="storybook"
            />
        </>
    );
};

storiesOf('General|Navigation Drawer', module)
    .addDecorator(withFusionStory('Navigation Drawer'))
    .add('Default', () => <NavigationDrawerStory />);
