import useIcon, { IconProps } from '../../../../hooks/useIcon';

/**
 * @deprecated
 * @see Link : {@link https://equinor.github.io/fusion-react-components/?path=/docs/data-icon--page}
 */

const BookmarksIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 4h2v5l-1-.75L9 9V4zM6 20h12V4h-5v9l-3-2.25L7 13V4H6v16z"
            fill="currentColor"
        />
    );

    return iconFactory(props);
};

export default BookmarksIcon;
