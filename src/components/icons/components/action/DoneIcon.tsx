import useIcon, { IconProps } from '../../../../hooks/useIcon';

/**
 * @deprecated
 * @see Link : {@link https://equinor.github.io/fusion-react-components/?path=/docs/data-icon--page}
 */

const DoneIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.80004 15.905L5.30004 12.405C5.11519 12.2179 4.86309 12.1125 4.60004 12.1125C4.33699 12.1125 4.0849 12.2179 3.90004 12.405C3.51004 12.795 3.51004 13.415 3.90004 13.805L8.09004 17.995C8.48004 18.385 9.11004 18.385 9.50004 17.995L20.1 7.40501C20.49 7.01501 20.49 6.39501 20.1 6.00501C19.9152 5.81786 19.6631 5.71252 19.4 5.71252C19.137 5.71252 18.8849 5.81786 18.7 6.00501L8.80004 15.905Z"
            fill="currentColor"
        />
    );

    return iconFactory(props);
};

export default DoneIcon;
