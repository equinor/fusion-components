import { forwardRef, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { useComponentDisplayClassNames } from '@equinor/fusion';
import { useStyles } from './Container.style';

type FusionContainerProps = {
    noHeader?: boolean;
};

export const FusionContainer = forwardRef<HTMLDivElement, PropsWithChildren<FusionContainerProps>>(
    ({ noHeader = false, children }, ref) => {
        const styles = useStyles();

        const containerClassNames = classNames(styles.root, useComponentDisplayClassNames(styles), {
            [styles.noHeader]: noHeader,
        });

        return (
            <div className={containerClassNames} ref={ref}>
                {children}
            </div>
        );
    }
);

export default FusionContainer;
