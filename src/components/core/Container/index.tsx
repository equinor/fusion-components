import { forwardRef } from 'react';
import classNames from 'classnames';
import { useComponentDisplayClassNames } from '@equinor/fusion';
import styles from './styles.less';

type FusionContainerProps = {
    noHeader?: boolean;
};

const FusionContainer = forwardRef<HTMLDivElement, React.PropsWithChildren<FusionContainerProps>>(
    ({ noHeader = false, children }, ref) => {
        const containerClassNames = classNames(
            styles.container,
            useComponentDisplayClassNames(styles),
            {
                [styles.noHeader]: noHeader,
            }
        );

        return (
            <div className={containerClassNames} ref={ref}>
                {children}
            </div>
        );
    }
);

export default FusionContainer;
