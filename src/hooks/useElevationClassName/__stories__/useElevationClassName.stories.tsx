import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../.storybook/withFusionStory';
import useElevationClassName, { Elevation } from '../index';

type BoxProps = {
    elevation: Elevation;
};

const Box: React.FC<BoxProps> = (props) => (
    <div
        className={useElevationClassName(props.elevation)}
        style={{
            background: 'white',
            width: 100,
            height: 100,
            marginBottom: 24,
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
        }}
    >
        {props.elevation}
    </div>
);

const ElevationStory = () => (
    <div
        style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'space-between',
            margin: 40,
        }}
    >
        <Box elevation={0} />
        <Box elevation={1} />
        <Box elevation={2} />
        <Box elevation={3} />
        <Box elevation={4} />
        <Box elevation={6} />
        <Box elevation={8} />
        <Box elevation={12} />
        <Box elevation={16} />
        <Box elevation={24} />
    </div>
);

storiesOf('Hooks', module)
    .addDecorator(withFusionStory('useElevationClassName'))
    .add('useElevationClassName', () => {
        return <ElevationStory />;
    });
