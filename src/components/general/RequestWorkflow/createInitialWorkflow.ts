import { OrgProject, Position } from '@equinor/fusion';
import { v1 as uuid } from 'uuid';
import { Person, ProvisioningStatus, Workflow } from './models';

const person: Person = {
    accountType: 'Consultant',
    mail: 'PERSON@equinor.com',
};

export const createInitialWorkflow = (): Workflow => {
    return {
        logicAppName: 'Normal personnel assignment request',
        logicAppVersion: 'v1',
        state: 'Running',
        steps: [
            {
                id: 'created',
                state: 'Approved',
                name: 'Created',
                description: 'Request was created by Tobias',
                started: new Date(),
                completed: new Date(),
                completedBy: person,
                previousStep: null,
                nextStep: 'proposal',
                dueDate: null,
                isCompleted: true,
                reason: null,
            },
            {
                id: 'proposal',
                state: 'Pending',
                name: 'Propose',
                description: 'Review personnel request and approve/reject',
                started: new Date(),
                completed: null,
                completedBy: null,
                previousStep: 'created',
                nextStep: 'approval',
                dueDate: null,
                isCompleted: false,
                reason: null,
            },
            {
                id: 'approval',
                state: 'Pending',
                name: 'Approve',
                description: 'Review personnel request and approve/reject',
                started: null,
                completed: null,
                completedBy: null,
                previousStep: 'proposal',
                nextStep: 'provisioning',
                dueDate: null,
                isCompleted: false,
                reason: null,
            },
            {
                completed: null,
                completedBy: null,
                description:
                    'If the request is approved, the new position or changes will be provisioned to the organisational chart.',
                dueDate: null,
                id: 'provisioning',
                isCompleted: false,
                name: 'Provisioning',
                nextStep: null,
                previousStep: 'approval',
                reason: null,
                started: null,
                state: 'Pending',
            },
        ],
    };
};

export const createInitialProvisioningStatus = (): ProvisioningStatus => {
    return {
        state: 'NotProvisioned',
        positionId: null,
        provisioned: null,
        errorMessage: null,
        errorPayload: null,
    }
}
