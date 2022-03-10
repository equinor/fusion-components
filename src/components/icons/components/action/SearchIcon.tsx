import useIcon, { IconProps } from '../../../../hooks/useIcon';

/**
 * @deprecated
 * @see Link : {@link https://equinor.github.io/fusion-react-components/?path=/docs/data-icon--page}
 */

const SearchIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.1866 14.4716H15.9766L20.2166 18.7316C20.6266 19.1416 20.6266 19.8116 20.2166 20.2216C19.8066 20.6316 19.1366 20.6316 18.7266 20.2216L14.4766 15.9716V15.1816L14.2066 14.9016C12.8066 16.1016 10.8966 16.7216 8.86658 16.3816C6.08658 15.9116 3.86658 13.5916 3.52658 10.7916C3.00658 6.56156 6.56658 3.00156 10.7966 3.52156C13.5966 3.86156 15.9166 6.08156 16.3866 8.86156C16.7266 10.8916 16.1066 12.8016 14.9066 14.2016L15.1866 14.4716ZM5.47658 9.97156C5.47658 12.4616 7.48658 14.4716 9.97658 14.4716C12.4666 14.4716 14.4766 12.4616 14.4766 9.97156C14.4766 7.48156 12.4666 5.47156 9.97658 5.47156C7.48658 5.47156 5.47658 7.48156 5.47658 9.97156Z"
            fill="currentColor"
        />
    );

    return iconFactory(props);
};

export default SearchIcon;
