import * as React from 'react';

import styles from './styles.less';

type FusionContainerProps = {};

const FusionRoot = React.forwardRef<HTMLDivElement, React.Props<FusionContainerProps>>(
    ({ children }, ref) => {
        return (
            <div className={styles.container} ref={ref}>
                {children}
            </div>
        );
    }
);

export default FusionRoot;
