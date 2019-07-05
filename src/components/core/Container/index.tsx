import * as React from 'react';
import classNames from 'classnames';
import { useComponentDisplayType, ComponentDisplayType } from '@equinor/fusion';
import styles from './styles.less';

type FusionContainerProps = {};

const FusionContainer = React.forwardRef<HTMLDivElement, React.Props<FusionContainerProps>>(
    ({ children }, ref) => {
        const componentDisplayType = useComponentDisplayType();

        const containerClassNames = classNames(styles.container, {
            [styles.comfortable]: componentDisplayType === ComponentDisplayType.Comfortable,
            [styles.compact]: componentDisplayType === ComponentDisplayType.Compact,
        });
        
        return (
            <div className={containerClassNames} ref={ref}>
                {children}
            </div>
        );
    }
);

export default FusionContainer;
