import * as React from 'react';
import styles from './styles.less';

type FusionRootProps = {
    rootRef: React.MutableRefObject<HTMLElement | null>;
    overlayRef: React.MutableRefObject<HTMLElement | null>;
};

const FusionRoot: React.FC<FusionRootProps> = React.forwardRef<HTMLDivElement, FusionRootProps>(
    ({ children, rootRef, overlayRef }, ref) => {
        return (
            <div className={styles.container} ref={ref}>
                {children}
            </div>
        );
    }
);

export default FusionRoot;
