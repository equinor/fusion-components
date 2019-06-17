import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Banner from './index';
import Button from '../../general/Button';

const BannerStory = () => {
    return (
        <div style={{display:"flex", justifyContent:"center"}}>

        <Banner
            message="This is the banner message, loooogn text, This is the banner message, loooogn textThis is the banner message, loooogn textThis is the banner message, loooogn textv"
            actions={[
                <Button frameless comfortable key="do-something">
                    Do something
                </Button>,
                <Button frameless comfortable key="dismiss">
                    Dismiss
                </Button>,
            ]}
        />
        </div>

    );
};

storiesOf('Feedback|Banner', module).add('Default', () => <BannerStory />);
