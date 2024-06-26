import useIcon, { IconProps } from '../../../../hooks/useIcon';

const RemoveCircleIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0 4.41 3.59 8 8 8s8-3.59 8-8-3.59-8-8-8-8 3.59-8 8zm3-1v2h10v-2H7z"
            fill="currentColor"
        />
    );

    return iconFactory(props);
};

export default RemoveCircleIcon;
