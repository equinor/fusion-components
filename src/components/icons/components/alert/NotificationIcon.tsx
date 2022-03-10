import { IconProps, useIcon } from '@equinor/fusion-components';

/**
 * @deprecated
 * @see Link : {@link https://equinor.github.io/fusion-react-components/?path=/docs/data-icon--page}
 */

const NotificationIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.0002 16.75L20.2902 18.04C20.9202 18.67 20.4802 19.75 19.5802 19.75H4.41017C3.52017 19.75 3.08017 18.67 3.71017 18.04L5.00017 16.75V10.75C5.00017 7.4 7.36017 4.6 10.5002 3.92V2.75C10.5002 1.92 11.1702 1.25 12.0002 1.25C12.8302 1.25 13.5002 1.92 13.5002 2.75V3.92C16.6402 4.6 19.0002 7.4 19.0002 10.75V16.75ZM13.9902 20.76C13.9902 21.86 13.1002 22.75 12.0002 22.75C10.9002 22.75 10.0102 21.86 10.0102 20.76H13.9902ZM11.0002 15.75V13.75H13.0002V15.75H11.0002ZM12.0002 11.75C12.5502 11.75 13.0002 11.3 13.0002 10.75V8.75C13.0002 8.2 12.5502 7.75 12.0002 7.75C11.4502 7.75 11.0002 8.2 11.0002 8.75V10.75C11.0002 11.3 11.4502 11.75 12.0002 11.75Z"
            fill="currentColor"
        />
    );

    return iconFactory(props);
};

export default NotificationIcon;
