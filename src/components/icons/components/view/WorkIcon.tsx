import { IconProps, useIcon } from '@equinor/fusion-components';

/**
 * @deprecated
 * @see Link : {@link https://equinor.github.io/fusion-react-components/?path=/docs/data-icon--page}
 */

export const WorkIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            fill="currentColor"
            d="M22 9.48633C22 8.37633 21.11 7.48633 20 7.48633H16V5.48633C16 4.37633 15.11 3.48633 14 3.48633H10C8.89 3.48633 8 4.37633 8 5.48633V7.48633H4C2.89 7.48633 2.01 8.37633 2.01 9.48633L2 20.4863C2 21.5963 2.89 22.4863 4 22.4863H20C21.11 22.4863 22 21.5963 22 20.4863V9.48633ZM14 7.48633V5.48633H10V7.48633H14ZM4 9.48633V20.4863H20V9.48633H4Z"
        />
    );

    return iconFactory(props);
};

export default WorkIcon;
