import useIcon, { IconProps } from '../../../../hooks/useIcon';

const CalendarEventIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 6v2h14V6H5zm2 6h10v2H7v-2zm7 4H7v2h7v-2z"
            fill="currentColor"
        />
    );

    return iconFactory(props);
};

export default CalendarEventIcon;
