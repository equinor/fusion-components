import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Banner from './index';
import {ErrorIcon} from "../../icons/components/alert"
import Button from "../../general/Button";

const BannerStory = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <div style={{display:"flex", justifyContent:"center", flexDirection:"column"}}>
        {open ? <Banner
            message="This is the banner message,  textThis is the textv"
            cancelLabel = "Dismiss"
            onCancel = {() => setOpen(false)}
            action
            actionLabel = "Do something"
            onAction = {() => console.log("did something")}
            icon= {<ErrorIcon outline/>}
        /> : null}
        
        
        This is the content !
        <Button comfortable onClick={() => setOpen(true)}>
            Open Banner!
        </Button>
        </div>

    );
};

storiesOf('Feedback|Banner', module).add('Default', () => <BannerStory />);
