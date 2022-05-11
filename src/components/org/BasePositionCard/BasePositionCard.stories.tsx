import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import withFusionStory from '../../../../.storybook/withFusionStory';
import BasePositionCard from './index';
import { BasePosition } from '@equinor/fusion';

const basePos: BasePosition = {
    id: '7f97e2fd-d6a9-43df-bebb-0140804b1054',
    name: 'Subsea and Pipelines Structures and Manifolds',
    department: 'PDP PRD FE SF',
    discipline: 'Subsea and Pipeline',
    subDiscipline: null,
    projectType: 'PRD',
    roleDescription: ` The Technical Manager is normally a staff function reporting to PM/PD in larger projects. The technical manager is responsible for consistent system engineering, technical functionality, technology qualification program, interface coordination and change control system.
Develop total value chain and integration towards existing infrastructure – Secure integrity and consistent system engineering across project battery limits according to design basis

Co-ordinate PDO and PIO work in the project

Assist PM/PD with technical input to Lisence Owners, Authorities and other stake holders – Participate in Technical Committee

Extensive knowledge within Equinor’s governing documentation

Tasks and deliveries



Develop Interface Management routines and monitor technical interfaces between project areas/functions

Develop Change Control routines and provide technical input to the change process

Give input to the Quality System Audit and Examinations Program

Give input to the Project Risk and follow up according to agreed action plans

Ensure required experience transfer from other similar projects to the project

Ensure experience feedback to the base organization on a continuous level

Develop, maintain and revise Design Basis as required – Including Receiving Asset co-signing

Develop, maintain and revise TORG as required – Including Receiving Asset co-signing

Secure consistent LCI system in the project – Engineering owns the content

Secure consistent Document Management system in the project

Support consistent engineering for procurement work processes

Reference is also made to Equinor career descriptors which defines what and how expectations on a generic level. Role title note subject to career descriptor title in SAP.tseting`,
};

const InterActivestory = () => {
    return <BasePositionCard position={basePos} />;
};

const DefaultStory = () => {
    return <BasePositionCard position={basePos} />;
};

storiesOf('Pro org/Base Position Card', module)
    .addDecorator(withKnobs)
    .addDecorator(withFusionStory('Pro org base position card'))
    .add('Default', () => <DefaultStory />)
    .add('Interactive', () => <InterActivestory />);
