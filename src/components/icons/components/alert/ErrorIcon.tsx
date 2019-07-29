import * as React from 'react';
import { IconProps, useIcon } from '@equinor/fusion-components';

type ErrorIconProps = {
    outline: boolean;
} & IconProps;

const ErrorIcon = ({ outline, ...rest }: ErrorIconProps) => {
    const d = outline
        ? 'M2 12C2 6.48 6.47 2 11.99 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 11.99 22C6.47 22 2 17.52 2 12ZM13 8C13 7.45 12.55 7 12 7C11.45 7 11 7.45 11 8V12C11 12.55 11.45 13 12 13C12.55 13 13 12.55 13 12V8ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM11 15V17H13V15H11Z'
        : 'M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 13C11.45 13 11 12.55 11 12V8C11 7.45 11.45 7 12 7C12.55 7 13 7.45 13 8V12C13 12.55 12.55 13 12 13ZM11 15V17H13V15H11Z';
    const iconFactory = useIcon(
        <path fillRule="evenodd" clipRule="evenodd" d={d} fill="currentColor" />
    );

    return iconFactory(rest);
};

export default ErrorIcon;
