import React from "react";
import { storiesOf } from '@storybook/react';
import withFusionStory from "../../../../../.storybook/withFusionStory";
import NavigationDrawer from "../index";

const NavigationDrawerStory = () => {
    return(
        <>
            <NavigationDrawer id="navigation-drawer-story" />
        </>
    )
}

storiesOf('General|Navigation Drawer', module)
    .addDecorator(withFusionStory('Navigation Drawer'))
    .add("Default", () => <NavigationDrawerStory />)



const test = [
    {
        key:"group1",
        type:"grouping",
        icon:() => <div>Icon</div>,
        title:"Menu Grouping",
        children:[
            {
                key:"section1",
                type:"section",
                title:"Menu Section",
                children: [
                    {
                        key:"child",
                        type:"Child",
                        title:"Menu child",
                        isSelected: true,
                    },
                    {
                        key:"child1",
                        type:"Child",
                        title:"Menu child1",
                    }
                ]
            }
        ]
    }
]