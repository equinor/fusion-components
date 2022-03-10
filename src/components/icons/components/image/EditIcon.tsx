import { IconProps, useIcon } from '@equinor/fusion-components';

type EditIconProps = {
    outline?: boolean;
} & IconProps;

/**
 * @deprecated
 * @see Link : {@link https://equinor.github.io/fusion-react-components/?path=/docs/data-icon--page}
 */

const EditIcon = ({ outline, ...rest }: EditIconProps) => {
    const d = outline
        ? 'M18.368 3.29l2.34 2.34c.39.39.39 1.02 0 1.41l-1.83 1.83-3.75-3.75 1.83-1.83c.19-.19.44-.29.7-.29.26 0 .51.09.71.29zM2.998 17.25V21h3.75l11.06-11.06-3.75-3.75-11.06 11.06zM5.918 19h-.92v-.92l9.06-9.06.92.92L5.918 19z'
        : 'M20.7088 5.63123C21.0988 6.02123 21.0988 6.65123 20.7088 7.04123L18.8788 8.87123L15.1288 5.12123L16.9588 3.29123C17.1456 3.10398 17.3993 2.99875 17.6638 2.99875C17.9283 2.99875 18.1819 3.10398 18.3688 3.29123L20.7088 5.63123ZM2.99878 20.5012V17.4612C2.99878 17.3212 3.04878 17.2012 3.14878 17.1012L14.0588 6.19123L17.8088 9.94123L6.88878 20.8512C6.79878 20.9512 6.66878 21.0012 6.53878 21.0012H3.49878C3.21878 21.0012 2.99878 20.7812 2.99878 20.5012Z';
    const iconFactory = useIcon(
        <path fillRule="evenodd" clipRule="evenodd" d={d} fill="currentcolor" />
    );

    return iconFactory(rest);
};

export default EditIcon;
