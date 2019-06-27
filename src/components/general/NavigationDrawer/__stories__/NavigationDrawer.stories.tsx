import React from "react";
import { storiesOf } from '@storybook/react';
import NavigationDrawer from "../index";

const NavigationDrawerStory = () => {
    return(
        <>
            <NavigationDrawer />
        </>
    )
}

storiesOf('General|Navigation Drawer', module)
    .add("Default", () => NavigationDrawerStory)