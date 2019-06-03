import { createNamedContext } from '../utils/NamedContext';

export enum ComponentDisplayTypesEnum {
    COMFORTABLE = 'COMPONENT_DISPLAY_TYPE_COMFORTABLE',
    COMPACT = 'COMPONENT_DISPLAY_TYPE_COMPACT',
};

export const componentDisplayTypeClassNames = (displayType: ComponentDisplayTypesEnum, styles: any) => ({
    [styles.compact]: displayType === ComponentDisplayTypesEnum.COMPACT,
    [styles.comfortable]: displayType === ComponentDisplayTypesEnum.COMFORTABLE
});

export default createNamedContext('fusion-display-type-context', ComponentDisplayTypesEnum.COMFORTABLE);
