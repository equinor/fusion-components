import { useState } from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import NavigationDrawer, { NavigationStructure } from '../index';
import { ErrorIcon, WarningIcon, useAnchor } from '@equinor/fusion-components';
import Chip from '../../Chip';

const getNavStructure = (): NavigationStructure[] => {
    const groupingRef = { id: 'navigationItemGrouping', scope: 'storybook|navigation_drawer' }; 
    const childRef = { id: 'navigationItemChild', scope: 'storybook|navigation_drawer' }; 
    const labelRef = { id: 'navigationItemSection', scope: 'storybook|navigation_drawer' }; 
    const sectionRef = { id: 'navigationItemLabel', scope: 'storybook|navigation_drawer' }; 

    return [
        {
            id: 'grouping1',
            type: 'grouping',
            title: 'Grouping',
            icon: <ErrorIcon outline />,
            info: groupingRef, 
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
            info: labelRef, 
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
                    isDisabled: true,
                    navigationChildren: [
                        {
                            id: 'child4',
                            type: 'child',
                            title: 'Child4',
                            isDisabled: true,
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
            icon: '3',
            navigationChildren: [
                {
                    id: 'section3',
                    title: 'Section 3 with a super long title to show off how neat ellipsis is',
                    type: 'section',
                    info: sectionRef, 
                    navigationChildren: [
                        {
                            id: 's3c1',
                            type: 'child',
                            info: childRef,
                            title: 'Child4 with a super long title to show off how neat ellipsis is',
                            aside: <Chip title="1" />,
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
            aside: <ErrorIcon outline />,
        },
    ]
}

const NavigationDrawerStory = () => {
    const [structure, setStructure] = useState<NavigationStructure[]>(getNavStructure());
    const [selected, setSelected] = useState<string>('child5');
    return (
        <>
            <NavigationDrawer
                id="navigation-drawer-story"
                structure={structure}
                selectedId={selected}
                onChangeSelectedId={(selectedItem) => setSelected(selectedItem)}
                onChangeStructure={(newStructure) => {
                    setStructure(newStructure);
                }}
            />
        </>
    );
};

storiesOf('General/Navigation Drawer', module)
    .addDecorator(withFusionStory('Navigation Drawer'))
    .add('Default', () => <NavigationDrawerStory />);
