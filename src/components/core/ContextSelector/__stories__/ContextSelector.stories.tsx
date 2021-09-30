import { storiesOf } from '@storybook/react';
import ContextSelector from '../index';
import FusionHeader from '../../Header';
import FusionContent from '../../Content';
import { ContextTypes, useFusionContext } from '@equinor/fusion';
import { Fragment, FC } from "react";

const CurrentContextNullableAndPlaceholder: FC = ({ children }) => {
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

const CurrentContext: FC = ({ children }) => {
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
            types: [ContextTypes.Project, ContextTypes.PDP, ContextTypes.ProjectMaster],
        },
    };

    return <> {children} </>;
};

const PDPContextSelectorStory = () => {
    return (
        <Fragment>
            <CurrentContext>
                <FusionHeader
                    start={null}
                    content={ContextSelector}
                    aside={null}
                    settings={null}
                    quickFactScope={'storybook'}
                />
                <FusionContent>
                    <h1 style={{ textAlign: 'center', margin: 16 }}>PDP</h1>
                </FusionContent>
            </CurrentContext>
        </Fragment>
    );
};

const NullableAndPlaceHolderContextSelectorStory = () => {
    return (
        <Fragment>
            <CurrentContextNullableAndPlaceholder>
                <FusionHeader
                    start={null}
                    content={ContextSelector}
                    aside={null}
                    settings={null}
                    quickFactScope={'storybook'}
                />
                <FusionContent>
                    <h1 style={{ textAlign: 'center', margin: 16 }}>PDP</h1>
                </FusionContent>
            </CurrentContextNullableAndPlaceholder>
        </Fragment>
    );
};

storiesOf('Core/Context Selector', module)
    .add('PDP', () => <PDPContextSelectorStory />)
    .add('PDP Nullable And Placeholder', () => <NullableAndPlaceHolderContextSelectorStory />);
