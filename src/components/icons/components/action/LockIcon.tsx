import { IconProps, useIcon } from '@equinor/fusion-components';

type LockIconProps = {
    outline: boolean;
} & IconProps;

const LockIcon = ({ outline, ...rest }: LockIconProps) => {
    const d = outline
        ? 'M17 8.5H18C19.1 8.5 20 9.4 20 10.5V20.5C20 21.6 19.1 22.5 18 22.5H6C4.9 22.5 4 21.6 4 20.5V10.5C4 9.4 4.9 8.5 6 8.5H7V6.5C7 3.74 9.24 1.5 12 1.5C14.76 1.5 17 3.74 17 6.5V8.5ZM12 3.5C10.34 3.5 9 4.84 9 6.5V8.5H15V6.5C15 4.84 13.66 3.5 12 3.5ZM7 20.5C6.45 20.5 6 20.05 6 19.5V11.5C6 10.95 6.45 10.5 7 10.5H17C17.55 10.5 18 10.95 18 11.5V19.5C18 20.05 17.55 20.5 17 20.5H7ZM14 15.5C14 16.6 13.1 17.5 12 17.5C10.9 17.5 10 16.6 10 15.5C10 14.4 10.9 13.5 12 13.5C13.1 13.5 14 14.4 14 15.5Z'
        : 'M18 8.5H17V6.5C17 3.74 14.76 1.5 12 1.5C9.24 1.5 7 3.74 7 6.5V8.5H6C4.9 8.5 4 9.4 4 10.5V20.5C4 21.6 4.9 22.5 6 22.5H18C19.1 22.5 20 21.6 20 20.5V10.5C20 9.4 19.1 8.5 18 8.5ZM12 17.5C10.9 17.5 10 16.6 10 15.5C10 14.4 10.9 13.5 12 13.5C13.1 13.5 14 14.4 14 15.5C14 16.6 13.1 17.5 12 17.5ZM9 6.5V8.5H15V6.5C15 4.84 13.66 3.5 12 3.5C10.34 3.5 9 4.84 9 6.5Z';
    const iconFactory = useIcon(
        <path fillRule="evenodd" clipRule="evenodd" d={d} fill="currentColor" />
    );

    return iconFactory(rest);
};

export default LockIcon;
