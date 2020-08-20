import * as React from 'react';
import { storiesOf } from '@storybook/react';
import ContextSelector from '../index';
import FusionHeader from '../../Header';
import FusionContent from '../../Content';
import { ContextTypes, useFusionContext } from '@equinor/fusion';

const CurrentContextNullableAndPlaceholder: React.FC = ({ children }) => {
    const { app } = useFusionContext();

    (app.container as any)._currentApp.state = {
        AppComponent: ContextSelector,
        key: 'PDP',
        name: 'PDP',
        shortName: 'PDP',
        version: '1',
        description: 'pdp',
        tags: ['PDP'],
        context: {
            types: [ContextTypes.Project, ContextTypes.PDP],
            nullable: true,
            placeholder: 'Search project and PDP ',
        },
    };

    return <> {children} </>;
};

const CurrentContext: React.FC = ({ children }) => {
    const { app } = useFusionContext();

    (app.container as any)._currentApp.state = {
        AppComponent: ContextSelector,
        key: 'PDP',
        name: 'PDP',
        shortName: 'PDP',
        version: '1',
        description: 'pdp',
        tags: ['PDP'],
        context: {
            types: [ContextTypes.Project, ContextTypes.PDP],
        },
    };

    return <> {children} </>;
};

const PDPContextSelectorStory = () => {
    return (
        <React.Fragment>
            <CurrentContext>
                <FusionHeader
                    start={null}
                    content={ContextSelector}
                    aside={null}
                    quickFactScope={'storybook'}
                />
                <FusionContent>
                    <h1 style={{ textAlign: 'center', margin: 16 }}>PDP</h1>
                </FusionContent>
            </CurrentContext>
        </React.Fragment>
    );
};

const NullableAndPlaceHolderContextSelectorStory = () => {
    return (
        <React.Fragment>
            <CurrentContextNullableAndPlaceholder>
                <FusionHeader
                    start={null}
                    content={ContextSelector}
                    aside={null}
                    quickFactScope={'storybook'}
                />
                <FusionContent>
                    <h1 style={{ textAlign: 'center', margin: 16 }}>PDP</h1>
                </FusionContent>
            </CurrentContextNullableAndPlaceholder>
        </React.Fragment>
    );
};

storiesOf('Core|Context Selector', module)
    .add('PDP', () => <PDPContextSelectorStory />)
    .add('PDP Nullable And Placeholder', () => <NullableAndPlaceHolderContextSelectorStory />);
