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
        name: string;
        country: string;
        code: string;
    } | null;
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

export type RotationGroups = Record<number, TimelineSplit[]>;

export type TemporalSplitGroups = Record<string, TimelineSplit[]>;

export type RotationColumn = {
    split: TimelineSplit;
    linked: TimelineSplit[];
};

export type RotationColumns = Record<string, RotationColumn>;

export type TimelineSlotProps = {
    split: TimelineSplit;
    position: TimelinePosition;
    isSelected: boolean;
    isDisabled: boolean;
};

export type SelectMode = 'single' | 'multi' | 'slider' | 'highlight';

export type PositionMark = 'start' | 'end';

export type TimelineSize = 'small' | 'medium';
