import * as React from 'react';
import classNames from 'classnames';
import { useComponentDisplayClassNames } from '@equinor/fusion';
import styles from './styles.less';

type FusionContainerProps = {};

const FusionContainer = React.forwardRef<HTMLDivElement, React.Props<FusionContainerProps>>(
    ({ children }, ref) => {
        const containerClassNames = classNames(styles.container, useComponentDisplayClassNames(styles));
        
        return (
            <div className={containerClassNames} ref={ref}>
                {children}
            </div>
        );
    }
);

export default FusionContainer;
