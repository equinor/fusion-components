export type TimelineSplit = {
    id: string;
    externalId: string;
    workload: number;
    appliesFrom: Date;
    appliesTo: Date;
    parentPositionId: string | null;
    taskOwnerIds: string[] | null;
    reportsToIds?: string[] | undefined;
    obs: string;
    rotationId: string | null;
    properties: { workPackId?: string; hasRequest?: boolean } | null;
    type: 'Normal' | 'Rotation';
    location: {
        id: string;
    } |  null;
    assignedPerson: {
        azureUniqueId?: string;
        mail?: string | null;
        name?: string;
    } | null;
    positionId: string;
    calendar?: string | null;
};

export type TimelinePosition = {
    id?: string;
    name: string;
    externalId: string | null;
    properties: {
        isSupport?: boolean;
        hideInTree?: boolean;
        resourceType?: 'normal' | 'jointVenture' | 'enterprise';
    };
    basePosition: {
        id: string;
        department?: string;
    };
    instances: TimelineSplit[];
    isTaskOwner: boolean;
};

export type SplitDetails = any & { appliesFrom: Date; appliesTo: Date };

export type RotationGroups = Record<string, TimelineSplit[]>;

export type RotationColumns = Record<string, any>;

export type TimelineSlotProps = {
    split: TimelineSplit;
    isSelected: boolean;
}

export type SelectMode = 'single' | 'multi' | 'slider';

export type PositionMark = 'start' | 'end';
