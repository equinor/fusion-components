import useIcon, { IconProps } from '../../../../hooks/useIcon';

type CollapseIconProps = IconProps & {
    isCollapsed: boolean;
    screenPlacement?: 'right' | 'left';
};

const ArrowPointingRight: React.FC = () => (
    <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.0013 7C18.0013 6.45 17.5513 6 17.0013 6C16.4513 6 16.0013 6.45 16.0013 7V17C16.0013 17.55 16.4513 18 17.0013 18C17.5513 18 18.0013 17.55 18.0013 17V7ZM10.1813 12L6.29128 8.11C5.91128 7.73 5.91128 7.09 6.29128 6.7C6.47811 6.51275 6.73176 6.40751 6.99628 6.40751C7.2608 6.40751 7.51445 6.51275 7.70128 6.7L12.2913 11.3C12.6813 11.69 12.6813 12.32 12.2913 12.71L7.70128 17.3C7.31128 17.69 6.68128 17.69 6.29128 17.3C5.90128 16.91 5.90128 16.28 6.29128 15.89L10.1813 12Z"
        fill="currentColor"
    />
);

const ArrowPointingLeft: React.FC = () => (
    <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.99878 7C7.99878 6.45 7.54878 6 6.99878 6C6.44878 6 5.99878 6.45 5.99878 7V17C5.99878 17.55 6.44878 18 6.99878 18C7.54878 18 7.99878 17.55 7.99878 17V7ZM13.8188 12L17.6988 15.89C18.0888 16.27 18.0888 16.91 17.7088 17.29C17.3188 17.68 16.6888 17.68 16.2988 17.29L11.7088 12.7C11.3188 12.31 11.3188 11.68 11.7088 11.29L16.2988 6.7C16.4856 6.51275 16.7393 6.40751 17.0038 6.40751C17.2683 6.40751 17.5219 6.51275 17.7088 6.7C18.0988 7.09 18.0988 7.72 17.7088 8.11L13.8188 12Z"
        fill="currentColor"
    />
);

const CollapseIcon = ({
    isCollapsed,
    screenPlacement: screenPosition = 'right',
    ...props
}: CollapseIconProps) => {
    const Collapsed = screenPosition === 'left' ? ArrowPointingRight : ArrowPointingLeft;
    const Expanded = screenPosition === 'left' ? ArrowPointingLeft : ArrowPointingRight;
    const iconFactory = useIcon(isCollapsed ? <Collapsed /> : <Expanded />);

    return iconFactory(props);
};

export default CollapseIcon;
