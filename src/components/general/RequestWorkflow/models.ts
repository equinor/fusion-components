import { PersonAccountType } from '@equinor/fusion';

export type WorkflowProvisioningState = 'NotProvisioned' | 'Provisioned' | 'Error' | 'Unknown';

export type WorkflowStepState = 'Pending' | 'Active' | 'Approved' | 'Skipped';

export type WorkflowProvisioningStatus = {
    state: WorkflowProvisioningState;
    positionId: string;
    provisioned: string | null;
    errorMessage: string | null;
    errorPayload: string | null;
};

export type WorkflowPerson = {
    accountType: PersonAccountType;
    azureUniquePersonId?: string;
    jobTitle?: string;
    mail: string;
    name?: string;
    phoneNumber?: string;
};

export type WorfklowPendingPerson = {
    person: WorkflowPerson;
    stepId: string;
};

export type WorkflowStep = {
    id: string;
    state: WorkflowStepState;
    name: string;
    description: string;
    started: Date | null;
    completed: Date | null;
    completedBy: WorkflowPerson | null;
    previousStep: string | null;
    nextStep: string | null;
    dueDate: Date | null;
    isCompleted: boolean;
    reason: string | null;
};

export type Workflow = {
    logicAppName?: string;
    logicAppVersion?: string;
    state: string;
    steps: WorkflowStep[];
};
