import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../.storybook/withFusionStory';
import InlineDepartmentCard from './index';

const payload = {
    personName: 'Unknown',
    departmentName: 'Department',
    personLongName: 'very long person name displaying',
    longDepartmentName: 'very long department name displaying',
};

const InlineDepartmentCardViewerStory = () => {
    return (
        <div style={{ margin: '8px' }}>
            <InlineDepartmentCard
                name={payload.personName}
                fullDepartmentName={payload.departmentName}
            />
        </div>
    );
};

storiesOf('Pro org/Inline Department Card Viewer', module)
    .addDecorator(withFusionStory('Inline Department Card Viewer'))
    .add('Default', () => <InlineDepartmentCardViewerStory />);
