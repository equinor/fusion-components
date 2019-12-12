import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, boolean, number } from '@storybook/addon-knobs';
import withFusionStory from '../../../../.storybook/withFusionStory';
import { ModalSideSheet, SideSheet } from './index';
import { Button, IconButton, WarningIcon, DoneIcon } from '@equinor/fusion-components';

const OutsideContent = () => (
    <div style={{ flexGrow: 1, padding: 24 }}>
        <p>
            Right, and where am I gonna be? Well, Marty, I want to thank you for all your good
            advise, I'll never forget it. This is it. This is the answer. It says here that a bolt
            of lightning is gonna strike the clock tower precisely at 10:04 p.m. next Saturday
            night. If we could somehow harness this bolt of lightning, channel it into the flux
            capacitor, it just might work. Next Saturday night, we're sending you back to the
            future. Hey, George, buddy, you weren't at school, what have you been doing all day?
            Lynda, first of all, I'm not your answering service. Second of all, somebody named Greg
            or Craig called you just a little while ago.
        </p>
        <p>
            Right. Thank you. In about thirty years. Whoa, whoa, okay. Next, please. I'm gonna ram
            him
        </p>
        <p>
            Hey, George, buddy, you weren't at school, what have you been doing all day? Hey beat
            it, spook, this don't concern you. He's an absolute dream. Check out that four by four.
            That is hot. Someday, Jennifer, someday. Wouldn't it be great to take that truck up to
            the lake. Throw a couple of sleeping bags in the back. Lie out under the stars.
        </p>
    </div>
);

const SidesheetContent = () => (
    <div style={{ paddingTop: 16, paddingLeft: 16 }}>
        <p>
            I'm gonna be at the dance. Well yeah, you know we have two of them. Excuse me. Oh honey,
            he's teasing you, nobody has two television sets. Oh yes sir.
        </p>
        <p>
            A bolt of lightning, unfortunately, you never know when or where it's ever gonna strike.
            Let him go, Biff, you're drunk. On the night I go back in time, you get- Doc. You wait
            and see, Mr. Caruthers, I will be mayor and I'll be the most powerful mayor in the
            history of Hill Valley, and I'm gonna clean up this town. It's cold, damn cold. Ha, ha,
            ha, Einstein, you little devil. Einstein's clock is exactly one minute behind mine, it's
            still ticking.
        </p>
        <p>
            What's a rerun? But I can't go to the dance, I'll miss my favorite television program,
            Science Fiction Theater. Wait a minute, wait a minute. 1:15 in the morning? I don't like
            her, Marty. Any girl who calls a boy is just asking for trouble. Yeah, exactly.
        </p>
        <p>
            I'm writing this down, this is good stuff. Hot, Jesus Christ, Doc. Jesus Christ, Doc,
            you disintegrated Einstein. Take that you mutated son-of-a-bitch. My pine, why you. You
            space bastard, you killed a pine. Hey Dad, George, hey, you on the bike. Yeah, sure,
            okay.
        </p>
        <p>
            Unroll their fire. Alright, c'mon, I think we're safe. What, what? Doc, she didn't even
            look at him. Great Scott. Let me see that photograph again of your brother. Just as I
            thought, this proves my theory, look at your brother.
        </p>
        <p>
            Well yeah, you know we have two of them. Marty, why are you so nervous? Hey, Doc, we
            better back up, we don't have enough roads to get up to 88. Whoa, whoa, okay. Well,
            because George, nice girls get angry when guys take advantage of them.
        </p>
        <p>
            Right. Kids, we're gonna have to eat this cake by ourselves, Uncle Joey didn't make
            parole again. I think it would be nice, if you all dropped him a line. Doc, you don't
            just walk into a store and ask for plutonium. Did you rip this off? Uh? Hey man, the
            dance is over. Unless you know someone else who could play the guitar.
        </p>
        <p>
            Well, now we gotta sneak this back into my laboratory, we've gotta get you home. Its
            good. Go. What the hell is a gigawatt? Alright, alright, okay McFly, get a grip on
            yourself. It's all a dream. Just a very intense dream. Woh, hey, listen, you gotta help
            me.
        </p>
        <p>
            That's good advice, Marty. Where's Einstein, is he with you? We never would have fallen
            in love. Ho, you mean you're gonna touch her on her- Alright, alright, okay McFly, get a
            grip on yourself. It's all a dream. Just a very intense dream. Woh, hey, listen, you
            gotta help me.
        </p>
        <p>
            Einstein, hey Einstein, where's the Doc, boy, huh? Doc Well, safe and sound, now, n good
            old 1955. He's alright. Brown, Brown, Brown, Brown, Brown, great, you're alive. Do you
            know where 1640 Riverside- Yeah I know, If you put your mind to it you could accomplish
            anything.
        </p>
    </div>
);

const ModalSideSheetStory = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const size = select(
        'Size',
        {
            'Extra large': 'xlarge',
            Large: 'large',
            Medium: 'medium',
            Small: 'small',
        },
        'medium'
    );

    return (
        <div>
            <Button
                onClick={() => {
                    setIsOpen(true);
                }}
            >
                Open Side Sheet
            </Button>
            <ModalSideSheet
                header="This is the modal side sheet header "
                show={isOpen}
                size={size}
                onClose={() => {
                    setIsOpen(false);
                }}
                safeClose={boolean('Safe close', false)}
                headerIcons={[
                    <IconButton key="Icon1">
                        <WarningIcon outline />
                    </IconButton>,
                    <IconButton key="Icon2">
                        <DoneIcon />
                    </IconButton>,
                ]}
                isResizable={boolean('Resizable', false)}
                id="Story.ModalSidesheet"
                maxWidth={number('Max width', 0)}
                minWidth={number('Min width', 0)}
            >
                <div style={{ padding: '0 24px' }}>This is the modal side sheet content</div>
            </ModalSideSheet>
        </div>
    );
};

const StandardSideSheetStory = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const size = select(
        'Size',
        {
            'Extra large': 'xlarge',
            Large: 'large',
            Medium: 'medium',
            Small: 'small',
        },
        'medium'
    );

    const screenPlacement = select(
        'Screen placement',
        {
            Left: 'left',
            Right: 'right',
        },
        'right'
    );

    return (
        <div style={{ display: 'flex', height: '100%', width: '100%' }}>
            {screenPlacement === 'right' && <OutsideContent />}
            <SideSheet
                isOpen={isOpen}
                size={size}
                onClose={isOpen => {
                    setIsOpen(isOpen);
                }}
                title="This is a title"
                screenPlacement={screenPlacement}
                isResizable={boolean('Resizable', false)}
                id="Story.StandardSidesheet"
                maxWidth={number('Max width', 0)}
                minWidth={number('Min width', 0)}
            >
                <SidesheetContent />
            </SideSheet>
            {screenPlacement === 'left' && <OutsideContent />}
        </div>
    );
};

storiesOf('General|SideSheet', module)
    .addDecorator(withKnobs)
    .addDecorator(withFusionStory('Side Sheet', 0))
    .add('Modal', () => <ModalSideSheetStory />)
    .add('Standard', () => <StandardSideSheetStory />);
