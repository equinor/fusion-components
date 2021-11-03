import { IconProps, useIcon } from '@equinor/fusion-components';

type PaginationArrowIconProps = {
    next?: boolean;
    prev?: boolean;
} & IconProps;

/**
 * @deprecated
 * @see Link : {@link https://equinor.github.io/fusion-react-components/?path=/docs/data-icon--page}
 */

const PaginationArrow = ({ next, prev, ...props }: PaginationArrowIconProps) => {
    const iconFactory = useIcon(
        next ? (
            <path
                d="M9.00002 6.71051C8.61002 7.10051 8.61002 7.73051 9.00002 8.12051L12.88 12.0005L9.00002 15.8805C8.61002 16.2705 8.61002 16.9005 9.00002 17.2905C9.39002 17.6805 10.02 17.6805 10.41 17.2905L15 12.7005C15.39 12.3105 15.39 11.6805 15 11.2905L10.41 6.70051C10.03 6.32051 9.39002 6.32051 9.00002 6.71051Z"
                fill="currentColor"
            />
        ) : (
            <path
                d="M15 6.70508C14.8132 6.51783 14.5595 6.4126 14.295 6.4126C14.0305 6.4126 13.7769 6.51783 13.59 6.70508L9.00002 11.2951C8.61002 11.6851 8.61002 12.3151 9.00002 12.7051L13.59 17.2951C13.98 17.6851 14.61 17.6851 15 17.2951C15.39 16.9051 15.39 16.2751 15 15.8851L11.12 11.9951L15 8.11508C15.39 7.72508 15.38 7.08508 15 6.70508Z"
                fill="currentColor"
            />
        )
    );

    return iconFactory(props);
};

export default PaginationArrow;
