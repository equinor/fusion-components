import useIcon, { IconProps } from '../../../../hooks/useIcon';

const ScheduleIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM11.72 7H11.78C12.18 7 12.5 7.32 12.5 7.72V12.26L16.37 14.56C16.72 14.76 16.83 15.21 16.62 15.55C16.42 15.89 15.98 15.99 15.64 15.79L11.49 13.3C11.18 13.12 11 12.79 11 12.44V7.72C11 7.32 11.32 7 11.72 7Z"
            fill="currentColor"
        />
    );

    return iconFactory(props);
};

export default ScheduleIcon;
