import { IconProps, useIcon } from '@equinor/fusion-components';

const Notifications = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18 15.75v-5c0-3.07-1.63-5.64-4.5-6.32v-.68c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.11 6 7.67 6 10.75v5l-2 2v1h16v-1l-2-2zm-6 6c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm-4-5h8v-6c0-2.48-1.51-4.5-4-4.5s-4 2.02-4 4.5v6z"
            fill="currentColor"
        />
    );

    return iconFactory(props);
};

export default Notifications;
