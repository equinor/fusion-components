import useIcon, { IconProps } from '../../../../hooks/useIcon';

const FormatBoldIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.225 11.79C16.195 11.12 16.875 10.02 16.875 9C16.875 6.74 15.125 5 12.875 5H7.62495C7.07495 5 6.62495 5.45 6.62495 6V18C6.62495 18.55 7.07495 19 7.62495 19H13.405C15.475 19 17.365 17.31 17.375 15.23C17.385 13.7 16.525 12.39 15.225 11.79ZM9.62495 7.5H12.625C13.455 7.5 14.125 8.17 14.125 9C14.125 9.83 13.455 10.5 12.625 10.5H9.62495V7.5ZM9.62495 16.5H13.125C13.955 16.5 14.625 15.83 14.625 15C14.625 14.17 13.955 13.5 13.125 13.5H9.62495V16.5Z"
            fill="currentColor"
        />
    );

    return iconFactory(props);
};

export default FormatBoldIcon;
