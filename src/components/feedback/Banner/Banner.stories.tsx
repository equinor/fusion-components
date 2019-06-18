import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Banner from './index';
import {ErrorIcon} from "../../icons/components/alert"

const BannerStory = () => {

    return (
        <div style={{display:"flex", justifyContent:"center"}}>

        <Banner
            message="This is the banner message, loooogn text, This is the banner message, loooogn textThis is the banner message, loooogn textThis is the banner message, loooogn textv"
            cancelLabel = "Dismiss"
            onCancel = {() => console.log("cancel")}
            action
            actionLabel = "Do something"
            onAction = {() => console.log("did something")}
            icon= {<ErrorIcon outline/>}
        />
        </div>

    );
};

storiesOf('Feedback|Banner', module).add('Default', () => <BannerStory />);
