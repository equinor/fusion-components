import useIcon, { IconProps } from '../../../../hooks/useIcon';

const CalendarIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19 4H18V3C18 2.45 17.55 2 17 2C16.45 2 16 2.45 16 3V4H8V3C8 2.45 7.55 2 7 2C6.45 2 6 2.45 6 3V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 19C19 19.55 18.55 20 18 20H6C5.45 20 5 19.55 5 19V9H19V19ZM9 13V11H7V13H9ZM11 11H13V13H11V11ZM17 13V11H15V13H17Z"
            fill="currentColor"
        />
    );

    return iconFactory(props);
};

export default CalendarIcon;
