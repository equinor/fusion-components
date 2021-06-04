import { IconProps, useIcon } from '@equinor/fusion-components';

const SecurityIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 5l9-4 9 4v6c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5zm16 6.99h-7v-8.8L5 6.3V12h7v8.93c3.72-1.15 6.47-4.82 7-8.94z"
            fill="currentColor"
        />
    );

    return iconFactory(props);
};

export default SecurityIcon;
