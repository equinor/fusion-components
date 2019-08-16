import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Accordion from './index';
import withFusionStory from '../../../../.storybook/withFusionStory';
import AccordionItem from './AccordionItem';

const AccordionStory = () => {
    const [isOpenFirst, setIsOpenFirst] = React.useState(false);
    const [isOpenSecond, setIsOpenSecond] = React.useState(false);

    const accordionContent = (
        <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula condimentum est.
            Sed porttitor metus nec aliquet fermentum. Sed ut nibh maximus, rutrum nibh id, posuere
            ligula. Morbi a pulvinar ligula, ut imperdiet ipsum. Mauris dui risus, consequat eget
            nibh sed, bibendum tempor diam. Aliquam sed elit tempor, pretium velit sit amet,
            faucibus risus. Aenean maximus ipsum eros, eget facilisis enim rhoncus vel. Sed nec
            venenatis nisi. Morbi feugiat auctor neque. Proin mauris mauris, maximus ut porta eget,
            rhoncus ut dui. Pellentesque tempus metus non lacus hendrerit, quis tristique libero
            feugiat. Quisque feugiat ultricies tempor. Cras vel diam gravida, laoreet mi facilisis,
            blandit tortor.
        </div>
    );
    return (
        <div style={{ width: 500 }}>
            <Accordion>
                <AccordionItem
                    isOpen={isOpenFirst}
                    onChange={() => setIsOpenFirst(!isOpenFirst)}
                    label="Accordion header"
                >
                    {accordionContent}
                </AccordionItem>
                <AccordionItem
                    isOpen={isOpenSecond}
                    onChange={() => setIsOpenSecond(!isOpenSecond)}
                    label="Right Action"
                    actionDirection="right"
                >
                    {accordionContent}
                </AccordionItem>
                <AccordionItem isOpen={false} disabled label="Disabled Accordion">
                    <div>cant access me :(</div>
                </AccordionItem>
            </Accordion>
            
        </div>
    );
};

storiesOf('General|Accordion', module)
    .addDecorator(withFusionStory('Accordion'))
    .add('Default', () => <AccordionStory />);
