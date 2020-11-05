import { useFusionContext, useComponentDisplayType, ComponentDisplayType } from '@equinor/fusion';
import {
    IconButton,
    IconProps,
    useIcon,
    useTooltipRef,
    useAnchorRef,
} from '@equinor/fusion-components';

const inverseComponentDisplayType = (componentDisplayType: ComponentDisplayType) =>
    componentDisplayType === ComponentDisplayType.Comfortable
        ? ComponentDisplayType.Compact
        : ComponentDisplayType.Comfortable;

const getComponentDisplayTypeTooltipText = (componentDisplayType: ComponentDisplayType) =>
    componentDisplayType === ComponentDisplayType.Comfortable
        ? 'Switch to compact mode'
        : 'Switch to comfortable mode';

const ComponentDisplayTypeIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 7.5C3.17 7.5 2.5 6.83 2.5 6C2.5 5.17 3.17 4.5 4 4.5H14C14.83 4.5 15.5 5.17 15.5 6C15.5 6.83 14.83 7.5 14 7.5H10.5V18C10.5 18.83 9.83 19.5 9 19.5C8.17 19.5 7.5 18.83 7.5 18V7.5H4ZM14 9.5H20C20.83 9.5 21.5 10.17 21.5 11C21.5 11.83 20.83 12.5 20 12.5H18.5V18C18.5 18.83 17.83 19.5 17 19.5C16.17 19.5 15.5 18.83 15.5 18V12.5H14C13.17 12.5 12.5 11.83 12.5 11C12.5 10.17 13.17 9.5 14 9.5Z"
            fill="currentColor"
        />
    );

    return iconFactory(props);
};

type ComponentDisplayToggleButtonProps = {
    quickFactScope?: string;
};

const ComponentDisplayToggleButton: React.FC<ComponentDisplayToggleButtonProps> = ({
    quickFactScope,
}) => {
    const { settings } = useFusionContext();

    const componentDisplayType = useComponentDisplayType();
    const toggleComponentDisplayType = () => {
        settings.core.setAsync(
            'componentDisplayType',
            inverseComponentDisplayType(componentDisplayType)
        );
    };

    const componentDisplayTypeTooltipRef = useTooltipRef(
        getComponentDisplayTypeTooltipText(componentDisplayType),
        'below'
    );

    useAnchorRef({
        ref: componentDisplayTypeTooltipRef,
        id: 'compact-mode-btn',
        scope: quickFactScope,
    });

    return (
        <IconButton
            toggler
            active={componentDisplayType === ComponentDisplayType.Compact}
            ref={componentDisplayTypeTooltipRef}
            onClick={toggleComponentDisplayType}
        >
            <ComponentDisplayTypeIcon />
        </IconButton>
    );
};

export default ComponentDisplayToggleButton;
