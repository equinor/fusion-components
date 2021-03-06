import useIcon, { IconProps } from '../../../../hooks/useIcon';

const FullscreenIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7 10H5V5h5v2H7v3zm-2 4h2v3h3v2H5v-5zm12 3h-3v2h5v-5h-2v3zM14 7V5h5v5h-2V7h-3z"
            fill="currentColor"
        />
    );

    return iconFactory(props);
};

export default FullscreenIcon;
