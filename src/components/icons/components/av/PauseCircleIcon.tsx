import { IconProps, useIcon } from '@equinor/fusion-components';

/**
 * @deprecated
 * @see Link : {@link https://equinor.github.io/fusion-react-components/?path=/docs/data-icon--page}
 */

const PauseCircleIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            clipRule="evenodd"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm2 0h2V8h-2v8z"
            fill="currentColor"
            fillRule="evenodd"
        />
    );

    return iconFactory(props);
};

export default PauseCircleIcon;
